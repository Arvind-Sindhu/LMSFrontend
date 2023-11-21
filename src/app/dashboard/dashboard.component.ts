import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LMSService } from '../lms.service';
import { LeaveApplication } from '../model';
import { HttpClient } from '@angular/common/http';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  isPopupOpen = false;
  managerNames: string[] = [];
  employeeInputType: string = 'dropdown';
  leaveApplication: LeaveApplication = {} as LeaveApplication;
  username: string | undefined;
  

  constructor(private httpClient: HttpClient, private router: Router, private lmsService: LMSService) {}

  ngOnInit() {
    // Retrieve the username from localStorage
    this.username = localStorage.getItem('username')!;

    // Fetch manager names
    this.getManagerNames();
  }

  getManagerNames() {
    this.lmsService.getManagerNames().subscribe(
      (data: string[]) => {
        this.managerNames = data;
      },
      (error: any) => {
        console.error('Error fetching manager names:', error);
      }
    );
  }

  openLeaveApplicationPopup() {
    this.sidenav.close();
    this.isPopupOpen = true;
    
  }

  closeLeaveApplicationPopup() {
    this.isPopupOpen = false;
  }

  submitLeaveApplication() {
    const userId = localStorage.getItem('id');

    if (userId !== null) {
      this.leaveApplication.userId = parseInt(userId, 10);

      // Convert dates to strings before sending them to the server
      this.lmsService.submitLeaveApplication(this.leaveApplication).subscribe(
        (response) => {
          console.log(this.leaveApplication);
        });
      alert('Leave applied successfully');
      this.closeLeaveApplicationPopup();
    }
  }

  resetLeaveApplication() {
    // Reset the form
    this.leaveApplication = {} as LeaveApplication;
  }

  logout() {
    alert('Logout Successful');
    this.router.navigate(['/login']);
    history.replaceState('','','/login');
  }
  
}
