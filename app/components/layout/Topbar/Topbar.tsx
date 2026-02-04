import { useState } from "react";
import { Search } from "~/components/UI/Search/Search";
import { Bell, User, LogOut } from "lucide-react";

export const Topbar = () => {
  const [openNotify, setOpenNotify] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  return (
    <header className="flex items-center justify-between bg-white py-4 ">
      <Search showIcon={false} type="outline" />

      <div className="flex items-center gap-4 relative">
         <div className="relative">
          <button
            onClick={() => {
              setOpenNotify(!openNotify);
              setOpenUser(false);
            }}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Bell size={20} />
          </button>

          {openNotify && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border z-50">
              <div className="px-4 py-3 border-b font-semibold text-sm">
                Thông báo
              </div>

               <div className="px-4 py-6 text-sm text-gray-500 text-center">
                Chưa có thông báo mới
              </div>
            </div>
          )}
        </div>

         <div className="relative">
          <button
            onClick={() => {
              setOpenUser(!openUser);
              setOpenNotify(false);
            }}
            className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-lg"
          >
            <img
              src="/avatar.png"
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium">User Name</span>
          </button>

          {openUser && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border z-50">
              <div className="px-4 py-3 border-b">
                <p className="text-sm font-semibold">User Name</p>
                <p className="text-xs text-gray-500">user@email.com</p>
              </div>

              <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100">
                <User size={16} />
                Thông tin tài khoản
              </button>

              <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                <LogOut size={16} />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
