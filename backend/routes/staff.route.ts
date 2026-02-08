import {
    createStaff,
    deleteStaff,
    getStaffId,
    getStaffs,
    updateStaff,
} from "../controllers/staff.controller";
import { upload } from "../middlewares/upload";
import { Router } from "express";

const routes = Router();

routes.get("/list", getStaffs);
routes.get("/:staff_id", getStaffId);
routes.post("/create" , createStaff);
routes.put("/:staff_id" , updateStaff);
routes.delete("/:staff_id", deleteStaff);


export default routes;