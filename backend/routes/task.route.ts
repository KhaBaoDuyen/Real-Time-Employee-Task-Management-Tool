import { Router } from "express";
import { createTask, deleteTaskId, getTask, getTaskById } from "../controllers/task.controller";
import { updateTask } from "../controllers/task.controller";

const routes = Router();

routes.get("/list", getTask);
routes.get("/:taskId", getTaskById);
routes.post("/create", createTask);
routes.put("/:taskId", updateTask);
routes.delete("/:taskId/delete" , deleteTaskId);

export default routes;