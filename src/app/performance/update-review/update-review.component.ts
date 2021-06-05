import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-update-review',
  templateUrl: './update-review.component.html',
  styleUrls: ['./update-review.component.scss']
})
export class UpdateReviewComponent implements OnInit {
  action=''
  data:any
  constructor(private route:ActivatedRoute, public api:ApiService,public auth: AuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((p: any) => {
      console.log('p', p.params.id)
      sessionStorage.setItem('id', p.params.id)
      if(this.auth.getLoginUser().Role==1){
        this.action='Update Review'
        this.api.getReview('/getReview', { id: +p.params.id }).subscribe((d: any) => {
          this.data = d.data[0]
          console.log('emp data', this.data)
        })
      }
      else{
        this.action='Submit Feedback'
        this.api.getPendingReview('/getPendingReview', { id: +p.params.id }).subscribe((d: any) => {
          this.data = d.data[0]
          console.log('emp data', this.data)
        })
      }
     

    })
  }

  

}
