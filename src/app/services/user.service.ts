import { Injectable } from '@angular/core';
import { Consts } from 'src/Consts/Consts';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/Models/UserModel';
import {Usersearch} from '../../Models/userModelSerarch.model'
import { FriendRequist } from 'src/Models/FriendRequistsModel';
import { Response } from 'src/Models/ResposneFriendRequist.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  consts : Consts =new Consts ;
  baseurl : string = this.consts.BaseUrl +'api' ;
 
  constructor(private http:HttpClient) { }

  public UpdateImage(img : any) :Observable<any>{
    const url = this.baseurl+"/Authenticationss/UpdateProfile";
    return this.http.post<any>(url,img);
   }

   public GetGriends(): Observable<User[]>{
    const url = this.baseurl+ '/Connections/GetFriends';
    return this.http.get<User[]>(url);
   }
   public SearchFriend(search :string): Observable<User[]>{
    const url = this.baseurl +'/Connections/Search/'+search;
    return this.http.get<User[]>(url);
   }

   public GetUserSearch():Observable<Usersearch[]>{
    const url = this.baseurl +'/Users/Users';
    return this.http.get<Usersearch[]>(url);
   }
   public GetSearch(search : string):Observable<Usersearch[]>{
    const url = this.baseurl+'/Users/user/'+search;
    return this.http.get<Usersearch[]>(url);
   }
   public SendFriendRequist(username : string) : Observable<any>{
    const url = this.baseurl+'/FriendRequists/SendFriendRequist/'+username;
    return this.http.post<any>(url,username);
   }
 public GetFriendRequists() : Observable<FriendRequist[]> {
    const url = this.baseurl+'/FriendRequists/FriendRequists';
    return this.http.get<FriendRequist[]>(url);
 }
 public AcceptFriendRequist(res:Response) : Observable<any>{
const url = this.baseurl+'/FriendRequists/ResponseFreindRequist' ;
return this.http.post<any>(url,res);
 }
  public CancelRequist(userNmae : string) :Observable<any>{
    const url = this.baseurl+'/FriendRequists/CancelFriendRequist/'+ userNmae;
    return this.http.post(url,userNmae);
  }
  public GetNoFriendRequists() : Observable<any>{
    const url = this.baseurl+'/FriendRequists/GetNoRequists';
    return this.http.get<any>(url);
  }
}
