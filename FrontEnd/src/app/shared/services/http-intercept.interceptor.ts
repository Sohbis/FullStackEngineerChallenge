import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable()
export class HttpInterceptInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService,) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('intercept')
    let modifyRequest=request.clone({
      headers:request.headers.set('content-Type', 'application/json').set('authorization','bearer '+sessionStorage.getItem('token'))
    })
    if(request.url!=='/'&& request.url!=='/login'){
      
    }
    return next.handle(modifyRequest).pipe(retry(1),catchError((_error:HttpErrorResponse)=>{
      console.log('intercept error')
      alert(_error.error?_error.error:'Something Went Wrong')
      let errorMsg=''
      this.auth.logout()
      return throwError(errorMsg)
    }));
  }
}
