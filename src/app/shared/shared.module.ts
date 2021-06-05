import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { TblTemplateComponent } from './tbl-template/tbl-template.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TblTemplateComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
  
 
  ],
  exports:[CommonModule,ReactiveFormsModule,TblTemplateComponent,]
})
export class SharedModule { }
