import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consts } from 'src/Consts/Consts';
import { Observable } from 'rxjs';
import { Auth } from 'src/Models/AuthenticationModels/Auth.Model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  consts : Consts =new Consts ;
  baseurl : string = this.consts.BaseUrl+'api/Authenticationss/' ;

  constructor(private http:HttpClient) { }
  public login(form : any) : Observable<Auth>{
    const url = this. baseurl+'Login';
    return this.http.post<Auth>(url,form);
  }
  public Register(form : any):Observable<Auth>{
    const url = this. baseurl+"Register";
    return this.http.post<Auth>(url,form);
  }
}
