import "./confirmDelete.scss";
import { DeleteProp } from "./confirmDelete.type";

export const ConfirmDelete = ({
    id,
    onConfirm,
    onCancel,
}: DeleteProp) => {
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="confirmDelete">
                <div className="header">
                    <div className="image">
                        <svg
                            aria-hidden="true"
                            stroke="currentColor"
                            stroke-width="1.5"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                stroke-linejoin="round"
                                stroke-linecap="round"
                            ></path>
                        </svg>
                    </div>
                    <div className="content">
                        <span className="title">Xác nhận xóa</span>
                        <p className="message">
                            Sau khi xóa dữ liệu sẽ không còn hiển thị trên hệ thống, vui lòng kiểm tra và nhấn xác nhận để
                            hoàn thành thực hiện xóa.
                        </p>
                    </div>
                    <div className="actions">
                        <button
                            className="desactivate"
                            type="button"
                            onClick={onConfirm}>Xác nhận xóa</button>
                        <button
                            className="cancel"
                            type="button"
                            onClick={onCancel}>Hủy</button>
                    </div>
                </div>
            </div>
        </div>
    )
}