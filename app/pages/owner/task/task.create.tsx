import { FormProvider, useForm } from "react-hook-form";
import type { CreateProp } from "./type/create.type";
import { X } from 'lucide-react';
import { toast } from "react-toastify";

import TaskForm from "~/components/features/task/task.form";
import { createTask } from "~/services/task.service";
import { ITask } from "shared/interface/task.interface";
import { useEffect, useState } from "react";
import { getStaffs } from "~/services/staff.service";

export default function TaskCreatePage({
    onClose,
    onSuccess
}: CreateProp) {
    const methods = useForm<ITask>();
    const [staffByStatus, setStaffByStatus] = useState<any[]>([]);


    const handleCreate = async (data: any) => {
        const id = toast.loading("Đang xử lý...");
        try {
            const res = await createTask(data);

            onSuccess?.();
            toast.update(id, {
                render: res.message,
                type: "success",
                isLoading: false,
                autoClose: 2000
            })
            onClose();
        } catch (err: any) {
            toast.update(id, {
                render: err.response?.data?.message || "Đã xảy ra lỗi",
                type: "error",
                isLoading: false,
            })
        }
    }

    // fetch  
    const fetchStaff = async () => {
        try {
            const res = await getStaffs();
            setStaffByStatus(res);
            return;
        } catch (err) {
            return console.log("Error fetch staff where status => ", err);
        }
    }


    useEffect(() => {
        fetchStaff();
    }, []);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 shadow-xl w-6/12">
                <span className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold mb-4 text-primary">Thêm công việc</h2>
                    <span className="flex w-7 h-7 items-center justify-center text-white bg-danger rounded-md cursor-pointer">
                        <X onClick={onClose} />
                    </span>
                </span>
                <FormProvider {...methods}>
                    <TaskForm
                        onSubmit={handleCreate}
                        staffList={staffByStatus}
                        mode="create" />
                </FormProvider>

            </div>
        </div>
    );
}
