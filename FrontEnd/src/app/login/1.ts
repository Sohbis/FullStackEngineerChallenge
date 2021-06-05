import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  btnText: string
  loginForm: FormGroup
  userID = ''
  userCredential = { uname: '', password: null }
  isNewUser: boolean = false
  error=null
  constructor(private fb: FormBuilder, public api:ApiService) { }

  ngOnInit(): void {
    this.btnText = 'Next'

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['']
    })
  }
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
  next() {
    this.btnText == 'Next' ? this.checkUser() : this.login()

  }

  checkUser() {
    //check user api get username
    // console.log('username', this.username.value) 
    // this.userID= this.username.value
    this.userCredential.uname = this.username.value
    this.auth('/username',{uname: this.userCredential.uname })

  }
  login() {
    this.userCredential.password=this.password.value
    this.auth('/login',this.userCredential)
    //login Api call
  }
  auth(path,data){
    this.api.genericPost(path,data).subscribe((d)=>{
      console.log('d',d)
      this.btnText = 'Proceed'
      console.log('this.btnText', this.btnText)
      this.password.setValidators(Validators.required)
      this.password.updateValueAndValidity()
    }
    ,error=>{
      console.log('e',error.error) 
    }
    )
  }
  

}
