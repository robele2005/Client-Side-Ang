import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../model/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  employeeForm!: FormGroup;
  submitted = false;
  id: number;
  
  
  constructor(private _formBuilder : FormBuilder,
    private _employeeService: EmployeeService, private _router: Router,
    private _route: ActivatedRoute) { }


  ngOnInit(): void {
    // initialize Employee object from the db
    this.id = this._route.snapshot.params['id'];
    this._employeeService.getEmployee(this.id).subscribe({
      next: (result)=>{this.employee = result;},
      error: (errors)=>(console.log(errors))
    });
    // for Form validation
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
    this.updateEmployee(this.employee);  
    this._router.navigate(['/home']); 
  }   

  public updateEmployee(employee: Employee): void{
    this._employeeService.updateEmployee(employee).subscribe({
      next: (result : Employee) =>{this.employee = result;},
      error: (errors: HttpErrorResponse)=>{ alert(errors.message)}      
  }); 
  }
}
