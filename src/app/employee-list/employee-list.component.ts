import { HttpErrorResponse } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee';
import { EmployeeService } from '../services/employee.service';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  popoverTitle = 'Deleting employee';
  popoverMessage = 'Are you sure you want to delete?';
  confirmClicked = false;
  cancelClicked = false;

  employeeList: Employee [];

  constructor(private _employeeService : EmployeeService) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  public getAllEmployees(): void{
    this._employeeService.getAllEmployees().subscribe({
    next:  (result : Employee [])=>{this.employeeList = result;},
    error: (errors: HttpErrorResponse)=>{ alert(errors.message)}
  });
  
  }

  changePopoverMessage(id){
    this.popoverMessage = this.popoverMessage + " : " + id;
    console.log(this.popoverMessage )
  }


  delete(id: number){ 
    this._employeeService.deleteEmployee(id).subscribe({
      next: (result: void)=>{this.getAllEmployees()},
      error: (errors: HttpErrorResponse)=>{ alert(errors.message)}
    }) 
  }

  public searchEmployee(key: string): void{
      const results: Employee[]=[];
      for(const employee of this.employeeList){        
          if(employee.firstName.toLowerCase().indexOf(key.toLowerCase())!== -1
           || employee.lastName.toLowerCase().indexOf(key.toLowerCase())!== -1 
           || employee.email.toLowerCase().indexOf(key.toLowerCase())!== -1
           || employee.id === +key){
            results.push(employee);
          }
      }
      this.employeeList = results;
      if(results.length === 0 || !key){
        this.getAllEmployees();
      }
  }

  // ngOnInit(): void {
  //   this._employeeService.getAllEmployees().subscribe({
  //     next:  (result)=>{this.employeeList = result;},
  //     error: (errors)=>{ console.log(errors)}
  //   });
  // }

}
