import express from "express";
import staffRoute from "./routes/staff.route";

const app = express();

app.use(express.json());

app.use("/api/staff", staffRoute);

export default app;
