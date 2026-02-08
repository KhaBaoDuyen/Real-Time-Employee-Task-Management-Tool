import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendMailOTP = async (to: string, code: string) => {
  await transporter.sendMail({
    from: `"OTP System" <${process.env.MAIL_USER}>`,
    to,
    subject: "Mã OTP đăng nhập",
    html: `
      <h2>Mã OTP của bạn:</h2>
      <h1 style="letter-spacing:4px">${code}</h1>
      <p>Hết hạn sau 5 phút</p>
    `,
  });
};
