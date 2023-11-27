import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LMSService } from '../lms.service'; // Import LMSService for leave management operations
import { LeaveApplication } from '../model'; // Import the LeaveApplication model
import { HttpClient } from '@angular/common/http';
import { MatSidenav } from '@angular/material/sidenav'; // Import MatSidenav for accessing sidenav functionality
import { ToastrService } from 'ngx-toastr'; // Import ToastrService for displaying toast messages
import { createClient } from '@supabase/supabase-js'; // Import Supabase client for authentication

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  // Create a Supabase client instance
  supabase = createClient(
    'https://yhkctgnpvatkfksecxsr.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inloa2N0Z25wdmF0a2Zrc2VjeHNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzNDE3NjksImV4cCI6MjAxNDkxNzc2OX0.COQA5pDCc1hwy1EvmkYvKUuddbN8n0cblrpJCZX2VKg'
  );

  @ViewChild('sidenav') // ViewChild decorator to get a reference to the sidenav
  sidenav!: MatSidenav;

  isPopupOpen = false; // Flag to track if the leave application popup is open
  managerNames: string[] = []; // Array to store manager names
  employeeInputType: string = 'dropdown'; // Default employee input type
  leaveApplication: LeaveApplication = {} as LeaveApplication; // Object to store leave application details
  username: string | undefined; // Variable to store the username

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private lmsService: LMSService, // Inject LMSService for leave management operations
    private toastr: ToastrService // Inject ToastrService for displaying toast messages
  ) {}

  ngOnInit() {
    // Retrieve the username from localStorage
    this.username = localStorage.getItem('username')!;

    // Fetch manager names when the component is initialized
    this.getManagerNames();
  }

  getManagerNames() {
    debugger;
    // Call the service to get manager names
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
    // Close the sidenav and set the popup flag to true
    this.sidenav.close();
    this.isPopupOpen = true;
  }

  closeLeaveApplicationPopup() {
    // Set the popup flag to false
    this.isPopupOpen = false;
  }

  submitLeaveApplication() {
    const userId = localStorage.getItem('id');

    if (userId !== null) {
      // Set the userId from localStorage to the leave application
      this.leaveApplication.userId = parseInt(userId, 10);

      // Call the service to submit the leave application
      this.lmsService.submitLeaveApplication(this.leaveApplication).subscribe(
        (response) => {
          console.log(this.leaveApplication);
        });
      
      // Display success toast message and close the popup
      this.toastr.success('Leave Submitted Successfully');
      this.closeLeaveApplicationPopup();
    }
  }

  resetLeaveApplication() {
    // Reset the leave application object
    this.leaveApplication = {} as LeaveApplication;
  }

  logout() {
    // Sign out from Supabase, remove token from localStorage, and navigate to the login page
    this.supabase.auth.signOut().then(() => {
      localStorage.removeItem('Token');
      this.router.navigate(['/login']);
    });
  }
}
