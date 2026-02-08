import { useFormContext } from "react-hook-form";
import { OtpInput } from "~/components/features/form/Otpinput";
import { Button } from "~/components/UI/Button/button";
import { VerifyProp } from "~/pages/auth/verify/verify.form.type";

type Props = {
    mode: "staff" | "owner";
    onSubmit: (code: string) => void;
};

export default function VerificationForm({
    mode,
    onSubmit }: Props) {
    const {
        register,
        handleSubmit,
        formState } = useFormContext<VerifyProp>();

    const isStaff = mode === "staff";

    const handleVerify = (data: VerifyProp) => {
        const code = data.code.join("");
        console.log("SUBMIT DATA:", data);
        onSubmit(code);
    }

    return (
        <form
            onSubmit={handleSubmit(handleVerify)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="verity border border-white/20 bg-white/10 backdrop-blur-xl 
            border-l-0 transition-all duration-300 shadow-2xl rounded-2xl p-10 flex flex-col gap-5">
                <h2 className="text-white font-bold text-2xl text-center">Xác thực OTP</h2>

                <p className="text-sm text-gray-600">
                    {isStaff
                        ? "Chúng tôi đã gửi mã xác thực đến email nhân viên của bạn"
                        : "Chúng tôi đã gửi mã xác thực đến số điện thoại quản trị viên"}
                </p>

                <div className="inputs text-white flex justify-center gap-3">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                        <OtpInput
                            key={i}
                            index={i}
                            register={register}
                            error={formState.errors.code?.[i]}
                        />
                    ))}
                </div>

                <Button>
                    Xác nhận
                </Button>
            </div>
        </form>
    );
}
