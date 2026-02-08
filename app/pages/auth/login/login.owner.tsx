import { FormProvider, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { IStaff } from "shared/interface/staff.interface";

//COMPONENT
import LoginForm from "~/components/auth/login/login.form";
import { sendOTP } from "~/services/login.service";

export default function LoginOwnerPage() {
    const methods = useForm<IStaff>();
    const navigate = useNavigate();

    const handleSubmit = async (data: IStaff) => {
        const id = toast.loading("Đang gửi...");
        try {
            const res = await sendOTP(data);

            if (!res.success) {
                throw new Error(res.message);
            }

            toast.update(id, {
                render: res.message,
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });
            navigate("/verify-otp", {
                state: {
                    ...data,
                    role: "owner",
                },
            });


        } catch (err: any) {
            toast.update(id, {
                render: err.response?.data?.message || "Không gửi được",
                type: "error",
                isLoading: false,
                autoClose: 2000,
            });
        }
    }

    return (
        <>
            <FormProvider {...methods}>
                <LoginForm
                    mode="owner"
                    onSubmit={handleSubmit} />
            </FormProvider>

        </>
    )
}