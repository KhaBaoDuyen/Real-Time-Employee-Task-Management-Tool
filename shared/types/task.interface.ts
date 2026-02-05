export interface ITask{
    title: string;
    description: string;
    prioriry: number;
    staff_id?: string;
    due_date: Date;
}