import { Route } from "../../+types/root";
import LoginOwnerPage from "~/pages/auth/login/login.owner";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Đăng nhập quản lý" },
        { name: "description", content: "Đăng nhập với tài khoản quản lý" },
    ];
}

export default function LoginOwner() {
    return <LoginOwnerPage />;
}
