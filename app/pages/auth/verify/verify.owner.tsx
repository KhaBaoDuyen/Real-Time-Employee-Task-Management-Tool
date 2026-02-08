import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";

//COMPONENT
import VerificationForm from "~/components/auth/verification/verification.form";
import { VerifyProp } from "./verify.form.type";
import { toast } from "react-toastify";
import { verifyOTP } from "~/services/login.service";

export default function VerifyOTPOwnerPage() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const methods = useForm<VerifyProp>({
        defaultValues: {
            code: ["", "", "", "", "", ""],
        }
    })


    const handleVerify = async (code: string) => {
        const id = toast.loading("Đang xử lý");
        try {
            const data = {
                ...state,
                code,
            }

            const res = await verifyOTP(data);

            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);

            toast.update(id, {
                render: res.message,
                type: "success",
                isLoading: false,
                autoClose: 1500,
            })

            if (state?.role === "owner") {
                navigate("/owner/staff/list");
            } else {
                console.log("NHAN VIEN");
            }

        } catch (err: any) {
            toast.update(id, {
                render: err.response?.data?.message || "Đã xảu ra lỗi trong quá trình xử lý",
                type: "error",
                isLoading: false,
                autoClose: 2000,
            })
        }
    }
    return (
        <>
            <FormProvider {...methods}>
                <VerificationForm
                    mode="owner"
                    onSubmit={handleVerify} />
            </FormProvider>

        </>
    )
}