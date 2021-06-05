import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddReviewComponent } from './add-review/add-review.component';
import { UpdateReviewComponent } from './update-review/update-review.component';
import { ViewReviewComponent } from './view-review/view-review.component';


const routes: Routes = [
  {
    path: 'addReview',
    component: AddReviewComponent,
    pathMatch: 'full'
  },
  {
    path: 'updateReview/:id',
    component: UpdateReviewComponent,
    pathMatch: 'full'
  },
  {
    path: 'viewReview',
    component: ViewReviewComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceRoutingModule { }
