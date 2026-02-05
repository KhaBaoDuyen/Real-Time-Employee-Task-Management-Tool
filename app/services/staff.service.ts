import { api } from "~/lib/api";

export const getStaffs = async () => {
   const res = await api.get("/staff/list");
   return res.data.data ;
}