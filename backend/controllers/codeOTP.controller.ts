import { staffColection } from './../models/staff.model';
import { Request, Response } from "express";
import { codeColection } from '../models/code.model';
import { sendSMS } from '../services/twilio.service';
import { sendMailOTP } from '../services/mail.service';
import { createAccessToken, createRefreshToken } from '../utils/jwt.utils';

export const sendOTP = async (req: Request, res: Response) => {
    try {
        const { phone, email } = req.body;
        // console.log(" email || phone =>", email || phone);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        if (!phone && !email) {
            return res.status(400).json({
                success: false,
                message: "Thiếu thông tin"
            })
        }

        const key = phone ? "phone" : "email";
        const value = phone ?? email;

        const check = await staffColection
            .where(key, "==", value)
            .limit(1)
            .get();

        if (check.empty) {
            return res.status(404).json({
                success: false,
                message: "Chúng tôi không tìm thấy tài khoảng",
            })
        }

        const staffDoc = check.docs[0];
        const staffId = staffDoc.id;

        const spam = await codeColection
            .where("staff_id", "==", staffId)
            .limit(1)
            .get();

        if (!spam.empty) {
            const diff = Date.now() - spam.docs[0].data().created_at;

            if (diff < 30000) {
                return res.status(429).json({
                    success: false,
                    message: "Vui lòng chờ 30s"
                });
            }
        }

        await codeColection.add({
            staff_id: staffId,
            code: otp,
            expire_at: Date.now() + 5 * 60 * 1000,
        });

        if (phone) {
            try {
                const formatPhone = (phone: string) => {
                    return "+84" + phone.replace(/^0/, "");
                }
                // console.log("formatPhone=>", formatPhone(phone))
                await sendSMS(formatPhone(phone), otp);
            } catch (err: any) {
                console.log("opt send SMS =>", otp);
            }
        }

        if (email) {
            try {
                await sendMailOTP(email, otp);
            } catch (err: any) {

            }
        }


        return res.status(200).json({
            success: true,
            message: "Đã gửi otp"
        });

    } catch (err: any) {
        console.log("Error server send otp =>", err);
        return res.status(500).json({
            success: false,
            message: "Error send otp"
        })
    }

}

export const verifyOTP = async (req: Request, res: Response) => {
    try {
        const { phone, email, code } = req.body;

        if (!code || (!phone && !email)) {
            return res.status(400).json({
                success: false,
                message: "Thiếu dữ liệu",
            });
        }

        const key = phone ? "phone" : "email";
        const value = phone ?? email;

        const staff = await staffColection
            .where(key, "==", value)
            .limit(1)
            .get();

        if (staff.empty) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy tài khoản",
            });
        }

        const staffId = staff.docs[0].id;

        const otpDoc = await codeColection.doc(staffId).get();
        await otpDoc.ref.delete();

        const data = {
            id: staffId,
            phone: phone || "",
        };

        const accessToken = createAccessToken(data);
        const refreshToken = createRefreshToken(data);


        return res.json({
            success: true,
            accessToken,
            refreshToken,
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: "Xác thực thất bại",
        });
    }
};