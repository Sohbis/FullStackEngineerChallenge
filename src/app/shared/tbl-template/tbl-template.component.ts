import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tbl-template',
  templateUrl: './tbl-template.component.html',
  styleUrls: ['./tbl-template.component.scss']
})
export class TblTemplateComponent implements OnInit {

@Input() headers=[]
@Input() title=''
@Input() rows=[]
@Input() fetch
@Input() path
isShow=false
constructor(public api: ApiService, private router: Router) { }

ngOnInit(): void {
  this.getRecords()
}
getRecords() {
 this.fetch.subscribe((d: any) => {
   console.log('fetch data', d)
   try {
    this.rows = d.data
    console.log('d', this.rows)
    this.isShow=true
   } catch (error) {
     
   }
 
  })
}
getID(event) {
  if (event.target.tagName == "BUTTON") {
    console.log('ID', event.target.innerText)
    this.router.navigate([this.path, event.target.innerText])
  }
  if (event.target.tagName == "I") {
    let id = event.target.parentNode.parentNode.firstElementChild.innerText
    console.log('ID', id)
    this.sweetAlert(id)
    // this.router.navigate([`/employeeUpadte`,event.target.innerText])
  }

}
sweetAlert(id) {
  Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.isConfirmed) {
      this.api.removeEmp('/removeEmp', { id: id }).subscribe((d) => {
        console.log('removeEmp', d)
        
        Swal.fire(
          'Deleted!',
          'Employee has been removed.',
          'success'
        )
        this.getRecords()
      })
    

    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Employee has not been removed',
        'error'
      )
    }
  })
}

}
