import { EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

//COMPONENTS
import Loading from "~/components/UI/Loading/loading";
import { RowActions } from "~/components/UI/RowActions/RowActions";
import TaskCreatePage from "~/pages/owner/task/task.create";


//INTERFACE+ SREVICE
import { ITask } from "../../../../shared/types/task.interface";
import { getStaffs } from "~/services/staff.service";

export default function TaskListPage() {
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const handleOpentCreate = () => {
        setIsOpen((prev) => !prev);
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


                <div className="mt-10 ">
                    <div className="">
                        <div className="">
                            <table className="w-full border-separate border-spacing-y-3">
                                <thead className="sticky top-0 z-10 text-white shadow">
                                    <tr className="text-center">
                                        <th className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 rounded-l-md">Id</th>
                                        <th className="py-3 px-4 text-left bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300">Tiêu đề</th>
                                        <th className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 ">Nội dung công việc</th>
                                        <th className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 ">Mức độ</th>
                                        <th className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 ">Người phụ trách</th>
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
                                            tasks.map((s, index) => (
                                                <tr key={index} className="shadow text-center text-white hover:scale-102">
                                                    <td className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 rounded-l-md">{index + 1}</td>

                                                    <td className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300">
                                                        Công việc
                                                    </td>

                                                    <td className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300">Nội dung</td>
                                                    <td className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300">Mức độ</td>
                                                    <td className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300">Người phụ trách</td>
                                                    <td className="py-3 px-4  bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300">Ngày đáo hạn</td>
                                                    <td className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 rounded-r-md">
                                                        <RowActions
                                                        // onEdit={() => navigate(`/admin/staff/${s.slug}/edit`)}
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
                    <> <TaskCreatePage onClose={() => setIsOpen(false)} /></>
                )}
            </div>
        </>
    )
}