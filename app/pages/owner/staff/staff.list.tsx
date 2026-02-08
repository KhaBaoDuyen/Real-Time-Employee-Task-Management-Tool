import { EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

//COMPONENTS
import Loading from "~/components/UI/Loading/loading";
import { RowActions } from "~/components/UI/RowActions/RowActions";
import StaffCreatePage from "./staff.create";

//INTERFACE+ SREVICE
import { IStaff, IStaffWithTasks } from "../../../../shared/types/staff.interface";
import { deleteStaffById, getStaffs } from "~/services/staff.service";
import TaskEditPage from "../task/task.edit";
import StaffEditPage from "./staff.edit";
import { toast } from "react-toastify";
import { ConfirmDelete } from "~/components/UI/ConfirmDelete/confirmDelete";

export default function StaffListPage() {
    const [loading, setLoading] = useState(false);
    const [staffs, setStaffs] = useState<IStaffWithTasks[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isopenEdit, setIsOpenEdit] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const handleOpentCreate = async () => {
        setIsOpen((prev) => !prev);
    }

    const fetchStaff = async () => {
        setLoading(true);
        try {
            const res = await getStaffs();
            console.log(res);

            return setStaffs(res);
        } catch (err) {
            console.log("Error fetch staffs =>", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchStaff();
    }, []);


    // open form edit 
    const handleOpenEdit = (id: string) => {
        setEditId(id);
        setIsOpenEdit(true);
    }

    //delete
    const handleDelete = (staff_id: string) => {
        setDeleteId(staff_id);
    }

    const handleConfirmDelete = async () => {
        const id = toast.loading("Đang xử lý...");
        try {
            const res = await deleteStaffById(String(deleteId));
            setDeleteId(null);
            fetchStaff();

            toast.update(id, {
                render: res.message,
                type: "success",
                isLoading: false,
                autoClose: 2000,
            })
        } catch (err: any) {
            console.log("Error delete staff =>", err);
            return toast.update(id, {
                render: err.response?.data?.message || "Đã xảy ra lỗi",
                type: "error",
                isLoading: false,
                autoClose: 2000,
            })
        }
    }
    return (
        <>
            <div className="py-5 relative">
                <span className="flex justify-between">
                    <h1 className="text-2xl font-bold text-white">
                        Quản lí nhân viên
                    </h1>
                    <button onClick={handleOpentCreate}
                        className="p-2 bg-primary text-white rounded-md shadow-md">Thêm nhân viên</button>
                </span>

                <div className="mt-10 ">
                    <div className="">
                        <div className="">
                            <table className="w-full border-separate border-spacing-y-3">
                                <thead className="sticky top-0 z-10 text-white shadow">
                                    <tr className="text-center">
                                        <th className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 rounded-l-md">Id</th>
                                        <th className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300">Tên nhân viên</th>
                                        <th className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 ">Địa chỉ email</th>
                                        <th className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300">Số điện thoại</th>
                                        <th className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 ">Task</th>
                                        <th className="py-3 px-4 flex justify-center bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 rounded-r-md"><EllipsisVertical /></th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-8 text-white bg-white/10 border-l-0 transition-all duration-300 rounded-md">
                                            <Loading />
                                        </td>
                                    </tr>
                                ) : (
                                    <tbody>
                                        {staffs.length === 0 ? (
                                            <tr>
                                                <td colSpan={7} className="text-center py-8 text-white bg-white/10 border-l-0 transition-all duration-300 rounded-md">
                                                    Không có nhân viên
                                                </td>
                                            </tr>
                                        ) : (
                                            staffs.map((s, index) => (
                                                <tr key={index} className="shadow text-center text-white hover:scale-102">
                                                    <td className="py-3 px-4 bg-white/10 border-l-0 transition-all duration-300 rounded-l-md">{index + 1}</td>
                                                    <td className="py-3 px-4 bg-white/10 border-l-0 transition-all duration-300">{s.name}</td>
                                                    <td className="py-3 px-4 bg-white/10 border-l-0 transition-all duration-300">{s.email}</td>
                                                    <td className="py-3 px-4 bg-white/10 border-l-0 transition-all duration-300">{s.phone}</td>
                                                    <td className="py-3 px-4 bg-white/10 flex justify-center border-l-0 transition-all duration-300">
                                                        <p
                                                            className={`w-fit px-3 py-1 rounded-full
         ${s.totalTasks === 0
                                                                    ? "bg-white text-black"
                                                                    : s.totalTasks < 5
                                                                        ? "bg-yellow-500/60"
                                                                        : s.totalTasks < 10
                                                                            ? "bg-blue-700/60"
                                                                            : "bg-green-600/60"
                                                                }
      `}
                                                        >
                                                            {s.totalTasks}
                                                        </p>
                                                    </td>
                                                    <td className="py-3 px-4 bg-white/10 border-l-0 transition-all duration-300 rounded-r-md">
                                                        <RowActions
                                                            onEdit={() => handleOpenEdit(String(s.id))}
                                                            onDelete={() => handleDelete(String(s.id))}
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>

                                )}
                            </table>
                        </div>
                    </div>


                </div>

                {isOpen && (
                    <> <StaffCreatePage
                        onClose={() => setIsOpen(false)}
                        onSuccess={fetchStaff} /></>
                )}

                {isopenEdit && (
                    <StaffEditPage
                        staff_id={String(editId)}
                        onClose={() => setIsOpenEdit(false)}
                        onSuccess={fetchStaff}
                    />
                )}

                {deleteId && (
                    <ConfirmDelete
                        id={deleteId}
                        onConfirm={handleConfirmDelete}
                        onCancel={() => setDeleteId(null)} />
                )}
            </div>
        </>
    )
}