import { upload } from './../middlewares/upload';
import { taskColection } from './../models/task.model';
import { staffColection } from "../models/staff.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

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

export const getStaffId = async (req: Request, res: Response) => {
    try {
        const staffId = String(req.params.staff_id);
        const getId = await staffColection.doc(staffId).get();

        if (!getId.exists) {
            return res.status(400).json({
                success: false,
                message: "Không tìm thấy nhân viên này",
            })
        }

        return res.status(200).json({
            success: true,
            data: {
                ...getId.data()
            }
        })
    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: "Error getId staff"
        })
    }
}

export const createStaff = async (req: Request, res: Response) => {
    try {
        const { name, email, phone } = req.body;

        // console.log("Body:", req.body);
        // console.log("File:", req.file);
        if (!name || !email || !phone) {
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

        const dataForm = await staffColection.add({
            name,
            email,
            role: "staff",
            phone,
            createAt: new Date(),
        });

        console.log("dataFORM =>", dataForm);

        return res.status(200).json({
            success: true,
            message: " Thêm nhân viên thành công",
            data: {
                id: dataForm.id,
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

export const updateStaff = async (req: Request, res: Response) => {
    try {
        const staff_id = String(req.params.staff_id);

        const data = {
            ...req.body,
            updateAt: new Date(),
        }

        if (!staff_id) {
            return res.status(400).json({
                success: false,
                message: "Không tìm thấy nhân viên",
            })
        }

        await staffColection.doc(staff_id).update(data);

        return res.status(200).json({
            success: true,
            message: "cập nhật nhân viên thành công"
        });
    } catch (err: any) {
        console.log("Error update staff =>", err);
        return res.status(500).json({
            success: false,
            message: "Error BE update staff",
        })
    }
}

export const deleteStaff = async (req: Request, res: Response) => {
    try {
        const staff_id = String(req.params.staff_id);

        const ref = await staffColection.doc(staff_id);
        const doc = await ref.get();

        if (!doc.exists) {
            return res.status(400).json({
                success: false,
                message: "Không tìm thấy nhân viên"
            })
        }

        await ref.delete();

        return res.status(200).json({
            success: true,
            message: "Xóa thành công"
        })
    } catch (err: any) {
        return res.status(500).json(
            {
                success: false,
                message: "Xóa thất bại",
            }
        )
    }
}