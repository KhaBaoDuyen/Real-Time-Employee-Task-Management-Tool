import type { CreateProp } from "./type/create.type";
import { X } from 'lucide-react';

import TaskForm from "~/components/features/task/task.form";

export default function TaskCreatePage({
    onClose
}: CreateProp) {

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 shadow-xl w-6/12">
                <span className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold mb-4 text-primary">Thêm công việc</h2>
                    <span className="flex w-7 h-7 items-center justify-center text-white bg-danger rounded-md cursor-pointer">
                        <X onClick={onClose} />
                    </span>
                </span>

                <TaskForm />
            </div>
        </div>
    );
}
