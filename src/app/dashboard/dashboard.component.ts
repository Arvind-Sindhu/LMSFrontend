import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LMSService } from '../lms.service';
import { LeaveApplication } from '../model';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isPopupOpen = false;
  leaveApplicationData: LeaveApplication = {
     
    employeeName: '',
    leaveStartDate: new Date(),
    leaveEndDate: new Date(),
    leaveType: '',
    reason: ''
  };

  constructor(private httpClient: HttpClient, private router: Router, private lmsService: LMSService) {}


  openLeaveApplicationPopup() {
    this.isPopupOpen = true;
  }

  closeLeaveApplicationPopup() {
    this.isPopupOpen = false;
  }

  submitLeaveApplication() {
    debugger;
    this.lmsService.submitLeaveApplication(this.leaveApplicationData).subscribe(
      (response) => { 
       console.log(this.leaveApplicationData);
       
      });
      alert("Leave applied Sucessfully")
      this.closeLeaveApplicationPopup();
    
    
  }
  

  resetLeaveApplication() {
    // Reset the form
  }

  logout() {
    alert('Logout Successful');
    this.router.navigate(['/login']);
  }
}
