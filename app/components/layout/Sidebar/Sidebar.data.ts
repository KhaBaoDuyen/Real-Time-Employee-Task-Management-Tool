import {
  Users,
  ClipboardList,
  MessageCircle,
  Settings,
 } from "lucide-react";

type Sidebar = {
  title: string;
  slug: string;
  icon: React.ElementType;
};

export const SIDEBAR_DATA: Sidebar[] = [
  {
    title: "Nhân viên",
    slug: "/owner/staff",
    icon: Users,
  },
  {
    title: "Công việc",
    slug: "/owner/task/list",
    icon: ClipboardList,
  },
  {
    title: "Chat",
    slug: "/owner/chat",
    icon: MessageCircle,
  },
  {
    title: "Cài đặt",
    slug: "/owner/settings",
    icon: Settings,
  },
];
