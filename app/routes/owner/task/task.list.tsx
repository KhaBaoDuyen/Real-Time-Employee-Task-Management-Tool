import { Route } from ".react-router/types/app/+types/root";
import TaskListPage from "~/pages/owner/task/task.list";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Quản lý công việc" },
        { name: "description", content: "Quản lý công việc" }
    ]
}

export default function TaskList() {
    return <TaskListPage />
}