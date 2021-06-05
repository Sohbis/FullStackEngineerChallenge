import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerformanceRoutingModule } from './performance-routing.module';
import { ReviewTemplateComponent } from './review-template/review-template.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { UpdateReviewComponent } from './update-review/update-review.component';
import { ViewReviewComponent } from './view-review/view-review.component';
import { SharedModule } from '../shared/shared.module';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';


@NgModule({
  declarations: [ReviewTemplateComponent, AddReviewComponent, UpdateReviewComponent, ViewReviewComponent],
  imports: [
    CommonModule,
    PerformanceRoutingModule,  
    TypeaheadModule.forRoot(),
    SharedModule
  ]
})
export class PerformanceModule { }
