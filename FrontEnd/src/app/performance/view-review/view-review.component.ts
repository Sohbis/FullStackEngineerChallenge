import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-view-review',
  templateUrl: './view-review.component.html',
  styleUrls: ['./view-review.component.scss']
})
export class ViewReviewComponent implements OnInit {
headers=['ID','Firstname','Department','Communication','Project Delivery','Self Initiative','TAT','Month','Year','Status','Last Updated']
fetch
title=`Employees Performance Reviews`
path='/updateReview'
constructor(public api:ApiService,public auth: AuthService) { }

  ngOnInit(): void {
    if(this.auth.getAccessType()==1){
      this.fetch=this.api.getEmpReview('/reviewRecords')
    }else{
      this.fetch=this.api.pendingRecords('/pendingRecords', {reviewerID:sessionStorage.getItem('userID')})
    }
    
  }

}
