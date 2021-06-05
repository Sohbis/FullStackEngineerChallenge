import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.scss']
})
export class EmployeeViewComponent implements OnInit {
  headers = ['ID', 'Firstname', 'Lastname', 'Designation', 'Department', 'Last Updated', 'Action']
  fetch
  title=`Employees Records`
  path='/employeeUpadte'
  constructor(public api: ApiService,) { }
  ngOnInit(): void {
    this.fetch=this.api.getEmpRecords('/empRecords')
  }

  // constructor(public api: ApiService, private router: Router) { }

  // ngOnInit(): void {
  //   this.getRecords()
  // }
  // getRecords() {
  //   this.api.getEmpRecords('/empRecords').subscribe((d: any) => {
  //     this.emp = d.data
  //     console.log('d', this.emp)
  //   })
  // }
  // getID(event) {
  //   if (event.target.tagName == "BUTTON") {
  //     console.log('ID', event.target.innerText)
  //     this.router.navigate([`/employeeUpadte`, event.target.innerText])
  //   }
  //   if (event.target.tagName == "I") {
  //     let id = event.target.parentNode.parentNode.firstElementChild.innerText
  //     console.log('ID', id)
  //     this.sweetAlert(id)
  //     // this.router.navigate([`/employeeUpadte`,event.target.innerText])
  //   }

  // }
  // sweetAlert(id) {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, delete it!',
  //     cancelButtonText: 'No, keep it'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.api.removeEmp('/removeEmp', { id: id }).subscribe((d) => {
  //         console.log('removeEmp', d)

  //         Swal.fire(
  //           'Deleted!',
  //           'Employee has been removed.',
  //           'success'
  //         )
  //         this.getRecords()
  //       })


  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       Swal.fire(
  //         'Cancelled',
  //         'Employee has not been removed',
  //         'error'
  //       )
  //     }
  //   })
  // }
}
