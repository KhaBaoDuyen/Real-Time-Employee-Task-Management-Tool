 import { Route } from ".react-router/types/app/+types/root";
import StaffCreatePage from "~/pages/owner/staff/staff.create";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Thêm nhân viên" },
        { name: "description", content: "Thêm nhân viên" }
    ]
}

export default function StaffCreate(){
    return <StaffCreatePage/>
}