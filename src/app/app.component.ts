import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ApiService } from './shared/services/api.service';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isloggedIn: boolean;
  constructor(private router: Router, public auth: AuthService, public api: ApiService,) { }
  title = 'BayMax';

  ngOnInit(): void {
    //   if(!this.auth.isLoggedIn()){
    //     this.isloggedIn=false

    // }else{
    //   this.isloggedIn=true
    // }
    console.log('ngOnInit', sessionStorage.getItem('token'))
    
    if (sessionStorage.getItem('token')!=null && sessionStorage.getItem('token')!=='undefined') {
      this.isloggedIn = true
      console.log('isloggedIn', this.isloggedIn)
    }
    else {
      this.api.user.subscribe((d) => {

        console.log('token', d)
        if (d == '' || d == null || d=='undefined') {
          this.isloggedIn = false
        } else {
          this.isloggedIn = true
        }
        console.log('isloggedIn 2', this.isloggedIn)
      })
    }

    // this.router.events.forEach((e) => {

    //   if (e instanceof NavigationStart) {
    //     console.log('e',e['url'] )
    //     if (e['url'] == '/login' || e['url'] == '/') {
    //       this.isloggedIn = false
    //     } else {
    //       this.isloggedIn = true
    //     }
    //   }
    // })

  }
}
