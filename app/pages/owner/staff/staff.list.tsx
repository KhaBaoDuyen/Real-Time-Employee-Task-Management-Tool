import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Loading from "~/components/UI/Loading/loading";
import { RowActions } from "~/components/UI/RowActions/RowActions";
import StaffCreatePage from "./staff.create";

export default function StaffListPage() {
    const [loading, setLoading] = useState(false);
    const [staffs, setStaffs] = useState([]);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleOpentCreate = async () => {
        setIsOpen((prev) => !prev);
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
                                    <tr>
                                        <th className="py-3 px-4 text-left bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 rounded-l-md">Id</th>
                                        <th colSpan={2} className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 text-left">Tên nhân viên</th>
                                        <th className="py-3 px-4 text-left bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 ">Thương hiệu</th>
                                        <th className="py-3 px-4 text-left bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 ">Số điện thoại</th>
                                        <th className="py-3 px-4 text-left bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 ">Task</th>
                                        <th className="py-3 px-4 text-left bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 ">Trạng thái</th>
                                        <th className="py-3 px-4 text-left bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300  rounded-r-md"><EllipsisVertical /></th>
                                    </tr>
                                </thead>
                                {loading ? <Loading /> : (
                                    <tbody>
                                        {staffs.length === 0 ? (
                                            <tr>
                                                <td colSpan={9} className="text-center py-8 text-white bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 rounded-md">
                                                    Không có nhân viên
                                                </td>
                                            </tr>
                                        ) : (
                                            staffs.map((p, index) => (
                                                <tr key={index} className="shadow hover:scale-102">
                                                    <td className="py-3 px-4 bg-white rounded-l-md">{index + 1}</td>

                                                    <td className="py-3 px-4 bg-white">
                                                        <img
                                                            src={'avatar.png'}
                                                            alt={"name"}
                                                            className="w-12 h-12 object-cover rounded"
                                                        />
                                                    </td>

                                                    <td className="py-3 px-4 bg-white">{"name"}</td>
                                                    <td className="py-3 px-4 bg-white">{"sdt"}</td>
                                                    <td className="py-3 px-4 bg-white">{"vai trò"}</td>
                                                    <td className="py-3 px-4 bg-white">
                                                        {/* {p.status ? "Hoạt động" : "Không hoạt động"} */}
                                                    </td>

                                                    <td className="py-3 px-4 bg-white rounded-r-md">
                                                        <RowActions
                                                        // onEdit={() => navigate(`/admin/staff/${p.slug}/edit`)}
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
                    <> <StaffCreatePage onClose={() => setIsOpen(false)} /></>
                )}
            </div>
        </>
    )
}