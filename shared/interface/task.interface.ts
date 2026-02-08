export interface ITask{
    id?:string;
    title: string;
    description: string;
    priority: number;
    status: number;
    staff_id?: string;
    due_date: Date;
}