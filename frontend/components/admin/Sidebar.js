"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/store/api/auth.thunk";

const adminMenu = [
  { label: "Dashboard", path: "/dashboard/admin" },

  {
    label: "Students",
    children: [
      { label: "All Students", path: "/dashboard/admin/students" },
      { label: "Add Student", path: "/dashboard/admin/students/add" },
    ],
  },
  {
    label: "Teachers",
    children: [
      { label: "All Teachers", path: "/dashboard/admin/teachers" },
      { label: "Add Teacher", path: "/dashboard/admin/teachers/add" },
    ],
  },
  {
    label: "Parents",
    children: [
      { label: "Invite Parent", path: "/dashboard/admin/parents/invite" },
      { label: "Parent List", path: "/dashboard/admin/parents" },
    ],
  },
  {
    label: "Timetable",
    children: [
      { label: "Create Timetable", path: "/dashboard/admin/timetable/create" },
      { label: "All Timetables", path: "/dashboard/admin/timetable" },
    ],
  },
  {
    label: "PTM",
    children: [
      { label: "Schedule PTM", path: "/dashboard/admin/ptm/create" },
      { label: "PTM List", path: "/dashboard/admin/ptm" },
    ],
  },
  {
    label: "Settings",
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
    <aside className="w-60 h-screen border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div
        onClick={() => router.push("/dashboard/admin")}
        className="p-4 text-xl font-bold cursor-pointer border-b"
      >
        School Dashboard
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto">
        {adminMenu.map((item) => (
          <div key={item.label}>
            {/* Parent */}
            <div
              onClick={() => handleMenuClick(item)}
              className="p-4 cursor-pointer flex justify-between items-center hover:bg-gray-100 font-semibold"
            >
              {item.label}
              {item.children && (
                <span>{activeMenu === item.label ? "−" : "+"}</span>
              )}
            </div>

            {/* Children */}
            {activeMenu === item.label && item.children && (
              <ol className="pl-8 pb-3 space-y-2 text-sm text-gray-600">
                {item.children.map((child) => (
                  <li
                    key={child.label}
                    onClick={() => router.push(child.path)}
                    className="cursor-pointer hover:text-black"
                  >
                    {child.label}
                  </li>
                ))}
              </ol>
            )}
          </div>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="p-4 text-left border-t text-red-600 hover:bg-red-50"
      >
        Logout
      </button>
    </aside>
  );
}
