"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  CalendarDays,
  Users,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

const parentMenu = [
  {
    label: "Dashboard",
    path: "/dashboard/parent",
    icon: LayoutDashboard,
  },
  {
    label: "Attendance",
    path: "/dashboard/parent/attendance",
    icon: CalendarCheck,
  },
  {
    label: "Timetable",
    path: "/dashboard/parent/timetable",
    icon: CalendarDays,
  },
  {
    label: "PTM",
    path: "/dashboard/parent/ptm",
    icon: Users,
  },
  {
    label: "Settings",
    icon: Settings,
    children: [
      { label: "Profile", path: "/dashboard/parent/profile" },
    ],
  },
];

export default function Sidebar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const router = useRouter();

  const handleClick = (item) => {
    if (item.children) {
      setActiveMenu(activeMenu === item.label ? null : item.label);
    } else {
      router.push(item.path);
    }
  };

  return (
    <aside className="w-64 h-screen bg-white border-r flex flex-col">
      {/* Logo */}
      <div
        onClick={() => router.push("/dashboard/parent")}
        className="px-6 py-4 text-xl font-bold text-black border-b cursor-pointer"
      >
        Parent Panel
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {parentMenu.map((item) => {
          const Icon = item.icon;
          const isOpen = activeMenu === item.label;

          return (
            <div key={item.label}>
              {/* Parent Item */}
              <button
                onClick={() => handleClick(item)}
                className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium transition
                  ${
                    isOpen
                      ? "bg-indigo-50 text-blue-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <span className="flex items-center gap-3">
                  <Icon size={18} />
                  {item.label}
                </span>

                {item.children && (
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {/* Child Items */}
              {isOpen && item.children && (
                <div className="ml-10 mt-2 space-y-1">
                  {item.children.map((child) => (
                    <button
                      key={child.label}
                      onClick={() => router.push(child.path)}
                      className="block w-full text-left text-sm text-gray-600 hover:text-blue-800 transition"
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t p-4">
        <button
          onClick={() => router.replace("/auth/login")}
          className="flex items-center gap-3 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg w-full transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
