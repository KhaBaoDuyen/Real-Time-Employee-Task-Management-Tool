import {
    createStaff,
    getStaffs,
    getStaffsWhereStatus,
} from "../controllers/staff.controller";
import { upload } from "../middlewares/upload";
import { Router } from "express";

const routes = Router();

routes.get("/list", getStaffs);
routes.get("/status", getStaffsWhereStatus);
routes.post("/create", upload.single("image"), createStaff);


export default routes;