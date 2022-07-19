import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { Consts } from 'src/Consts/Consts';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errors : string ;
  consts : Consts =new Consts ;
  baseurl : string = this.consts.BaseUrl ;
  
  form = new FormGroup({
    email : new FormControl('',Validators.compose([Validators.required,Validators.email])),
    password :  new FormControl('',Validators.required)
  });

  get Email(){
    return this.form.get('email');
  }
  get Password(){
    return this.form.get('password');
  }
  
  constructor(private AuthService:AuthService , private router : Router , private messageServices :MessageService) { }



  ngOnInit(): void {
  }
 async onSubmit(){
  await  this.AuthService.login(this.form.getRawValue()).
    subscribe(resp => {
      const token = resp.token;
      localStorage.setItem("FirstName",resp.firstName);
      localStorage.setItem("LastName",resp.lastName);
      localStorage.setItem("UserName",resp.userName);
      localStorage.setItem("email",resp.email);
      localStorage.setItem("Image",this.baseurl+resp.image)
      localStorage.setItem("jwt",token);
      localStorage.setItem("id",resp.id);
    this.router.navigate(['/']);
    },
    err => this.errors = err.error 
    );
  }
}
