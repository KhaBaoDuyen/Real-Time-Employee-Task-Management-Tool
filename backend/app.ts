import express from "express";
import staffRoute from "./routes/staff.route";
import taskRoute from "./routes/task.route";

const app = express();

app.use(express.json());

app.use("/api/staff", staffRoute);
app.use("/api/task", taskRoute);

export default app;
