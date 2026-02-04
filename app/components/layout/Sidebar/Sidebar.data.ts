import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tags,
  BadgeDollarSign,
  Store
} from "lucide-react";

type Sidebar = {
  title: string;
  slug: string;
  icon: React.ElementType;
};

export const SIDEBAR_DATA: Sidebar[] = [
  {
    title: "Dashboard",
    slug: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Sản phẩm",
    slug: "/admin/products",
    icon: Package,
  },
  {
    title: "Danh mục",
    slug: "/admin/categories",
    icon: Tags,
  },
  {
    title: "Tài khoản",
    slug: "/admin/users",
    icon: Users,
  },
  {
    title: "Đơn hàng",
    slug: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Thương hiệu",
    slug: "/admin/brands",
    icon: BadgeDollarSign,
  },
  {
    title: "Chuỗi cửa hàng",
    slug: "/admin/stores",
    icon: Store,
  },
];
