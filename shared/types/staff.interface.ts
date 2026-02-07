export interface IStaff {
    id?:string,
    name: string,
    email: string,
    password: string,
    image: string,
    status: number,
    role: string,
}

export interface IStaffWithTasks extends IStaff {
  totalTasks: number;
}
