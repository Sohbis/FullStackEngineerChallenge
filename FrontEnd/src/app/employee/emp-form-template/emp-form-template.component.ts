import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-emp-form-template',
  templateUrl: './emp-form-template.component.html',
  styleUrls: ['./emp-form-template.component.scss']
})
export class EmpFormTemplateComponent implements OnInit {
  @Input() data: Employee
  // @Input()  btnFunction
  @Input() action: string
  empForm: FormGroup;
  header: string
  departmentArr = ['IT', 'Finance', 'Human Resource']
  constructor(private fb: FormBuilder, public api: ApiService, private router: Router) { }

  ngOnInit(): void {
    if (this.action == 'update') {
      this.header = 'Update Employee'
    } else {
      this.header = 'Add New Employee'
    }
    this.empForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      department: ['', [Validators.required]],
      designation: ['', [Validators.required, this.checkDepartmentFirst.bind(this)]],
    })
    if (this.data) {
      console.log('Received data', this.data)

      this.firstName.setValue(this.data.FirstName)
      this.lastName.setValue(this.data.LastName)
      this.designation.setValue(this.data.Designation)
      this.department.setValue(this.data.Department)
    }

    // this.designation.valueChanges.subscribe(()=>{
    //   this.designation.setValidators(this.checkDepartmentFirst.bind(this))
    //   this.designation.updateValueAndValidity()
    // })

    // this.empForm.get('department').setValidators(this.checkDepartmentFirst.bind(this))
    // this.empForm.get('department').updateValueAndValidity()
  }

  get firstName() {
    return this.empForm.get('firstName')
  }
  get lastName() {
    return this.empForm.get('lastName')
  }
  get designation() {
    return this.empForm.get('designation')
  }
  get department() {
    return this.empForm.get('department')
  }

  submit() {
    console.log('Form', this.empForm.value)
    if (this.action == 'update') {
      this.sweetAlert(
        this.api.update('/update', { id: sessionStorage.getItem('id'), form: this.empForm.value }),
        '/employeeView')

    } else {
      this.sweetAlert(
        this.api.addEmp('/addEmp', { form: this.empForm.value }),
        '/employeeAdd'
      )
     
    }
  }
  clear() {
    this.empForm.reset()
  }

  checkDepartmentFirst(control: AbstractControl): ValidationErrors {
    try {
      console.log('control', this.department.value)
      if (control.get('department').value == '') {
        console.log('1')
        return { 'err': { value: 'Enter Department first' } }
      } else {
        return null
      }
    } catch {

    }

  }

  sweetAlert(api, path) {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        api.subscribe((d) => {
          Swal.fire(
            'Operation successfull!',
          ).then(() => {
            this.router.navigate([path])
          })

        }, error => {
          console.log('e', error.error)
          Swal.fire(
            'Operation failed!',
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
        )
      }
    })
  }
  back(){
    this.router.navigate(['/employeeView'])
  }
}






