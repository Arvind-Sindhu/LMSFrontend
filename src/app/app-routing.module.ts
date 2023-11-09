import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component'; 
import { LoginComponent } from './login/login.component'; 
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms'; // Adjust the import path based on your project structure
import { LeaveStatusComponent } from './leave-status/leave-status.component';
// Adjust the import path based on your project structure



const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' }, // Redirect the root path to the 'signup' path
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'leave-status', component: LeaveStatusComponent }, // Add this line for the Dashboard component
  // Add other routes for different components/pages here
];


@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
