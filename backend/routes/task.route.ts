import { Router } from "express";
import { createTask, deleteTaskId, getTask, getTaskById } from "../controllers/task.controller";
import { updateTask } from "../controllers/task.controller";

const routes = Router();

routes.get("/list", getTask);
routes.get("/:task_id", getTaskById);
routes.post("/create", createTask);
routes.put("/:task_id", updateTask);
routes.delete("/:task_id/delete" , deleteTaskId);

export default routes;