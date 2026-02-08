import { Outlet, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
    const location = useLocation();
    return (
        <div className="flex min-h-screen bg-base">

            <Outlet key={location.pathname} />

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
