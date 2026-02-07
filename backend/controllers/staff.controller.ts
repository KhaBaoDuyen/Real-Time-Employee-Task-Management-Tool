import { upload } from './../middlewares/upload';
import { taskColection } from './../models/task.model';
import { staffColection } from "../models/staff.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { uploadImage } from "../services/cloudinary.service";

export const getStaffs = async (_req: Request, res: Response) => {
    try {
        const data = await staffColection
            .orderBy("createAt", "desc")
            .get();

        const taskCountMap: Record<string, number> = {};

        const tasks = await taskColection.get();

        tasks.forEach(doc => {
            const staffId = doc.data().staff_id;
            taskCountMap[staffId] = (taskCountMap[staffId] || 0) + 1;
        });

        const staffs = data.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            totalTasks: taskCountMap[doc.id] || 0
        }));

        return res.status(200).json({
            success: true,
            data: staffs,
        })
    } catch (err: any) {
        console.log(" Error get staff =>", err);
        return res.status(500).json({
            success: false,
            message: "Error get staffs controler",
        })
    }
}

export const getStaffsWhereStatus = async (_req: Request, res: Response) => {
    try {
        const data = await staffColection
            .where("status", "==", "true")
            .get();

        const staffs = data.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return res.status(200).json({
            success: true,
            data: staffs,
        })
    } catch (err: any) {
        console.log(" Error get staff where status =>", err);
        return res.status(500).json({
            success: false,
            message: "Error get staffs controler where status",
        })
    }
}

export const createStaff = async (req: Request, res: Response) => {
    try {
        const { name, email, password, status } = req.body;

        // console.log("Body:", req.body);
        // console.log("File:", req.file);
        if (!name || !email || !password) {
            return res.status(400).json(
                {
                    success: false,
                    message: " Thiếu thông tin"
                }
            )
        }

        const checkEmail = await staffColection
            .where("email", "==", email)
            .limit(1)
            .get();

        if (!checkEmail.empty) {
            return res.status(400).json({
                success: false,
                message: "Email đã tồn tại"
            })
        }

        let image = "";
        if (req.file) {
            image = await uploadImage(req.file.buffer, "staffs");
        }

        const hassPassword = await bcrypt.hash(password, 10);

        const dataForm = await staffColection.add({
            name,
            email,
            password: hassPassword,
            status,
            image: image,
            createAt: new Date(),
        });

        console.log("dataFORM =>", dataForm);

        return res.status(200).json({
            success: true,
            message: " Thêm nhân viên thành công",
            data: {
                id: dataForm.id,
                image: image,
            }
        })
    } catch (err: any) {
        console.log("Error create staff =>", err);

        return res.status(500).json({
            success: false,
            message: "Thêm nhân viên thất bại",
            error: err.message,
        })
    }
}

