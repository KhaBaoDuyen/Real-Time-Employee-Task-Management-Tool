import { createStaff, getStaff } from "../controllers/staff.controller";
import { upload } from "../middlewares/upload";
import { Router } from "express";

const routes = Router();

routes.get("/list", getStaff);
routes.post("/create" , upload.single("image"), createStaff);


export default routes;