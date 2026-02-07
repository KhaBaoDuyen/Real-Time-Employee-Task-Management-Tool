import StaffForm from "~/components/features/staff/staffForm";
import type { CreateProp } from "./type/create.type";
import { X } from 'lucide-react';
import { toast } from "react-toastify";
import { createStaff } from "~/services/staff.service";

export default function StaffCreatePage({
    onClose,
    onSuccess,
}: CreateProp) {

    const handleCreate = async (data: any) => {
        const id = toast.loading("Đang xử lý...");
        try {
            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("status", String(data.status));
            formData.append("image", data.image[0]);

            const res = await createStaff(formData);

            // console.log("form data FE req =>", formData);
            if (!res.success) {
                throw new Error(res.message);
            }
            
            toast.update(id, {
                render: res.message,
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });

            onSuccess();
            onClose();
        } catch (err: any) {
            console.log("Error create Staff page =>", err);
            toast.update(id, {
                render: err.response?.data?.message || "Đã xảu ra lỗi trong quá trình xử lý",
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
                    <h2 className="text-xl font-semibold mb-4 text-primary">Thêm nhân viên</h2>
                    <span className="flex w-7 h-7 items-center justify-center text-white bg-danger rounded-md cursor-pointer">
                        <X onClick={onClose} />
                    </span>
                </span>

                <StaffForm onSubmit={handleCreate} />
            </div>
        </div>
    );
}
