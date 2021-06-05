import { NgModule } from '@angular/core';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmpFormTemplateComponent } from './emp-form-template/emp-form-template.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [EmployeeViewComponent, EmployeeAddComponent,EmployeeUpdateComponent, EmpFormTemplateComponent],
  imports: [
    EmployeeRoutingModule,
    SharedModule
  ]
})
export class EmployeeModule { }