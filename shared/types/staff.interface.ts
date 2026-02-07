export interface IStaff {
    id?:string,
    name: string,
    email: string,
    password: string,
    image: string,
    status: boolean,
    role: string,
}

export interface IStaffWithTasks extends IStaff {
  totalTasks: number;
}
