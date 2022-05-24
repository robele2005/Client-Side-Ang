import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeRegistrationFormComponent } from './employee-registration-form/employee-registration-form.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';

const routes: Routes = [
    {path:'', redirectTo: 'home', pathMatch: 'full'},
    {path:'home', component: EmployeeListComponent},
    {path:'add-employee', component: EmployeeRegistrationFormComponent},
    {path:'update-employee/:id', component: UpdateEmployeeComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
