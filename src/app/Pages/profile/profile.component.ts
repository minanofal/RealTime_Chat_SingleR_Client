import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Consts } from 'src/Consts/Consts';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  image : any ;
  firstname : any ;
  lastname : any ;
  email : any ;
  username : any;
  ShowFriendRequistList : boolean;

  consts : Consts =new Consts ;
  baseurl : string = this.consts.BaseUrl ;
  
  constructor(private router : Router ,private userervices:UserService) { }

  ngOnInit(): void {
    this.image = localStorage.getItem('Image');
    this.firstname = localStorage.getItem('FirstName');
    this.lastname = localStorage.getItem('LastName');
    this.email = localStorage.getItem('email');
    this.username = localStorage.getItem('UserName')
  
  }
  addPhoto(event : any){
    const newImage = new FormData();
    newImage.append('image' ,  event.target.files[0]);
    this.userervices.UpdateImage(newImage).subscribe(
     ( resp) =>{ 
  this.image=this.baseurl+resp.image;
  localStorage.setItem("Image",this.baseurl+resp.image);
  window.location.reload();
     })
  }

  FriendRequist(){
    this.ShowFriendRequistList = true;
  }
  CloseFriendRequistList(){
    this.ShowFriendRequistList = false;
  }
}
