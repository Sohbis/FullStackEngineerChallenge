import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoaded: boolean = false
  constructor(public api: ApiService, public auth: AuthService) { }

  ngOnInit(): void {
    this.api.checkUser('/auth').subscribe((d: any) => {
      console.log('d-home', d)
      if (d.success) {
        this.isLoaded = true
      } else {
        // this.auth.logout()
      }
    })
  }

}
