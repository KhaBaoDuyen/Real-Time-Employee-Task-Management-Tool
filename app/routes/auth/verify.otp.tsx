import VerifyOTPOwnerPage from "~/pages/auth/verify/verify.owner";
import { Route } from "../../+types/root";
 
export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Nhập mã xác thực" },
        { name: "description", content: "Nhập mã xác thực quản lý" },
    ];
}

export default function VerifyOwner() {
    return <VerifyOTPOwnerPage />;
}
