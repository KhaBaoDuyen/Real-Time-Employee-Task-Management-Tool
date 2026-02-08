import { Input } from "~/components/features/form/Input";
import { LoginProp } from "./login.type";
import { Button } from "~/components/UI/Button/button";
import { useFormContext } from "react-hook-form";
import { IStaff } from "shared/interface/staff.interface";

export default function LoginForm({
    mode,
    onSubmit,
}: LoginProp) {

    const methods = useFormContext<IStaff>();
    return (
        <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        >
            <div
                className="
                    w-[380px]
                    bg-white/10
                    backdrop-blur-xl
                    border border-white/20
                    shadow-2xl
                    rounded-2xl
                    p-8
                    text-white
                    transition-all duration-300">
                <h2 className="text-2xl font-bold text-center mb-2">
                    Đăng nhập
                </h2>

                <p className="text-sm text-white/70 text-center mb-6 leading-relaxed">
                    Đăng nhập
                    {mode === "staff"
                        ? " bằng địa chỉ email nhân viên"
                        : " bằng số điện thoại quản lý"}{" "}
                    để tiếp tục làm việc và quản lý hệ thống của bạn.
                </p>

                <div className="space-y-5">
                    {mode === "staff" ? (
                        <Input
                            id="email"
                            placeholder="example@gmail.com"
                            {...methods.register("email", {
                                required: "Không được bỏ trống",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Email không hợp lệ",
                                },
                            })}
                            error={methods.formState.errors.email}
                        />
                    ) : (
                        <Input
                            id="phone"
                            placeholder="0337019197"
                            {...methods.register("phone", {
                                required: "Không được bỏ trống",
                                pattern: {
                                    value: /^[0-9]{9,11}$/,
                                    message: "Số điện thoại không hợp lệ",
                                },
                            })}
                            error={methods.formState.errors.phone}
                        />
                    )}

                    <Button
                        type="submit"
                        className="
          w-full
          bg-primary
          hover:opacity-90
          text-white
          font-semibold
          rounded-xl
          py-3
          transition
        "
                    >
                        Tiếp tục
                    </Button>
                </div>
            </div>
        </form>

    )
}