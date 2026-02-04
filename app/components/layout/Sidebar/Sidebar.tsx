import logo from "../../../../public/images/logo.png";
import { SIDEBAR_DATA } from "./Sidebar.data";
import { Link, useLocation } from "react-router";

export const Sidebar = () => {
    const location = useLocation();

    return (
        <aside className="w-64 bg-white text-white min-h-screen border-r border-gray-100">
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
                                    className={`group relative flex items-center gap-3 rounded-lg py-3 pl-6 pr-3 transition
                                        ${isActive
                                            ? "bg-red-50 text-accent-600"
                                            : "text-gray-400 hover:bg-gray-100"
                                        }`}
                                >
                                    {isActive && (
                                        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-red-400" />
                                    )}
                                    <item.icon
                                        size={20}
                                        className={`${isActive ? "text-accent-600" : "text-gray-400 group-hover:text-gray-600"}`}
                                    />
                                    <p className="text-md font-medium group-hover:text-gray-600">{item.title}</p>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};