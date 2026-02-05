import { EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

//COMPONENTS
import Loading from "~/components/UI/Loading/loading";
import { RowActions } from "~/components/UI/RowActions/RowActions";
import StaffCreatePage from "./staff.create";

//INTERFACE+ SREVICE
import { Istaff } from "../../../../shared/types/staff.type";
import { getStaffs } from "~/services/staff.service";

export default function StaffListPage() {
    const [loading, setLoading] = useState(false);
    const [staffs, setStaffs] = useState<Istaff[]>([]);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleOpentCreate = async () => {
        setIsOpen((prev) => !prev);
    }

    const fetchStaff = async () => {
        setLoading(true);
        try {
            const res = await getStaffs();
            return setStaffs(res)
        } catch (err) {
            console.log("Error fetch staffs =>", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchStaff();
    }, []);

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
                                        <th colSpan={2} className="py-3 px-4 text-left bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300">Tên nhân viên</th>
                                        <th className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 ">Số điện thoại</th>
                                        <th className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 ">Task</th>
                                        <th className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 ">Trạng thái</th>
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
                                        {staffs.length === 0 ? (
                                            <tr>
                                                <td colSpan={7} className="text-center py-8 text-white bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 rounded-md">
                                                    Không có nhân viên
                                                </td>
                                            </tr>
                                        ) : (
                                            staffs.map((s, index) => (
                                                <tr key={index} className="shadow text-center text-white hover:scale-102">
                                                    <td className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300 rounded-l-md">{index + 1}</td>

                                                    <td className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300">
                                                        <img
                                                            src={s.image}
                                                            alt={s.name}
                                                            className="w-15 h-15 object-cover rounded"
                                                        />
                                                    </td>

                                                    <td className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300">{s.name}</td>
                                                    <td className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300">{s.phone}</td>
                                                    <td className="py-3 px-4 bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300">(4)</td>
                                                    <td className="py-3 px-4  bg-white/10 backdrop-blur-xl border-l-0 transition-all duration-300">
                                                        <p className={` rounded-2xl ${s.status ? "bg-success" : "danger"}`}> {s.status ? "Hoạt động" : "Không hoạt động"}</p>
                                                    </td>

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
                    <> <StaffCreatePage onClose={() => setIsOpen(false)} /></>
                )}
            </div>
        </>
    )
}