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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';

import { ToastrModule } from 'ngx-toastr';


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
    FormsModule,ReactiveFormsModule,MatSidenavModule,MatListModule, BrowserAnimationsModule,MatIconModule,ToastrModule.forRoot(),
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
  ],
  providers: [LMSService],
  bootstrap: [AppComponent]
})
export class AppModule { }
