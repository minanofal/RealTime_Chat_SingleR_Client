import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  image : any ;
  name : any;
  requists : any;
  @Output() friendRequist :EventEmitter<any> = new EventEmitter();
  constructor(private router : Router , private userServices : UserService , public messageServcies : MessageService)  { }

  ngOnInit(): void {
    this.image = localStorage.getItem('Image');
    this.name = localStorage.getItem('FirstName');
    this.userServices.GetNoFriendRequists().
    subscribe( resp => {
      this.messageServcies.requists=resp;
      this.messageServcies.FirndRequists();
    });
  
  }
  logout(){
    
    localStorage.removeItem("FirstName");
    localStorage.removeItem("LastName");
    localStorage.removeItem("UserName");
    localStorage.removeItem("Image")
    localStorage.removeItem("jwt");
    localStorage.removeItem("id");
    this.router.navigate(['login']);
  }
  FreindRequists(){
    this.friendRequist.emit();
  }
}
