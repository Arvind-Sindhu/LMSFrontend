// leave-status.component.ts

import { Component, OnInit } from '@angular/core';
import { LMSService } from '../lms.service';

@Component({
  selector: 'app-leave-status',
  templateUrl: './leave-status.component.html',
  styleUrls: ['./leave-status.component.css']
})
export class LeaveStatusComponent implements OnInit {
  leaveStatusData: any[] | undefined;

  constructor(private lmsService: LMSService) {}

  ngOnInit() {
    // Call the getLeaveStatusByuserId() method when the component is initialized
    this.getLeaveStatusByuserId();
  }

  getLeaveStatusByuserId() {
    debugger;
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

  editLeave(leave: any) {
    // Implement edit functionality here
  }

  deleteLeave(leave: any) {
    // Implement delete functionality here
  }
}
