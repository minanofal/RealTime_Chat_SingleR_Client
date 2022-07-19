import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error : any;
  
  form = new FormGroup ({
    email : new FormControl('',Validators.compose([Validators.required,Validators.email])),
    firstName : new FormControl('',Validators.compose([Validators.required,Validators.maxLength(50)])),
    lastName : new FormControl('',Validators.compose([Validators.required,Validators.maxLength(50)])),
    userName : new FormControl('',Validators.compose([Validators.required,Validators.maxLength(50)])),
    password : new FormControl('',Validators.compose([Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    confirmPassword :  new FormControl('',Validators.required),
    gender : new FormControl('',Validators.required)

  });
  get Email(){
    return this.form.get('email');
  }
  get FirstName(){
    return this.form.get('firstName');
  }
  get LastName(){
    return this.form.get('lastName');
  }
  get UserName(){
    return this.form.get('userName');
  }
  get Password(){
    return this.form.get('password');
  }
  get ConfirmPassword(){
    
    if(this.form.getRawValue().password==this.form.getRawValue().confirmPassword && !this.form.get('confirmPassword')?.invalid){
      return false;
    }
    return true;
  }
  get Gender(){
    return this.form.get('gender')
  }
  constructor(private AuthService:AuthService , private router : Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.AuthService.Register(this.form.getRawValue()).
    subscribe(resp => {
      const token = resp.token;
      localStorage.setItem("FirstName",resp.firstName);
      localStorage.setItem("LastName",resp.lastName);
      localStorage.setItem("UserName",resp.userName);
      localStorage.setItem("email",resp.email);
      localStorage.setItem("Image","http://localhost:7101/"+resp.image)
      localStorage.setItem("jwt",token);
      localStorage.setItem("id",resp.id);
      this.router.navigate(['/']);
    },err=> this.error =err.error)
  }
}
