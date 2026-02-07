 import { IStaff } from "shared/types/staff.interface";
import { api } from "~/lib/api";

export const getStaffs = async () => {
   const res = await api.get("/staff/list");
   return res.data;
}

export const getStaffByStatus = async () => {
   const res = await api.get("/staff/status");
   return res.data.data;
}

export const createStaff = async (data: FormData) => {
   const res = await api.post("/staff/create", data);
   return res.data;
}

