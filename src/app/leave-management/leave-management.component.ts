import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LMSService } from '../lms.service'; // Import LMSService for leave management operations
import { ToastrService } from 'ngx-toastr'; // Import ToastrService for displaying toast messages
import { createClient } from '@supabase/supabase-js'; // Import Supabase client for authentication

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.css']
})
export class LeaveManagementComponent implements OnInit {

  // Create a Supabase client instance
  supabase = createClient(
    'https://yhkctgnpvatkfksecxsr.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inloa2N0Z25wdmF0a2Zrc2VjeHNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzNDE3NjksImV4cCI6MjAxNDkxNzc2OX0.COQA5pDCc1hwy1EvmkYvKUuddbN8n0cblrpJCZX2VKg'
  );
  leaveManagementData: any[] | undefined; // Array to store leave management data

  constructor(private router: Router, private lmsService: LMSService, private toastr: ToastrService) { }

  ngOnInit() {
    // Fetch leave management data when the component is initialized
    this.getLeaveStatusForManaged();
  }

  getLeaveStatusForManaged() {
    // Retrieve the manager's name from localStorage
    const managerName = localStorage.getItem('username'); // Assuming the manager's name is the username

    if (managerName) {
      // Call the service to get leave status data for managed users
      this.lmsService.GetLeaveStatusForManagedUsers(managerName).subscribe(
        (data: any[]) => {
          this.leaveManagementData = data; // Assign the fetched data to leaveManagementData
          console.log('Leave Status Data:', this.leaveManagementData);
        }
      );
    }
  }

  goToLeaveManagement() {
    // Navigate to the leave management page
    this.router.navigate(['/leave-management']);
  }

  approveLeave(leave: any) {
    // Update leave status to 'Approved' and display success toast message
    this.updateLeaveStatus(leave, 'Approved');
    this.toastr.success('Leave Approved', 'Success');
  }

  rejectLeave(leave: any) {
    // Update leave status to 'Rejected' and display error toast message
    this.updateLeaveStatus(leave, 'Rejected');
    this.toastr.error('Leave Rejected', 'Rejected');
  }

  private updateLeaveStatus(leave: any, status: string) {
    // Extract relevant information from the leave object
    const userId = leave.userId;
    const startDate = leave.startDate;
    const endDate = leave.endDate;

    // Call the service to update the leave status
    this.lmsService.updateLeaveStatus(userId, startDate, endDate, status).subscribe(
      () => {
        leave.status = status; // Update the status property of the leave object
        console.log(`Leave ${status}:`, leave);
      },
      (error: any) => {
        console.error(`Error updating leave status:`, error);
      }
    );
  }

  logout() {
    // Sign out from Supabase, remove token from localStorage, and navigate to the login page
    this.supabase.auth.signOut().then(() => {
      localStorage.removeItem('Token');
      this.router.navigate(['/login']);
    });
  }
}
