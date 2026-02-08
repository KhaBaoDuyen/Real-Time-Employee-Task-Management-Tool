export const STATUS_MAP: Record<
   number,
   { label: string; color: string }
> = {
   0: { label: "Đã hủy", color: "bg-red-500/70" },
   1: { label: "Chưa thực hiện", color: "bg-gray-400/60" },
   2: { label: "Đang thực hiện", color: "bg-blue-600/60" },
   3: { label: "Hoàn thành", color: "bg-green-600/60" },
};
