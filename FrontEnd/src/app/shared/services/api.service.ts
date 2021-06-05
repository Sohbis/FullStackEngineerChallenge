import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  user = new BehaviorSubject('');

  accessType:number
  constructor(private http: HttpClient) {}

  login(url, data) {
    return this.http.post(environment.hostUrl + url, data)
      .pipe(
        map((d: any) => {
          // console.log('map data', d)
          sessionStorage.setItem('token', d.token)
          this.user.next(sessionStorage.getItem('token'));
          return d
        })
      )
  }

  checkUser(url) {
    return this.http.get(environment.hostUrl + url)

  }

  getEmpRecords(url) {
    return this.http.get(environment.hostUrl + url)
  }
  getEmp(url, data) {
    return this.http.post(environment.hostUrl + url, data)
  }

  addEmp(url, data) {
    return this.http.post(environment.hostUrl + url, data)
  }

  update(url, data) {
    return this.http.put(environment.hostUrl + url, data)
  }

  removeEmp(url, data) {
    console.log("removeEmp")
    return this.http.put(environment.hostUrl + url, data)
  }

  empNameByDept(url, data) {
    console.log("empNameByDept")
    return this.http.post(environment.hostUrl + url, data)
  }
  getEmpReview(url) {
    console.log("removeEmp")
    return this.http.get(environment.hostUrl + url)
  }

  addReview(url,data) {
    console.log("addReview")
    return this.http.post(environment.hostUrl + url,data)
  }
  getReview(url,data) {
    console.log("getReview")
    return this.http.post(environment.hostUrl + url,data)
  }
  updateReview(url,data) {
    console.log("updateReview")
    return this.http.put(environment.hostUrl + url,data)
  }
  pendingRecords(url,data) {
    console.log("pendingRecords")
    return this.http.post(environment.hostUrl + url,data)
  }
  getPendingReview(url,data) {
    console.log("getPendingReview")
    return this.http.post(environment.hostUrl + url,data)
  }
}
