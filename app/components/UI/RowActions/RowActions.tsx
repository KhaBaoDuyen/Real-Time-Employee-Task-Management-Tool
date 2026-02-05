import { useState, useRef, useEffect } from "react";
import type { RowActionProp } from "./RowActions.type";
import { EllipsisVertical, SquarePen, Trash2 } from "lucide-react";

export const RowActions = ({ onEdit, onDelete }: RowActionProp) => {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!wrapperRef.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={wrapperRef} className="relative z-50 inline-block">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="p-2 rounded-md hover:bg-gray-100"
            >
                <EllipsisVertical size={18} />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border z-50">
                    <button
                        onClick={() => {
                            onEdit?.();
                            setOpen(false);
                        }}
                        className="block flex gap-2 w-full px-3 py-2 text-left hover:bg-gray-100"
                    >
                        <SquarePen size={18}/> <p>Chỉnh sửa</p>
                    </button>

                    <button
                        onClick={() => {
                            onDelete?.();
                            setOpen(false);
                        }}
                        className="block flex gap-2 w-full px-3 py-2 text-left text-red-600 hover:bg-red-50"
                    >
                        <Trash2 size={18}/> <p>Xóa</p>
                    </button>
                </div>
            )}
        </div>
    );
};
