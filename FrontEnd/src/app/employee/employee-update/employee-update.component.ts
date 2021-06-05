import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss']
})
export class EmployeeUpdateComponent implements OnInit {
  data: Employee
  action: string = 'update'
  constructor(private route: ActivatedRoute, public api: ApiService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((p: any) => {
      console.log('p', p.params.id)
      sessionStorage.setItem('id', p.params.id)
      this.api.getEmp('/getEmp', { id: +p.params.id }).subscribe((d: any) => {
        this.data = d.data[0]
        console.log('emp data', this.data)
      })

    })
  }

}
