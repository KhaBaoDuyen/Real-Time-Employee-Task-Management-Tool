import { api } from "~/lib/api";
import { ITask } from "../../shared/types/task.interface";

export const getTask = async () => {
    const res = await api.get("/task/list");
    return res.data.data;
}
export const getTaskById = async (taskId: string) => {
  const res = await api.get(`/task/${taskId}`);
  return res.data.data;
};

export const createTask = async (data: ITask) => {
    const res = await api.post("/task/create", data);
    return res.data;
}

export const updateTask = async (
  taskId: string,
  data: Partial<ITask>
) => {
  const res = await api.put(`/task/${taskId}`, data);
  return res.data;
};

export const deleteTaskById = async( taskId: string) =>{
   const res = await api.delete(`/task/${taskId}/delete`);
   return res.data;
}
