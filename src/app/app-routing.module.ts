import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component'; 
import { LoginComponent } from './login/login.component'; 
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms'; // Adjust the import path based on your project structure
import { LeaveStatusComponent } from './leave-status/leave-status.component';
import { LeaveManagementComponent } from './leave-management/leave-management.component';
import { AuthGuard } from './auth/auth.guard';
// Adjust the import path based on your project structure



const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' }, 
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
  { path: 'leave-status', component: LeaveStatusComponent,canActivate: [AuthGuard] }, 
  { path: 'leave-management', component: LeaveManagementComponent,canActivate: [AuthGuard] },
 
];


@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
