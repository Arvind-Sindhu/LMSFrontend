export interface LeaveApplication {
  EmployeeName?:string;
  managerName?: string;
  StartDate?: Date ;
  EndDate?: Date ;
  leaveType?: string;
  reason?: string;
  userId: number; 
}
