import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LMSService } from '../lms.service';

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.css']
})
export class LeaveManagementComponent implements OnInit {
  leaveManagementData: any[] | undefined;

  constructor(private router: Router, private lmsService: LMSService) {}

  ngOnInit() {
    // Call the getLeaveManagementData() method when the component is initialized
   // this.getLeaveManagementData();
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
        },
        (error: any) => {
          console.error('Error fetching leave status for managed users:', error);
        }
      );
    }
  }

  // getLeaveManagementData() {
  //   debugger;
  //   const userId = localStorage.getItem('id'); // Get logged-in user ID
  
  //   if (userId) {
  //     // Fetch managerName for the logged-in user
  //     this.lmsService.getManagerName(parseInt(userId, 10)).subscribe(
  //       (managerName: string) => {
  //         console.log('Fetched Manager Name:', managerName);
  
  //         // Fetch user data based on the manager's name
  //         this.lmsService.getLeaveStatusByManagerName(managerName).subscribe(
  //           (data: any[] | undefined) => {
  //             console.log('Fetched Leave Management Data:', data);
  //             // Use the fetched data as needed
  //             this.leaveManagementData = data;
  //           },
  //           (error: any) => {
  //             console.error('Error fetching leave management data:', error);
  //           }
  //         );
  //       },
  //       (error: any) => {
  //         console.error('Error fetching manager name:', error);
  //       }
  //     );
  //   }
  // }


  

  // Add this method to navigate to the LeaveManagementComponent
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
    const userId = leave.userId; // Assuming userId is available in the leave object
    const startDate = leave.startDate;
    const endDate = leave.endDate;

    // Make API call to update leave status
    this.lmsService.updateLeaveStatus(userId, startDate, endDate, status).subscribe(
      () => {
        // Update the leave status in the local array
        leave.status = status;
        console.log(`Leave ${status}:`, leave);
      },
      (error: any) => {
        console.error(`Error updating leave status:`, error);
      }
    );
  }
}
