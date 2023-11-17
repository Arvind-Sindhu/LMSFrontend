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
    return this.http.post(`https://localhost:7031/api/ApplyLeave/CreateApplyLeave`, leaveApplicationData);
  }
 
  getLeaveStatusByUserId(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7031/api/ApplyLeave/employee/${userId}`);
  }

  getManagerNames(): Observable<string[]> {
    return this.http.get<string[]>('https://localhost:7031/api/ApplyLeave/GetManagerNames');
  }

  getLeaveStatusByManagerName(managerName: string): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7031/api/ApplyLeave/GetLeaveStatusByManagerName/${managerName}`);
  }

  GetLeaveStatusForManagedUsers(managerName: string): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7031/api/ApplyLeave/GetLeaveStatusForManagedUsers/${managerName}`);
  }

  getManagerName(userId: number): Observable<string> {
    return this.http.get<string>(`https://localhost:7031/api/ApplyLeave/GetManagerName/${userId}`);
  }

  updateLeaveStatus(userId: number, startDate: string, endDate: string, status: string): Observable<any> {
    const url = `https://localhost:7031/api/ApplyLeave/UpdateLeaveStatus/${userId}/${startDate}/${endDate}/${status}`;
    // Send a PUT request to the API with an empty body
    return this.http.put(url, {});
  }
}
