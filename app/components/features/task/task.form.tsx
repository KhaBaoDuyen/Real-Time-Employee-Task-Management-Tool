import { Controller, FormProvider, useForm } from "react-hook-form";
import { Input } from "../form/Input";
import { ImageUpload } from "../form/ImageUpload";
import Switch from "../form/switch.badge";
import { useState } from "react";
import { Button } from "~/components/UI/Button/button";
import { RichTextEditor } from "../form/RichTextEditor";

export default function TaskForm() {
    const methods = useForm();
   const status = methods.watch("status", true);
    const priority = methods.watch("priority", "low");



    const handleSubmitForm = async (data: any) => {
        console.log(data)
    }

    return (
        <FormProvider {...methods}>
            <form action="" className="flex flex-col gap-3" onSubmit={methods.handleSubmit(handleSubmitForm)}>
                <Input
                    id="title"
                    label="Tên công việc"
                    {...methods.register("title", { required: "Không được bỏ trống" })}
                    error={methods.formState.errors.title} />
                <Controller
                    name="description"
                    control={methods.control}
                    rules={{ required: "Không được bỏ trống" }}
                    render={({ field, fieldState }) => (
                        <RichTextEditor
                            label="Mô tả công việc"
                            value={field.value}
                            onChange={field.onChange}
                            error={fieldState.error}
                        />
                    )}
                />
                <span className="grid-cols-2 grid">
                    <Switch
                        label="Mức độ ưu tiên"
                        value={priority}
                        onChange={(val) => methods.setValue("priority", val)}
                        options={[
                            { label: "Không ưu tiên", value: "low" },
                            { label: "Ưu tiên", value: "high" }
                        ]}
                    />
                    <Switch
                        label="Trạng thái"
                        value={status}
                        onChange={(val) => methods.setValue("status", val)}
                        options={[
                            { label: "Hiển thị", value: true },
                            { label: "Ẩn", value: false }
                        ]}
                    />
                </span>

                <Input
                    id="dueDate"
                    type="date"
                    label="Ngày đáo hạn"
                    {...methods.register("dueDate", { required: "Chọn ngày đáo hạn" })}
                    error={methods.formState.errors.dueDate}
                />

                <Button >Thêm công việc</Button>
            </form>
        </FormProvider>
    )
}