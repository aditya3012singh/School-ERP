"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserPlus,
  CalendarDays,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { logout } from "@/store/api/auth.thunk";

const adminMenu = [
  {
    label: "Dashboard",
    path: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Students",
    icon: Users,
    children: [
      { label: "All Students", path: "/dashboard/admin/students" },
      { label: "Add Student", path: "/dashboard/admin/students/add" },
    ],
  },
  {
    label: "Teachers",
    icon: GraduationCap,
    children: [
      { label: "All Teachers", path: "/dashboard/admin/teachers" },
      { label: "Add Teacher", path: "/dashboard/admin/teachers/add" },
    ],
  },
  {
    label: "Parents",
    icon: UserPlus,
    children: [
      { label: "Invite Parent", path: "/dashboard/admin/parents/invite" },
      { label: "Parent List", path: "/dashboard/admin/parents" },
    ],
  },
  {
    label: "Timetable",
    icon: CalendarDays,
    children: [
      { label: "Create Timetable", path: "/dashboard/admin/timetable/create" },
      { label: "All Timetables", path: "/dashboard/admin/timetable" },
    ],
  },
  {
    label: "PTM",
    icon: CalendarDays,
    children: [
      { label: "Schedule PTM", path: "/dashboard/admin/ptm/create" },
      { label: "PTM List", path: "/dashboard/admin/ptm" },
    ],
  },
  {
    label: "Settings",
    icon: Settings,
    children: [{ label: "Profile", path: "/dashboard/admin/profile" }],
  },
];

export default function Sidebar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleMenuClick = (item) => {
    if (item.children) {
      setActiveMenu(activeMenu === item.label ? null : item.label);
    } else {
      router.push(item.path);
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
    } finally {
      router.replace("/auth/login");
    }
  };

  return (
    <aside className="w-64 h-screen bg-white border-r flex flex-col">
      {/* Logo */}
      <div
        onClick={() => router.push("/dashboard/admin")}
        className="px-6 bg-white py-4 text-xl font-bold text-black border-b cursor-pointer sticky top-0 z-10"
      >
        School Admin
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {adminMenu.map((item) => {
          const Icon = item.icon;
          const isOpen = activeMenu === item.label;

          return (
            <div key={item.label}>
              {/* Parent */}
              <button
                onClick={() => handleMenuClick(item)}
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

              {/* Children */}
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
      <div className=" p-4 sticky bottom-0 bg-white ">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-600 hover:bg-red-50 px-10 py-2 rounded-lg w-full transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
