import { Component, OnInit } from '@angular/core';
import { LMSService } from '../lms.service';
import { LeaveApplication } from '../model';

@Component({
  selector: 'app-leave-status',
  templateUrl: './leave-status.component.html',
  styleUrls: ['./leave-status.component.css']
})
export class LeaveStatusComponent implements OnInit {
  leaveStatusData: any[] | undefined;
  leaveApplication: LeaveApplication = {} as LeaveApplication;
  employeeInputType: string = 'dropdown';
  managerNames: string[] = [];
  isPopupOpen = false;

  constructor(private lmsService: LMSService) {}

  ngOnInit() {
    // Call the getLeaveStatusByuserId() method when the component is initialized
    this.getLeaveStatusByuserId();
    this.getManagerNames();
  }

  getLeaveStatusByuserId() {
    const userId = localStorage.getItem('id');

    if (userId) {
      this.lmsService.getLeaveStatusByUserId(userId).subscribe(
        (data: any[] | undefined) => {
          console.log('Leave Status Data:', data); // Log the received data
          this.leaveStatusData = data;
        },
        (error: any) => {
          console.error('Error fetching leave status:', error);
        }
      );
    }
  }

  editLeave(leave: any) {debugger;
    // Open the leave application popup with the leave details
    this.leaveApplication = { ...leave };
    this.isPopupOpen = true;
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

  submitUpdatedLeaveApplication() {
    debugger;
     this.leaveApplication.userId=this.leaveApplication.userId;
     this.leaveApplication.id=this.leaveApplication.id;
     console.log(this.leaveApplication.id)
    // Convert dates to strings before sending them to the server
    this.lmsService.updateLeaveApplication(this.leaveApplication).subscribe(
      (response) => {
        console.log(this.leaveApplication);
        
        this.isPopupOpen = false;
        location.reload();
      },
      (error) => {
        console.error('Error updating leave:', error);
        // You might want to show an error message to the user
      }
    );
  }

  resetLeaveApplication() {
    // Reset the form
    this.leaveApplication = {} as LeaveApplication;
  }

  closeLeaveApplicationPopup() {
    this.isPopupOpen = false;
  }

    deleteLeave(leave: any) {
      debugger;
      const confirmDelete = confirm('Are you sure you want to delete this leave entry?');
    
      if (confirmDelete) {
        // Assuming you have an 'id' property in your leave object
        const leaveId = leave.id;
    
        // Check if leaveId is defined and is a number
        if (leaveId !== undefined && typeof leaveId === 'number') {
          // Check if leaveStatusData is not undefined
          if (this.leaveStatusData !== undefined) {
            // Filter the array to exclude the deleted item
            this.leaveStatusData = this.leaveStatusData.filter(item => item.id !== leaveId);
          }
    
          // Call the deleteLeave method in your LMSService
          this.lmsService.deleteLeave(leaveId).subscribe(
            (response) => {
              console.log('Leave deleted successfully:', response);
            },
            (error) => {
              console.error('Error deleting leave:', error);
              // You might want to show an error message to the user
            }
          );
        } else {
          console.error('Invalid leaveId:', leaveId);
          // Handle the case where leaveId is not valid (e.g., show an error message)
        }
      }
    }
    
  
  
}
