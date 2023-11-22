import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LMSService } from '../lms.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.css']
})
export class LeaveManagementComponent implements OnInit {
  leaveManagementData: any[] | undefined;

  constructor(private router: Router, private lmsService: LMSService,private toastr: ToastrService) { }

  ngOnInit() {

    this.getLeaveStatusForManaged();
  }

  getLeaveStatusForManaged() {
    debugger;
    const managerName = localStorage.getItem('username'); // Assuming the manager's name is the username
    if (managerName) {
      this.lmsService.GetLeaveStatusForManagedUsers(managerName).subscribe(
        (data: any[]) => {
          this.leaveManagementData = data;
          console.log('Leave Status Data:', this.leaveManagementData);
        }
      );
    }
  }
  goToLeaveManagement() {
    this.router.navigate(['/leave-management']);
  }

  approveLeave(leave: any) {
    this.updateLeaveStatus(leave, 'Approved');
  }

  rejectLeave(leave: any) {
    this.updateLeaveStatus(leave, 'Rejected');
  }

  private updateLeaveStatus(leave: any, status: string) {
    const userId = leave.userId; 
    const startDate = leave.startDate;
    const endDate = leave.endDate;

    
    this.lmsService.updateLeaveStatus(userId, startDate, endDate, status).subscribe(
      () => {
        
        leave.status = status;
        console.log(`Leave ${status}:`, leave);
      },
      (error: any) => {
        console.error(`Error updating leave status:`, error);
      }
    );
  }
  logout() {
    this.toastr.success('Logout Sucessfully');
    this.router.navigate(['/login']);
    history.replaceState('', '', '/login');
  }

}
