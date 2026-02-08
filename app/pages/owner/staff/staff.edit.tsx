import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IStaff } from "shared/types/staff.interface";
import StaffForm from "~/components/features/staff/staffForm";
import Loading from "~/components/UI/Loading/loading";
import { EditProp } from "./type/edit.type";
import { X } from "lucide-react";
import { l } from "node_modules/@react-router/dev/dist/routes-CZR-bKRt";
import { getStaffById, updateStaff } from "~/services/staff.service";
import { toast } from "react-toastify";

export default function StaffEditPage({
    staff_id,
    onSuccess,
    onClose,
}: EditProp) {
    const methods = useForm<IStaff>();
    const [loading, setLoading] = useState(false);

    const fetchDetail = async () => {
        setLoading(true);
        try {
            const data = await getStaffById(staff_id);
            methods.reset(data);
        } catch (err: any) {
            console.log("Err fetch Detail =>", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDetail();
    }, [staff_id]);


    const handleUpdate = async (formData: IStaff) => {
        const id = toast.loading("Đang xử lý");
        try {
            const res = await updateStaff(staff_id, formData);
            onSuccess?.();
            onClose();

            return toast.update(id, {
                render: res.message,
                type: "success",
                isLoading: false,
                autoClose: 2000,
            })
        } catch(err:any) {
            return toast.update(id, {
                render: err.response?.data?.message || "Đã xảy ra lỗi",
                type: "error",
                isLoading: false,
                autoClose: 2000,
            })
        }

    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 shadow-xl w-6/12">
                <span className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold mb-4 text-primary">Chỉnh sửa nhân viên</h2>
                    <span className="flex w-7 h-7 items-center justify-center text-white bg-danger rounded-md cursor-pointer">
                        <X onClick={onClose} />
                    </span>
                </span>

                <FormProvider {...methods}>
                    {loading ? (<Loading />) : (
                        <StaffForm
                            onSubmit={handleUpdate}
                            mode="edit" />
                    )}
                </FormProvider>
            </div>
        </div>
    )
}