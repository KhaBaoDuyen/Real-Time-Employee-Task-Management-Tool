import { Welcome } from "../welcome/welcome";
import type { Route } from "./+types/home";
import HomePage from "~/pages/home/home";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Trang chủ" },
		{ name: "description", content: "Chào mừng đến với cửa hàng thiết bị gaming!" },
	];
}

export default function Home() {
	return <HomePage />;
}
