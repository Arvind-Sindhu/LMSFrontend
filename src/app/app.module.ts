import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LMSService } from './lms.service';
import { HttpClientModule } from '@angular/common/http';
import { LeaveStatusComponent } from './leave-status/leave-status.component';
import { LeaveManagementComponent } from './leave-management/leave-management.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    LeaveStatusComponent,
    LeaveManagementComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,ReactiveFormsModule
  ],
  providers: [LMSService],
  bootstrap: [AppComponent]
})
export class AppModule { }
