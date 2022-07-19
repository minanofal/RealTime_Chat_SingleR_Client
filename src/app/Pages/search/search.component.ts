import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Consts } from 'src/Consts/Consts';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  usersSearch : any;
  consts : Consts =new Consts ;
  baseurl : string = this.consts.BaseUrl;
  ShowFriendRequistList : boolean;
  constructor(private userServices:UserService) { }

  ngOnInit(): void {
    this.userServices.GetUserSearch().
    subscribe(resp => {this.usersSearch = resp; }
      );
  }

  SendAdd(user : any){
    
    this.userServices.SendFriendRequist(user.userName)
    .subscribe(resp =>{ 
      user.status = 'send requist';
    })
  }

  CancelAdd(user:any){
    this.userServices.CancelRequist(user.userName)
    .subscribe(resp =>{ 
      user.status = 'not friend';
    })
  }

Search(e : any){
  if(e.value !=''){
    this.userServices.GetSearch(e.value)
    .subscribe(resp=>{this.usersSearch=resp;
    });}
    else{
      this.userServices.GetUserSearch().
      subscribe(resp => {this.usersSearch = resp;});
    }

  }
  FriendRequist(){
    this.ShowFriendRequistList = true;
  }
  CloseFriendRequistList(){
    this.ShowFriendRequistList = false;
  }
 
}
