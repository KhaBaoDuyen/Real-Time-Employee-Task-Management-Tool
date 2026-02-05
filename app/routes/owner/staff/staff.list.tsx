import { Route } from "../../../+types/root";
import StaffListPage from "~/pages/owner/staff/staff.list";

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "Quản lý nhân viên" },
		{ name: "description", content: "Quản lý danh sách nhân viên" },
	];
}

export default function StaffList() {
	return <StaffListPage />;
}
