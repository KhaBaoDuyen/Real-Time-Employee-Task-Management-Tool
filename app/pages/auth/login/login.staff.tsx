import { FormProvider, useForm } from "react-hook-form";
import { IStaff } from "shared/interface/staff.interface";

//COMPONENT
import LoginForm from "~/components/auth/login/login.form";

export default function LoginStaffPage() {
    const methods = useForm<IStaff>();
    return (
        <>
            <FormProvider {...methods}>
                <LoginForm
                    mode="staff" />
            </FormProvider>

        </>
    )
}