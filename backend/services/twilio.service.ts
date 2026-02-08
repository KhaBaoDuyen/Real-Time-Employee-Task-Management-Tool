import twilio from "twilio";

export const sendSMS = async (
    to: string,
    code: string,
) => {

    const client = twilio(
        process.env.TWILIO_SID!,
        process.env.TWILIO_TOKEN!,
    );

    return client.messages.create({
        body: `Mã OTP của bạn là: ${code}. Lưu ý mã sẽ hết hạn sau 5 phút`,
        from: process.env.TWILIO_PHONE!,
        to,
    })
}