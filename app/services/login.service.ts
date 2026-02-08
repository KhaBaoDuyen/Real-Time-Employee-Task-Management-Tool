import { api } from "~/lib/api";

export const sendOTP = async (data:
    {
        phone?: string;
        email?: string;

    }) => {
    const res = await api.post("/send-otp", data);
    return res.data;
}

export const verifyOTP = async (data: any) => {
    const res = await api.post("/verify-otp", data);
    return res.data;
};