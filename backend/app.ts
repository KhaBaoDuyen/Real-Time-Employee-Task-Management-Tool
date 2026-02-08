import express from "express";
import staffRoute from "./routes/staff.route";
import taskRoute from "./routes/task.route";
import loginRoute from "./routes/login.route";

const app = express();

app.use(express.json());

app.use("/api/staff", staffRoute);
app.use("/api/task", taskRoute);
app.use("/api", loginRoute);

export default app;
