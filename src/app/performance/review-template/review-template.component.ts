import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';
// import { PerformanceReview } from '../performance.model';

@Component({
  selector: 'app-review-template',
  templateUrl: './review-template.component.html',
  styleUrls: ['./review-template.component.scss']
})
export class ReviewTemplateComponent implements OnInit {
  @Input() data: any
  @Input() action: string
  reviewForm: FormGroup;
  header: string
  departmentArr = ['IT', 'Finance', 'Human Resource']
  ratingArr = [1, 2, 3, 4, 5]
  names = []
  managerName = []
  id: any;
  reviewerID: any;
  designation = 'Employee Designation';
  saveForm: any;

  constructor(private fb: FormBuilder, public api: ApiService, private router: Router) { }

  ngOnInit(): void {
    console.log('action', this.action)
    this.reviewForm = this.fb.group({
      department: ['', [Validators.required]],
      firstName: ['', [Validators.required, this.checkDepartmentFirst.bind(this)]],
      reviewer: ['', [this.checkDepartmentFirst.bind(this)]],
      communication: ['', [Validators.required]],
      projectDelivery: ['', [Validators.required]],
      selfInitiative: ['', [Validators.required]],
      tat: ['', [Validators.required]],
    })
    this.saveForm=this.reviewForm.value

    if (this.data) {
      this.getPreviousData()
    }
  }

  getPreviousData(){
    console.log('Received data', this.data)
      this.department.setValue(this.data.Department)
      this.firstName.setValue(this.data.Firstname)
      this.communication.setValue(this.data.Communication)
      this.projectDelivery.setValue(this.data['Project Delivery'])
      this.selfInitiative.setValue(this.data['Self Initiative'])
      this.tat.setValue(this.data.TAT)
      this.id = this.data.ID
      this.designation = this.data.Designation
      this.getNamesOFEmp(this.data.Department)
      this.department.disable()
      this.firstName.disable()
  }

  get firstName() {
    return this.reviewForm.get('firstName')
  }
  get reviewer() {
    return this.reviewForm.get('reviewer')
  }
  get communication() {
    return this.reviewForm.get('communication')
  }
  get projectDelivery() {
    return this.reviewForm.get('projectDelivery')
  }
  get tat() {
    return this.reviewForm.get('tat')
  }
  get selfInitiative() {
    return this.reviewForm.get('selfInitiative')
  }
  get department() {
    return this.reviewForm.get('department')
  }

  selectDept(e) {
    console.log('Department', e)
    this.firstName.reset()
    this.reviewer.reset()
    this.getNamesOFEmp(e)

  }

  getNamesOFEmp(e) {
    this.api.empNameByDept('/empNameByDept', { department: e }).subscribe((d: any) => {
      console.log('d', d)
      this.names = d.data
      for (let i of d.data) {
        console.log('i', i['Designation'])
        if (i['Designation'] == 'Manager') {
          this.managerName.push(i)
        }
      }
    })
  }
  typeaheadNoResults($event) {

  }
  onSelect(event: TypeaheadMatch): void {
    this.id = event.item.ID[0]
    console.log('id', event.item)
    if (event.item.Designation == 'Manager') {
      this.reviewer.reset()
      this.reviewer.disable()
    } else {
      this.reviewer.reset()
      this.reviewer.enable()
    }
    this.designation = event.item.Designation

  }
  onSelectReviewer(event: TypeaheadMatch): void {
    this.reviewerID = event.item.ID[0]
    let stars: any = document.getElementsByClassName('req1')
    for (let star of stars) {
      star.style.display = 'none'
    }
    this.communication.clearValidators()
    this.selfInitiative.clearValidators()
    this.projectDelivery.clearValidators()
    this.tat.clearValidators()
    console.log('id', this.reviewerID)
  }
  nameChange() {

  }
  submit() {

    let data
    if (this.reviewer.value !== '') {
      data = { reviewerID: this.reviewerID, id: this.id, form: this.reviewForm.value, status: 2 }

    }
    else if(this.action == 'Submit Feedback'){
      data = { reviewerID: sessionStorage.getItem('userID'), id: this.id, form: this.reviewForm.value, status: 1 }
    } 
    
    else {
      data = { reviewerID: sessionStorage.getItem('userID'), id: this.id, form: this.reviewForm.value, status: 1 }
    }
    console.log('data to submit', data)
    if (this.action == 'Add Review') {
      console.log('Review Data', data)
      this.sweetAlert(
        this.api.addReview('/addReview', data),
        '/addReview'
      )
    }
    else if (this.action == 'Update Review' ||this.action == 'Submit Feedback') {
      this.sweetAlert(
        this.api.updateReview('/updateReview', data),
        '/viewReview'
      )
    }
    
  }

  clear() {
    console.log('this.saveForm', this.saveForm)
    this.reviewForm.reset()
    if (this.data) {
      this.department.setValue(this.data.Department)
      this.firstName.setValue(this.data.Firstname)
    }else{
      this.reviewForm.setValue(this.saveForm)
    }
    
  }


  checkDepartmentFirst(control: AbstractControl): ValidationErrors {
    try {

      let dept = this.department.value
      let reviewer = this.reviewer.value
      console.log('control', dept, reviewer)
      if (reviewer == '') {
    
      }
      if (dept == '') {
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
            this.clear()
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

}
