import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LeaveApplication } from './model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LMSService {
  constructor(private http: HttpClient) { }
  submitLeaveApplication(leaveApplicationData: LeaveApplication) {
    // Assuming you have an API endpoint for leave application submission
    

    // Send a POST request to the API with the leave application data
    return this.http.post(`https://localhost:7031/api/ApplyLeave/CreateApplyLeave`
    , leaveApplicationData);
  }

  getLeaveStatusByEmployeeId(employeeId: number): Observable<any> {
    const url = `https://localhost:7031/api/ApplyLeave/GetEmployeeById?Id=${employeeId}`;

    return this.http.get<any>(url);
  }
 
 }
