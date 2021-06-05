import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // btnText: string
  loginForm: FormGroup
  userCredential = { id: null, password: null, action: null }
  isNewUser: boolean = false
  error = null
  constructor(private fb: FormBuilder, public api: ApiService, private renderer: Renderer2, private router: Router) { }
  @ViewChild('pass') passwordInpField: ElementRef;
  ngOnInit(): void {
    // this.btnText = 'Next'

    this.loginForm = this.fb.group({
      userID: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      passwords: this.fb.group({
        password: [null, [Validators.required]],
        confirmPassword: [null,[Validators.minLength(3)]]
      })
    })
  }
  get userID() {
    return this.loginForm.get('userID');
  }
  get password() {
    return this.loginForm.get('passwords').get('password')
  }
  get confirmPassword() {
    return this.loginForm.get('passwords').get('confirmPassword')
  }
  next() {
    // console.log(this.loginForm.value);
    this.userCredential.id = this.userID.value
    this.userCredential.password = this.password.value
    sessionStorage.setItem('userID',this.userID.value)
    if (!this.isNewUser) {
      this.userCredential.action='login'
      this.auth('/login', this.userCredential)
    } else {
      this.userCredential.action='changePassword'
      this.changePassword()
    }
    console.log('userCredential', this.userCredential)
  }

  auth(path, data) {
    this.api.login(path, data).subscribe((d: any) => {
      console.log('d', d)
      if (d.status == 2) {
        this.isNewUser = true
        this.password.reset()
        this.renderer.setProperty(this.passwordInpField.nativeElement, 'placeholder', 'New Password')
        this.loginForm.get('passwords').setValidators(this.validatePassword.bind(this))
        this.loginForm.get('passwords').updateValueAndValidity()

      }
      else {
        this.isNewUser = false

        this.router.navigate(['/home'])
      }
      console.log('isNewUser', this.isNewUser)
    }
      , error => {
        console.log('e', error.error)
      }
    )
  }

  changePassword() {
    this.auth('/login', this.userCredential)
  }

  validatePassword(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    console.log('password', password)
    console.log('confirmPassword', confirmPassword)
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

}
