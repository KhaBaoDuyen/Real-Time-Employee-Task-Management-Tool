import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { Input } from "../form/Input";
import { ImageUpload } from "../form/ImageUpload";
import { FilterSelect } from "../form/FilterSelect";
import { DATA_ROLE } from "./staff.data";
import Switch from "../form/switch.badge";
import { useState } from "react";
import { Button } from "~/components/UI/Button/button";
import { CreateProp } from "~/types/createForm.type";
import { IStaff } from "shared/types/staff.interface";

export default function StaffForm({ onSubmit, mode }: CreateProp) {
    const methods = useFormContext<IStaff>();

     return (
        <form action="" className="" onSubmit={methods.handleSubmit(onSubmit)}>
            <ImageUpload name="image" label="Ảnh nhân viên" />

            <div className="grid grid-cols-2 gap-5">
                <Input
                    id="name"
                    label="Tên nhân viên"
                    {...methods.register("name", { required: "Không được bỏ trống" })}
                    error={methods.formState.errors.name} />
                <Input
                    id="email"
                    label="Địa chỉ email"
                    {...methods.register("email", { required: "Không được bỏ trống" })}
                    error={methods.formState.errors.email} />
                <Controller
                    name="status"
                    control={methods.control}
                    defaultValue={1}
                    render={({ field }) => (
                        <Switch
                            label="Trạng thái"
                            value={field.value}
                            onChange={field.onChange}
                            options={[
                                { label: "Hoạt động", value: 1 },
                                { label: "Khóa", value: 0 }
                            ]}
                        />
                    )}
                />
                <Input
                    id="password"
                    label="Mật khẩu"
                    {...methods.register("password", { required: "Không được bỏ trống" })}
                    error={methods.formState.errors.password} />
                <span className="col-span-2">
                    <Button>{mode === "edit" ? "Cập nhật nhân viên" : "Thêm nhân viên"}</Button>
                </span>
            </div>
        </form>
    );
}