import { staffColection } from "../models/staff.model";
import { Request, Response } from "express";
import { taskColection } from "../models/task.model";
import { log } from "console";

export const getTask = async (_req: Request, res: Response) => {
    try {
        const data = await taskColection.get();

        const tasks = data.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))

        return res.status(200).json({
            success: true,
            data: tasks,
        })
    } catch (err) {
        console.log("Error get tasks =>", err);
        return res.status(500).json({
            success: false,
            message: "Error get task controller",
        })
    }
}

export const getTaskById = async (req: Request, res: Response) => {
    try {
        const task_id = String(req.params.task_id);

        const doc = await taskColection.doc(task_id).get();

        if (!doc.exists) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy task"
            })
        }

        return res.status(200).json({
            success: true,
            data: {
                id: doc.id,
                ...doc.data(),
            },
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error task to Id"
        })
    }
}

export const createTask = async (req: Request, res: Response) => {
    try {
        const {
            title,
            description,
            priority,
            staff_id,
            due_date,
        } = req.body;

        console.log("req body", req.body);
        if (!title ||
            !description ||
            !priority ||
            !due_date) {
            return res.status(400).json(
                {
                    success: false,
                    message: " Thiếu thông tin"
                }
            )
        }

        const dataForm = await taskColection.add({
            title,
            description,
            status: 1,
            priority,
            due_date,
            createAt: new Date(),
            ...(staff_id && { staff_id })
        });

        return res.status(200).json({
            success: true,
            message: " Thêm công việc thành công",
            data: {
                id: dataForm.id,
                data: dataForm,
            }
        })
    } catch (err: any) {
        console.log("Error create task =>", err);

        return res.status(500).json({
            success: false,
            message: "Thêm công việc thất bại",
            error: err.message,
        })
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const task_id = String(req.params.task_id);
        const data = {
            ...req.body,
            updatedAt: new Date(),
        }
        // console.log("task_id", task_id);
        // console.log("data", data);

        if (!task_id) {
            return res.status(400).json({
                success: false,
                message: "Không thấy task id",
            });
        }

        await taskColection.doc(task_id).update(data);

        return res.status(200).json({
            success: true,
            message: "Cập nhật thành công",
        });
    } catch (err) {
        console.log("Error update staff_id =>", err);
        return res.status(500).json({
            success: false,
            message: "Cập nhật thất bại",
        });
    }
}

export const deleteTaskId = async (req: Request, res: Response) => {
    try {
        const task_id = String(req.params.task_id);

        const ref = await taskColection.doc(task_id);
        const doc = await ref.get();

        if (!doc.exists) {
            return res.status(400).json({
                success: false,
                message: "Không tìm thấy task",
            });
        }

        const task = doc.data();

        if (task?.staff_id) {
            await ref.update({
                status: 0,
            });

            return res.status(200).json({
                success: true,
                message: "Task đã được hủy"
            })
        }

        await ref.delete();

        return res.status(200).json(
            {
                success: true,
                message: "Xóa thành công",
            }
        )
    } catch (err: any) {
        return res.status(500).json(
            {
                success: false,
                message: "Xóa thất bại",
            }
        )
    }
}