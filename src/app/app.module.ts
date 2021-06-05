import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/header/header.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from './shared/shared.module';
import { HttpInterceptInterceptor } from './shared/services/http-intercept.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
// import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    SharedModule,
    BrowserAnimationsModule,
    // BsDatepickerModule.forRoot(),
    // DatepickerModule.forRoot() 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass:HttpInterceptInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
