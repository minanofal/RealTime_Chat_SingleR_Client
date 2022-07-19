import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { Consts } from 'src/Consts/Consts';

@Component({
  selector: 'app-friendrequistlist',
  templateUrl: './friendrequistlist.component.html',
  styleUrls: ['./friendrequistlist.component.css']
})
export class FriendrequistlistComponent implements OnInit {
  friendRequists : any;
  consts : Consts =new Consts ;
  baseurl : string = this.consts.BaseUrl;
  @Output() ClosefriendRequistList :EventEmitter<any> = new EventEmitter();

  constructor(private userServices : UserService , private messagService:MessageService) { }

  ngOnInit(): void {
    this.userServices.GetFriendRequists().subscribe(
      resp =>{this.friendRequists=resp; }
    );
  }
  CloseFriendRequistList(){
    this.ClosefriendRequistList.emit();
  }
  AcceptFriendRequist(fid : string){
    this.userServices.AcceptFriendRequist({id : fid , isFriend : true})
    .subscribe(resp =>{
      this.userServices.GetFriendRequists().subscribe(
        resp =>{this.friendRequists=resp; 
          this.userServices.GetGriends().subscribe(
            (resp) => {this.messagService.friends = resp;
              this.messagService.JionChat(resp[resp.length-1].connectionId);
            if(!this.messagService.CurrentUser){
              this.messagService.CurrentUser = resp[0];
            }
            if(!this.messagService.resivemessage){
              this.messagService.ResiveMessage();
              this.messagService.Seen();
             }
            
          });
            this.userServices.GetNoFriendRequists().
                subscribe( resp => this.messagService.requists=resp);  
          }
      );
    })
   
  }
  CancelFriendRequist(fid : string){
    this.userServices.AcceptFriendRequist({id : fid , isFriend : false})
    .subscribe(resp =>{
      this.userServices.GetFriendRequists().subscribe(
        resp =>{this.friendRequists=resp;
          this.userServices.GetGriends().subscribe(
            resp => this.messagService.friends = resp    );
            this.userServices.GetNoFriendRequists().
            subscribe( resp => this.messagService.requists=resp);   }
      );
    });

  }
}
