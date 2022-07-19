import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { async } from '@angular/core/testing';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { Consts } from 'src/Consts/Consts';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
//  ------------------------------Scrollbutton----------------------------------------
@ViewChild('chatbox') el: ElementRef;
  ngAfterViewChecked() { 
    if(!this.scrolling){   
    this.scrollToBottom(); 
    this.scrollhight =  this.el.nativeElement.scrollHeight;}       
} 
scrollToBottom(): void {
    try {
        this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
        
    } catch(err) { }                 
}

@HostListener('scroll', ['$event'])
onScroll(event: any) {

  this.scrolling = true;
  if (event.target.scrollTop ==0) {
    this.messageindx++;
    let h = event.target.scrollHeight;
    this.messageServices.getMessages(this.messageServices.CurrentUser.connectionId,this.messageindx)
    .subscribe((resp)=>{
      for(let m of resp.reverse()){
      this.messageServices.messages.unshift(m);}
      if(resp.length !=0){
      event.target.scrollTop = 20 ;
  }
      
    })
  }
if ( event.target.offsetHeight + event.target.scrollTop == event.target.scrollHeight) {
    this.scrolling = false;
}
  
  
}

 

  //  ------------------------------Variables----------------------------------------
  image : any ;
  firstname : any ;
  lastname : any ;
  showfriends = false;
  friends : any;
  consts : Consts =new Consts ;
  baseurl : string = this.consts.BaseUrl;
  search :string='';
  ShowFriendRequistList : boolean;
  message : any;
  username : any ;
  scrolling = false;
  messageindx = 1;
  scrollhight :any;
  //  ------------------------------constructor----------------------------------------
  constructor(private userServices : UserService , public messageServices:MessageService) { }




  //  ------------------------------When Page Load----------------------------------------
  async ngOnInit() {
      //  ------------------------------1) StartConnection With SingleR----------------------------------------
   await  this.messageServices.startConnection();
     //  ------------------------------2) Scrollbutton----------------------------------------
   
     //  ------------------------------3) User Data----------------------------------------
    this.image = localStorage.getItem('Image');
    this.firstname = localStorage.getItem('FirstName');
    this.lastname = localStorage.getItem('LastName');
    this.username = localStorage.getItem('UserName');
     //  ------------------------------4) Load Friends Data And Messages And Default Messages----------------------------------------
   
     if (!this.messageServices.profile){
             
      await this.messageServices.RealTimeProfile(localStorage.getItem('UserName'));}
  await this.userServices.GetGriends().subscribe(async (resp)=>{
                if(resp.length !=0){
                  this.messageServices.CurrentUser =  resp[0];
                  this.messageServices.friends=resp;
               await this.messageServices.intialMessage( this.messageServices.CurrentUser);
              setTimeout(() => {
                let element = document.getElementById("chatbox");
                if(element != null && this.messageServices.messages.length>0){
                element.scrollTop = element.scrollHeight;}
              }, 100);
                
                 
               
               
                  for(let f of this.messageServices.friends){
                  this.messageServices.JionChat(f.connectionId);
                  }
                 if(!this.messageServices.resivemessage){
                  this.messageServices.ResiveMessage();
                  this.messageServices.Seen();
                 }
                
                }
               
    }
    )

  }

   //  ------------------------------fOR RESPONSIVE WEB ----------------------------------------
  ShowForMobile(){
    this.showfriends = true;
  }
  hiddeFreind(){
    this.showfriends = false;
  }


   //  ------------------------------SEARCH IN FRIENDS---------------------------------------
  Search(e : any){
    if(e.value != ''){
    this.userServices.SearchFriend(e.value)
    .subscribe((resp)=>
     { this.messageServices.friends = resp;   console.log(resp);}
    )}
    else{
      this.userServices.GetGriends().subscribe(
        (resp)=>{this.messageServices.friends=resp;}
      )
    }
  }
   //  ------------------------------FRINDREQUISTS SHOW DIV----------------------------------------
  FriendRequist(){
    this.ShowFriendRequistList = true;
  }
  CloseFriendRequistList(){
    this.ShowFriendRequistList = false;
  }

   //  ------------------------------CONNECT WITH FRIEND----------------------------------------

  GetConnection(friend : any){
  
    this.scrollToBottom();
     this.messageServices.CurrentUser= friend;
    this.messageServices.intialMessage(friend);
   this.hiddeFreind();

   
  }
   //  ------------------------------1) SEND MESSAGE---------------------------------------
  SendMessage(){
    if(this.message){
      this.messageServices.SendMessage({ messageText :this.message  ,connectionId:  this.messageServices.CurrentUser.connectionId});
      this.message=undefined;
    }
  }

  Seen(){
    if(this.messageServices.messages.length >0){
      if(!this.messageServices.messages[this.messageServices.messages.length-1].seen && this.messageServices.messages[this.messageServices.messages.length-1].senderUserName != this.username){
    this.messageServices.seen( this.messageServices.CurrentUser.connectionId);
      }
  }
}
}
