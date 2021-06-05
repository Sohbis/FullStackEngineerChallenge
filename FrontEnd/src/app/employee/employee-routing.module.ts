import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';

const routes: Routes = [
  {
    path: 'employeeView',
    component: EmployeeViewComponent,
    pathMatch: 'full'
  },
  {
    path: 'employeeAdd',
    component: EmployeeAddComponent,
    pathMatch: 'full'
  },
  {
    path: 'employeeUpadte/:id',
    component: EmployeeUpdateComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
