import { Injectable } from '@angular/core';
import { Consts } from 'src/Consts/Consts';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Message } from 'src/Models/MessageModel';
import * as signalR from "@microsoft/signalr"
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // ------------------------Varibales--------------------------
  consts : Consts =new Consts ;
  baseurl : string = this.consts.BaseUrl+'api/Messages/' ;
  messages : any [] =[]  ;
  friends : any[] =[] ;
  isSeen : any;
  currentUsern : any;
  currentconIdSeen : any;
  requists : any;
  currentConnection : any;
  profile  = false;
  resivemessage = false;
  CurrentUser : any ;
  private hubConnection : signalR.HubConnection; 
      // ------------------------constructor--------------------------
  constructor(private http:HttpClient , private userServices : UserService) { }
    // ------------------------Intail MEssages--------------------------

   intialMessage(currentUser :any) {
    this.getMessages(currentUser.connectionId , 1)
    .subscribe(resp=>{
        this.messages = resp;
        if(resp.length !=0){
        this.isSeen = resp[resp.length-1].seen;
      }
        this.currentconIdSeen = currentUser.connectionId;
        this.currentUsern = currentUser.connectionId; });
  }

    
     // ------------------------Connection With Hub --------------------------

   async startConnection (){
   this.hubConnection = await new signalR.HubConnectionBuilder()
    .withUrl(this.consts.BaseUrl+'chat')
    .build();

  await  this.hubConnection
    .start();
  }
       // ------------------------Connection Chat  --------------------------

  async JionChat(con : any){
    this.currentConnection = con;
    await this.hubConnection.invoke('JionChat',  con );
  }
       // ------------------------Resive Messages (RealTime)  --------------------------

  async ResiveMessage(){
    this.resivemessage=true;
    await this.hubConnection.on('ResiveMessage',(message )=>{
      console.log(message);
      this.messages.push(message);
      this.isSeen = message.seen;
      this.userServices.GetGriends().subscribe((resp)=>{this.friends=resp;});
    
    })
  }
       // ------------------------Real Time For Profile Like FrindRequists  --------------------------

  async RealTimeProfile(userName : any){
    
    await this.hubConnection.invoke('RealTimeProfile',userName);
    this.profile = true;
 
  }
         // ------------------------Real Time For FrindRequists  --------------------------

  async FirndRequists(){
    await this.hubConnection.on('FirndRequists', (N)=>{

      this.requists = N;
    })
  }
         // ------------------------ RealTime For Seen --------------------------

  async Seen(){
    await this.hubConnection.on('Seen',(con , id)=>{
      this.isSeen=con;
      this.currentconIdSeen=id;
      this.userServices.GetGriends().subscribe((resp)=>{this.friends = resp});
      if( this.currentUsern == id){
        this.messages[this.messages.length-1].seen =true;
      }})
  }

// ------------------------ Regular Apis --------------------------
  seen(connectionId : string) {
    const url = this.baseurl+'seen/'+connectionId;
    this.http.get<any>(url).subscribe(()=>{});
  }
  async SendMessage(a :{messageText : string  ,connectionId: string}){
    const url = this.baseurl+'sendMessage';
   this.http.post<Message>(url,a).subscribe(resp =>{});
  }
  getMessages(connectionId : string , indx :any) :Observable<Message[]>{
   
    const url = this.baseurl+'GetMessage/'+connectionId+'/'+indx;
    return this.http.get<Message[]>(url);

  }
}
