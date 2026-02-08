import { EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { STATUS_MAP } from "~/constants/task.constants";

//COMPONENTS
import Loading from "~/components/UI/Loading/loading";
import { RowActions } from "~/components/UI/RowActions/RowActions";
import TaskCreatePage from "~/pages/owner/task/task.create";
import TaskEditPage from "~/pages/owner/task/task.edit";

//INTERFACE+ SREVICE
import { ITask } from "../../../../shared/interface/task.interface";
import { deleteTaskById, getTask, updateTask } from "~/services/task.service";
import { formatDate } from "~/utils/date.utils";
import { IStaff } from "shared/interface/staff.interface";
import { getStaffs } from "~/services/staff.service";
import { FilterSelect } from "~/components/features/form/FilterSelect";
import { ConfirmDelete } from "~/components/UI/ConfirmDelete/confirmDelete";

export default function TaskListPage() {
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [staffByStatus, setStaffByStatus] = useState<any[]>([]);

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);

    const [statusTab, setStatusTab] = useState<number | "all">("all");
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const handleOpentCreate = () => {
        setIsOpen((prev) => !prev);
    }

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const res = await getTask();
            return setTasks(res);
        } catch (err: any) {
            return console.log("Error fetch tasks =>", err);
        } finally {
            setLoading(false);
        }
    }


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
        fetchTasks();
    }, []);

    //Update staff by task
    const handleUpdateStaff = async (taskId: string, staff_id: string) => {
        try {
            await updateTask(taskId, { staff_id });
            fetchTasks();
        } catch (err) {
            console.log("Assign staff error =>", err);
        }
    };

    //open form edit 
    const handleOpenEdit = (id: string) => {
        setEditId(id);
        setIsEditOpen(true);
    }

    //filter status tab
    const filterTasks = statusTab === "all" ? tasks : tasks.filter(t => t.status === statusTab);

    //delete task
    const handleDelete = (task_id: string) => {
        setDeleteId(task_id);
    }

    const handleConfirmDelete = async () => {
        const id = toast.loading("Đang xử lý");
        try {
            const res = await deleteTaskById(String(deleteId));
            setDeleteId(null);
            fetchTasks();

            toast.update(id, {
                render: res.message,
                type: "success",
                isLoading: false,
                autoClose: 2000,
            })

        } catch (err: any) {
            console.log("Error delete task =>", err);
            return toast.update(id, {
                render: err.response?.data?.message || "Đã xảy ra lỗi trong quá trình lỗi",
                type: "error",
                autoClose: 2000,
            })
        }
    }
    return (
        <>
            <div className="py-5 relative">
                <span className="flex justify-between">
                    <h1 className="text-2xl font-bold text-white">
                        Quản lí công việc
                    </h1>
                    <button onClick={handleOpentCreate}
                        className="p-2 bg-primary text-white rounded-md shadow-md">Thêm công việc</button>
                </span>
                <div className="flex gap-2 mt-5">
                    {[
                        { label: "Tất cả", value: "all" },
                        { label: "Chưa thực hiện", value: 1 },
                        { label: "Đang thực hiện", value: 2 },
                        { label: "Hoàn thành", value: 3 },
                        { label: "Đã hủy", value: 0 }
                    ].map((tab) => (
                        <button
                            key={String(tab.value)}
                            onClick={() => setStatusTab(tab.value as any)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition
                            ${statusTab === tab.value
                                    ? "bg-primary text-white"
                                    : "bg-white/10 text-white hover:bg-white/20"}`}>
                            {tab.label}
                        </button>
                    ))}
                </div>


                <div className="mt-10 ">
                    <div className="">
                        <div className="">
                            <table className="w-full border-separate border-spacing-y-3">
                                <thead className="sticky top-0  text-white shadow">
                                    <tr className="text-center">
                                        <th className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 rounded-l-md">Id</th>
                                        <th className="py-3 px-4 text-left bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300">Tiêu đề</th>
                                        <th className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 ">Mức độ</th>
                                        <th className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 ">Người phụ trách</th>
                                        <th className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 ">Trạng thái</th>
                                        <th className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 ">Ngày đáo hạn</th>
                                        <th className="py-3 px-4 flex justify-center bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 rounded-r-md"><EllipsisVertical /></th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <tr>
                                        <td colSpan={7} className="text-center py-8 text-white bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 rounded-md">
                                            <Loading />
                                        </td>
                                    </tr>
                                ) : (
                                    <tbody>
                                        {tasks.length === 0 ? (
                                            <tr>
                                                <td colSpan={7} className="text-center py-8 text-white bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 rounded-md">
                                                    Không có công việc
                                                </td>
                                            </tr>
                                        ) : (
                                            filterTasks.map((t, index) => (
                                                <tr key={index} className="shadow text-center text-white hover:border-1 border-white ">
                                                    <td className="py-3 px-4 text-left bg-white/10 border-l-0 transition-all duration-300 rounded-l-md">{index + 1}</td>
                                                    <td className="py-3 px-4 text-left bg-white/10 border-l-0 transition-all duration-300">
                                                        <p className="line-clamp-2">{t.title}</p>
                                                        <p dangerouslySetInnerHTML={{ __html: t.description }} className="line-clamp-3 text-sm text-gray-400"></p>
                                                    </td>

                                                    <td className="py-3 px-4 bg-white/10 border-l-0 transition-all duration-300">
                                                        <span className={`px-3 py-1 rounded-full text-sm font-bold 
                                                        ${t.priority === 1 ?
                                                                "bg-red-200 text-red-600" :
                                                                "bg-gray-200 text-gray-600"
                                                            }`}>
                                                            {t.priority === 1 ? "Ưu tiên" : "Bình thường"}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 bg-white/10 border-l-0 ">
                                                        <span className="flex justify-center">
                                                            <FilterSelect
                                                                value={t.staff_id || ""}
                                                                onChange={(staff_id) => handleUpdateStaff(String(t.id), String(staff_id))}
                                                                options={[
                                                                    { id: "", name: "Chưa phân công" },
                                                                    ...staffByStatus
                                                                ]}
                                                            />
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 bg-white/10 border-l-0 transition-all duration-300">
                                                        <span className={`px-3 py-1 rounded-full ${STATUS_MAP[t.status]?.color}`}>
                                                            {STATUS_MAP[t.status]?.label}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 bg-white/10 border-l-0 transition-all duration-300">{formatDate(t.due_date)}</td>
                                                    <td className="py-3 px-4 bg-white/10 border-l-0 transition-all duration-300 rounded-r-md">
                                                        <RowActions
                                                            onEdit={() => handleOpenEdit(String(t.id))}
                                                            onDelete={() => handleDelete(String(t.id))}
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
                    <>
                        <TaskCreatePage
                            onClose={() => setIsOpen(false)}
                            onSuccess={fetchTasks}
                        />
                    </>
                )}

                {isEditOpen && editId && (
                    <TaskEditPage
                        taskId={editId}
                        onClose={() => setIsEditOpen(false)}
                        onSuccess={fetchTasks}
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