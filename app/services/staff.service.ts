import { IStaff } from "shared/types/staff.interface";
import { api } from "~/lib/api";

export const getStaffs = async () => {
   const res = await api.get("/staff/list");
   return res.data.data;
}

export const getStaffById = async (staff_id: string) => {
   const res = await api.get(`/staff/${staff_id}`);
   return res.data.data;
}

export const createStaff = async (data: FormData) => {
   const res = await api.post("/staff/create", data);
   return res.data;
}

export const updateStaff = async (
   staff_id: string,
   data: Partial<IStaff>
) => {
   const res = await api.put(`/staff/${staff_id}`, data);
   return res.data;
} 

export const deleteStaffById = async(staff_id: string) =>{
   const res = await api.delete(`/staff/${staff_id}`);
   return res.data
}