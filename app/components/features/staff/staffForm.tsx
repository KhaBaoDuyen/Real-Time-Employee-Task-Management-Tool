import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../form/Input";
import { ImageUpload } from "../form/ImageUpload";
import { FilterSelect } from "../form/SelectOption";
import { DATA_ROLE } from "./staff.data";
import Switch from "../form/switch.badge";
import { useState } from "react";
import { Button } from "~/components/UI/Button/button";

export default function StaffForm() {
    const methods = useForm();
    const [status, setStatus] = useState(true);

    const handleSubmitForm = async (data:any) => {
        console.log(data)
    }

    return (
        <FormProvider {...methods}>
            <form action="" className="" onSubmit={methods.handleSubmit(handleSubmitForm)}>
                <ImageUpload
                    name="images"
                    label="Ảnh nhân viên"
                    maxFiles={1} />
                <div className="grid grid-cols-2 gap-5">
                    <Input
                        id="name"
                        label="Tên nhân viên"
                        {...methods.register("name", { required: "Không được bỏ trống" })}
                        error={methods.formState.errors.name} />
                    <Input
                        id="phone"
                        label="Số điện thoại"
                        {...methods.register("phone", { required: "Không được bỏ trống" })}
                        error={methods.formState.errors.phone} />
                    <Switch
                        label="Trạng thái"
                        value={status}
                        onChange={setStatus}
                        options={[
                            { label: "Hiển thị", value: true },
                            { label: "Ẩn", value: false }
                        ]}
                    />
                    <Input
                        id="password"
                        label="Mật khẩu"
                        {...methods.register("password", { required: "Không được bỏ trống" })}
                        error={methods.formState.errors.phone} />
                    <span className="col-span-2">
                        <Button>Thêm nhân viên</Button>
                    </span>
                </div>
            </form>
        </FormProvider>

    );
}