import logo from "../../../../public/images/logo.png";
import { SIDEBAR_DATA } from "./Sidebar.data";
import { Link, useLocation } from "react-router";

export const Sidebar = () => {
    const location = useLocation();

    return (
        <aside className="w-2/12  bg-white/10 backdrop-blur-xl shadow-2xl  border-l-0 transition-all duration-300 rounded-tr-4xl 
        rounded-br-4xl text-white min-h-screen ">
            <div className="p-4">
                <img src={logo} alt="Logo" className="h-10 w-auto mx-auto" />
            </div>
            <nav className="mt-10 px-2">
                <ul className="text-gray-400">
                    {SIDEBAR_DATA.map((item, index) => {
                        const isActive = location.pathname === item.slug ||
                            (item.slug !== "/admin" && location.pathname.startsWith(item.slug));
                        return (
                            <li className="relative" key={index + 1}>
                                <Link
                                    to={item.slug}
                                    className={`group relative flex items-center gap-3 mb-1 rounded-full py-3 px-5 transition-all duration-300 border
                                    ${isActive
                                            ? "bg-blue-900/70 border-[#1a3acc] text-white"
                                            : "border-transparent text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20"
                                        }`}>
                                    <item.icon
                                        size={20}
                                        className={`${isActive ? "text-white" : "text-gray-300 group-hover:text-white"}`}
                                    />
                                    <p className="text-md font-medium group-hover:!text-gray-300">{item.title}</p>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};