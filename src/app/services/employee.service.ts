import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../model/employee';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // added from internet to avoid "Http failure during parsing" error in the browser for delet function
  // source https://lazzygeek.com/2020/09/12/angularjs-solved-httpclient-http-failure-during-parsing-error-for-valid-json/
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      "Access-Control-Allow-Origin": "*",

    } ),responseType: 'text' as 'json'
  };

  private apiServerUrl = environment.apiBaseUrl;  // apiBaseUrl: 'http://localhost:8080' declared in environment.ts file

  constructor(private _http: HttpClient) {   }

  // @GetMapping("/employees")
 public getAllEmployees(): Observable<Employee[]> {
    return this._http.get<Employee[]>(`${this.apiServerUrl}/api/employees`);
  }

  // @GetMapping("/employees/id")
  public getEmployee(employeeId: number): Observable<Employee> {
     return this._http.get<Employee>(`${this.apiServerUrl}/api/employees/${employeeId}`);
  }

  //@PostMapping("/employees")
  public addEmployee(employee: Employee): Observable<Employee> {
    return this._http.post<Employee>(`${this.apiServerUrl}/api/employees`, employee);
  }

  //@PutMapping("/employees")
  public updateEmployee(employee: Employee): Observable<Employee> {
    return this._http.put<Employee>(`${this.apiServerUrl}/api/employees`, employee);
  }

  //@DeleteMapping("/employees/{employeeId}")
  public deleteEmployee(employeeId: number): Observable<void> {
    return this._http.delete<void>(`${this.apiServerUrl}/api/employees/${employeeId}`, this.httpOptions);
  }

}


