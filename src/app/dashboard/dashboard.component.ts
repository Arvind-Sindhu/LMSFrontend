import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LMSService } from '../lms.service';
import { LeaveApplication } from '../model';
import { HttpClient } from '@angular/common/http';
import { MatSidenav } from '@angular/material/sidenav';
import { ToastrService } from 'ngx-toastr';

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
  

  constructor(private httpClient: HttpClient, private router: Router, private lmsService: LMSService,private toastr: ToastrService) {}

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

      
      this.lmsService.submitLeaveApplication(this.leaveApplication).subscribe(
        (response) => {
          console.log(this.leaveApplication);
        });
        this.toastr.success('Leave Submitted Sucessfully');
      this.closeLeaveApplicationPopup();
    }
  }

  resetLeaveApplication() {
  
    this.leaveApplication = {} as LeaveApplication;
  }

  logout() {
    this.toastr.success('Logout Sucessfully');
    this.router.navigate(['/login']);
    history.replaceState('','','/login');
  }
  
}
