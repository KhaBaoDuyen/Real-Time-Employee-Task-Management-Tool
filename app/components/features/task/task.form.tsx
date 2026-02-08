import { Controller, FormProvider, useFormContext } from "react-hook-form";
import { Input } from "../form/Input";
import Switch from "../form/switch.badge";
import { Button } from "~/components/UI/Button/button";
import { RichTextEditor } from "../form/RichTextEditor";
import { ITask } from "shared/types/task.interface";
import type { CreateProp } from "~/types/createForm.type";
import { FilterSelect } from "../form/FilterSelect";

export default function TaskForm({
    onSubmit,
    mode,
    staffList
}: CreateProp &
    { staffList: any[] }) {
    const methods = useFormContext<ITask>();
    const today = new Date().toISOString().split("T")[0];

    return (
        <form action="" className="flex flex-col gap-3" onSubmit={methods.handleSubmit(onSubmit)}>
            <Input
                id="title"
                label="Tên công việc"
                {...methods.register("title", { required: "Không được bỏ trống" })}
                error={methods.formState.errors.title} />
            <span className="flex justify-between items-center">
                <p className="text-gray-500 text-sm">Người phụ trách hiện tại:</p>
                <Controller
                    name="staff_id"
                    control={methods.control}
                    render={({ field }) => (
                        <FilterSelect
                            value={field.value || ""}
                            onChange={field.onChange}
                            options={[
                                { id: "", name: "Chưa phân công" },
                                ...staffList
                            ]}
                        />
                    )}
                />

            </span>

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
                <Controller
                    name="priority"
                    control={methods.control}
                    defaultValue={2}
                    render={({ field }) => (
                        <Switch
                            label="Mức độ ưu tiên"
                            value={field.value}
                            onChange={field.onChange}
                            options={[
                                { label: "Ưu tiên", value: 1 },
                                { label: "Bình thường", value: 2 }
                            ]}
                        />
                    )}
                />
            </span>

            <Input
                id="due_date"
                type="date"
                min={today}
                label="Ngày đáo hạn"
                {...methods.register("due_date", { required: "Chọn ngày đáo hạn" })}
                error={methods.formState.errors.due_date}
            />

            <Button>{mode === "edit" ? "Cập nhật công việc" : "Thêm công việc"}</Button>
        </form>
    )
}