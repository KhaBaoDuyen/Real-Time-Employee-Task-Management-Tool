
import { Router } from "express";
import { sendOTP, verifyOTP } from "../controllers/codeOTP.controller";

const routes = Router();

routes.post("/send-otp", sendOTP);
routes.post("/verify-otp", verifyOTP);


export default routes;