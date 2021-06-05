import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  accessType:number;
  jwt= new JwtHelperService()
 
  constructor(private router: Router) {}

  getAccessType():number{
    return this.accessType
  }


  getToken(){
    // console.log('getToken')
    return sessionStorage.getItem('token')
  }
  getLoginUser(){
    return this.jwt.decodeToken(this.getToken())
  }
  isLoggedIn(){
    console.log('isLoggedIn')
    let jwt=sessionStorage.getItem('token')
    if (jwt!=null && jwt!=='undefined') {
      this.accessType=this.jwt.decodeToken(jwt).Role
      console.log('accessType',this.accessType)
    }
    return this.getToken() !==null
  }
  logout(){
    sessionStorage.removeItem('token')
    window.location.href = '/login';
  }
}
