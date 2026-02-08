import { api } from "~/lib/api";
import { ITask } from "../../shared/types/task.interface";

export const getTask = async () => {
    const res = await api.get("/task/list");
    return res.data.data;
}
export const getTaskById = async (task_id: string) => {
  const res = await api.get(`/task/${task_id}`);
  return res.data.data;
};

export const createTask = async (data: ITask) => {
    const res = await api.post("/task/create", data);
    return res.data;
}

export const updateTask = async (
  task_id: string,
  data: Partial<ITask>
) => {
  const res = await api.put(`/task/${task_id}`, data);
  return res.data;
};

export const deleteTaskById = async( task_id: string) =>{
   const res = await api.delete(`/task/${task_id}/delete`);
   return res.data;
}
