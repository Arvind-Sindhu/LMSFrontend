// leave-status.component.ts
import { Component, OnInit } from '@angular/core';
import { LMSService } from '../lms.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-leave-status',
  templateUrl: './leave-status.component.html',
  styleUrls: ['./leave-status.component.css']
})
export class LeaveStatusComponent implements OnInit {
  leaveStatusData: any[] | undefined;
  employeeId: number | undefined;

  constructor(private lmsService: LMSService, private httpClient: HttpClient) {}

  ngOnInit() {
    // Call the getLeaveStatusByEmployeeId() method only when there's an employeeId
    if (this.employeeId) {
      this.getLeaveStatusByEmployeeId();
    }
  }

  getLeaveStatusByEmployeeId() {
    if (this.employeeId) {
      this.lmsService.getLeaveStatusByEmployeeId(this.employeeId).subscribe((data) => {
        this.leaveStatusData = data;
      });
    }
  }

  editLeave(leave: any) {
    // Implement edit functionality here
  }

  deleteLeave(leave: any) {
    // Implement delete functionality here
  }
}
