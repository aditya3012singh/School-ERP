"use client";

import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  CalendarDays,
  Users,
  User,
  LogOut,
} from "lucide-react";

const studentMenu = [
  {
    label: "Dashboard",
    path: "/dashboard/student",
    icon: LayoutDashboard,
  },
  {
    label: "Attendance",
    path: "/dashboard/student/attendance",
    icon: CalendarCheck,
  },
  {
    label: "Timetable",
    path: "/dashboard/student/timetable",
    icon: CalendarDays,
  },
  {
    label: "PTM",
    path: "/dashboard/student/ptm",
    icon: Users,
  },
  {
    label: "Profile",
    path: "/dashboard/student/profile",
    icon: User,
  },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="w-64 h-screen bg-white border-r flex flex-col">
      {/* Logo */}
      <div
        onClick={() => router.push("/dashboard/student")}
        className="px-6 py-4 text-xl font-bold text-black border-b cursor-pointer"
      >
        Student Panel
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {studentMenu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              onClick={() => router.push(item.path)}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              <Icon size={18} />
              {item.label}
            </button>
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
