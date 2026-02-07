import { Outlet, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";
import { Sidebar } from "~/components/layout/Sidebar/Sidebar";
import { Topbar } from "~/components/layout/Topbar/Topbar";

export default function AdminLayout() {
    const location = useLocation();
    return (
        <div className="flex min-h-screen bg-base">
            <Sidebar />

            <div className="flex flex-1 pl-0 pt-0  flex-col">
                <div className="w-11/12 mx-auto">
                    <Topbar />
                </div>
                <main className="flex-1 w-11/12 mx-auto rounded-2xl">
                    <Outlet key={location.pathname} />
                </main>
            </div>
            	<ToastContainer
					position="top-right"
					autoClose={2000}
					hideProgressBar={false}
					newestOnTop
					closeOnClick
					pauseOnHover
					draggable
					theme="colored"
				/>
        </div>
    );
}
