import { staffColection } from "../models/staff.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { uploadImage } from "../services/cloudinary.service";

const url = "https://storage.googleapis.com/";


export const getStaff = async (_req: Request, res: Response) => {
    try {
        const data = await staffColection.get();

        const staffs = data.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))

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

export const createStaff = async (req: Request, res: Response) => {
    try {
        const { name, phone, password, status } = req.body;

        if (!name || !phone || !password) {
            return res.status(400).json(
                {
                    success: false,
                    message: " Thiếu thông tin"
                }
            )
        }

        let imageUrl = "";
        if (req.file) {
            imageUrl = await uploadImage(req.file.buffer, "staffs");
        }

        const hassPassword = await bcrypt.hash(password, 10);

        const dataForm = await staffColection.add({
            name,
            phone,
            password: hassPassword,
            status,
            image: imageUrl,
            createAt: new Date(),
        });

        return res.status(200).json({
            success: true,
            message: " Thêm nhân viên thành công",
            data: {
                id: dataForm.id,
                image: imageUrl,
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