import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';

import { EmployeeRegistrationFormComponent } from './employee-registration-form/employee-registration-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';



@NgModule({
  declarations: [
    AppComponent, 
    EmployeeRegistrationFormComponent, 
    EmployeeListComponent, UpdateEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule, 
    ConfirmationPopoverModule.forRoot({confirmButtonType: 'danger'})  // set defaults here
  ],
  providers: [],
  bootstrap: [AppComponent] // AppComponent
})
export class AppModule { }
