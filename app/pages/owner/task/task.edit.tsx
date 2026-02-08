import { useParams } from "react-router";
import type { EditProp } from "./type/edit.type";
import { X } from 'lucide-react';
import { toast } from "react-toastify";

import TaskForm from "~/components/features/task/task.form";
import { getTaskById, updateTask } from "~/services/task.service";
import { FormProvider, useForm } from "react-hook-form";
import { ITask } from "shared/interface/task.interface";
import { useEffect, useState } from "react";
import Loading from "~/components/UI/Loading/loading";
import { getStaffs } from "~/services/staff.service";

export default function TaskEditPage({
    taskId,
    onSuccess,
    onClose
}: EditProp) {
    const methods = useForm<ITask>();
    const [loading, setLoading] = useState(false);
    const [staffByStatus, setStaffByStatus] = useState<any[]>([]);


    const fetchDetail = async () => {
        setLoading(true);
        try {
            const data = await getTaskById(String(taskId));
            methods.reset(data);
        } catch (err) {
            console.log("error fetchDetail Task", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDetail();
    }, [taskId]);

    const handleUpdate = async (formData: ITask) => {
        const id = toast.loading("Đang xử lý");
        try {
            const res = await updateTask(taskId, formData);
            onSuccess?.();
            onClose();

            return toast.update(id, {
                render: res.message,
                type: "success",
                isLoading: false,
                autoClose: 2000,
            })
        } catch (err: any) {
            return toast.update(id, {
                render: err.response?.data?.message || "Đã xảy ra lỗi",
                type: "error",
                isLoading: false,
                autoClose: 2000,
            })
        }
    };

    const fetchStaffByStatus = async () => {
        try {
            const res = await getStaffs();
            setStaffByStatus(res);
            return;
        } catch (err) {
            return console.log("Error fetch staff where status => ", err);
        }
    }


    useEffect(() => {
        fetchStaffByStatus();
    }, []);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 shadow-xl w-6/12">
                <span className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold mb-4 text-primary">Chỉnh sửa công việc</h2>
                    <span className="flex w-7 h-7 items-center justify-center text-white bg-danger rounded-md cursor-pointer">
                        <X onClick={onClose} />
                    </span>
                </span>

                <FormProvider {...methods}>
                    {loading ? (<Loading />) : (
                        <TaskForm
                            onSubmit={handleUpdate}
                            staffList={staffByStatus}
                            mode="edit" />
                    )}
                </FormProvider>
            </div>
        </div>
    );
}
