export interface IStaff {
    id?:string,
    name: string,
    email: string,
    phone: string,
    status: number,
    role: string,
}

export interface IStaffWithTasks extends IStaff {
  totalTasks: number;
}
