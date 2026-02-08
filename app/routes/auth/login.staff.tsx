import LoginStaffPage from "~/pages/auth/login/login.staff";
import { Route } from "../../+types/root";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Đăng nhập nhân viên" },
        { name: "description", content: "Đăng nhập với tài khoản nhân viên" },
    ];
}

export default function LoginOwner() {
    return <LoginStaffPage />;
}
