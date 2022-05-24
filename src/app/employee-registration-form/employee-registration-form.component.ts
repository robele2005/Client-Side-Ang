import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Employee } from '../model/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-registration-form',
  templateUrl: './employee-registration-form.component.html',
  styleUrls: ['./employee-registration-form.component.css']
})

export class EmployeeRegistrationFormComponent implements OnInit {

  employee: Employee = new Employee();
  employeeForm!: FormGroup;
  submitted = false;

  constructor(private _formBuilder : FormBuilder,
    private _employeeService: EmployeeService, private _router: Router) { }

  ngOnInit(): void {
    this.employee = {
      id:0,
      firstName: '',
      lastName: '',
      email: ''
    };
    this.employeeForm = this._formBuilder.group({
      firstName: ['', Validators.required], 
      lastName: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]]
    })
  }

  get fun(){
    return this.employeeForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(this.employeeForm.invalid){
      return;
    }
    console.log(this.employee)
    this.addEmployee(this.employee);
  }   

  public addEmployee(employee: Employee): void{
    this._employeeService.addEmployee(employee).subscribe({
      next: (result : Employee) =>{this.employee = result;
        this._router.navigate(['/home']);  },
      error: (errors: HttpErrorResponse)=>{ alert(errors.message)}      
  }); 

}
  
  

}
