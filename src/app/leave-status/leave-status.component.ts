import { Component, OnInit } from '@angular/core';
import { LMSService } from '../lms.service';
import { LeaveApplication } from '../model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private lmsService: LMSService, private router: Router,private toastr: ToastrService) { }

  ngOnInit() {

    this.getLeaveStatusByuserId();
    this.getManagerNames();
  }

  getLeaveStatusByuserId() {
    const userId = localStorage.getItem('id');

    if (userId) {
      this.lmsService.getLeaveStatusByUserId(userId).subscribe(
        (data: any[] | undefined) => {
          console.log('Leave Status Data:', data);
          this.leaveStatusData = data;
        },
        (error: any) => {
          console.error('Error fetching leave status:', error);
        }
      );
    }
  }

  editLeave(leave: any) {
    debugger;

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
    this.leaveApplication.userId = this.leaveApplication.userId;
    this.leaveApplication.id = this.leaveApplication.id;
    console.log(this.leaveApplication.id)

    this.lmsService.updateLeaveApplication(this.leaveApplication).subscribe(
      (response) => {
        console.log(this.leaveApplication);

        this.isPopupOpen = false;
        
      },
     );
     location.reload();
    
  }

  resetLeaveApplication() {

    this.leaveApplication = {} as LeaveApplication;
  }

  closeLeaveApplicationPopup() {
    this.isPopupOpen = false;
  }

  deleteLeave(leave: any) {
    debugger;
    const confirmDelete = confirm('Are you sure you want to delete this leave entry?');

    if (confirmDelete) {

      const leaveId = leave.id;


      this.lmsService.deleteLeave(leaveId).subscribe(
        (response) => {
          console.log('Leave deleted successfully:', response);
        },
        
       
      );
      
      location.reload();
     
    }
  }
  
  logout() {
    this.toastr.success('Logout Sucessfully');
    this.router.navigate(['/login']);
    history.replaceState('', '', '/login');
  }

}




