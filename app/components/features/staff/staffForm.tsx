import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { Input } from "../form/Input";
import { ImageUpload } from "../form/ImageUpload";
import { FilterSelect } from "../form/FilterSelect";
import { DATA_ROLE } from "./staff.data";
import Switch from "../form/switch.badge";
import { useState } from "react";
import { Button } from "~/components/UI/Button/button";
import { CreateProp } from "~/types/createForm.type";
import { IStaff } from "shared/interface/staff.interface";

export default function StaffForm({ onSubmit, mode }: CreateProp) {
    const methods = useFormContext<IStaff>();

    return (
        <form action="" className="" onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
                <Input
                    id="name"
                    label="Tên nhân viên"
                    placeholder="Kha Thị Bảo Duyên"
                    {...methods.register("name", { required: "Không được bỏ trống" })}
                    error={methods.formState.errors.name} />

                <Input
                    id="email"
                    label="Địa chỉ email"
                    placeholder="example@gmail.com"
                    {...methods.register("email", {
                        required: "Không được bỏ trống",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Email không hợp lệ"
                        }
                    })}
                    error={methods.formState.errors.email} />

                <Input
                    id="phone"
                    label="Số điện thoại"
                    placeholder="0337019197"
                    {...methods.register("phone", {
                        required: "Không được bỏ trống",
                        pattern: {
                            value: /^[0-9]{9,11}$/,
                            message: "Số điện thoại không hợp lệ"
                        }
                    })}
                    error={methods.formState.errors.phone} />

                <span className="col-span-2">
                    <Button>{mode === "edit" ? "Cập nhật nhân viên" : "Thêm nhân viên"}</Button>
                </span>
            </div>
        </form>
    );
}