"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
      { label: "Subjects", path: "/dashboard/admin/subjects" },
      { label: "Timetable", path: "/dashboard/admin/timetable" },
    ],
  },
  {
    label: "Attendance",
    path: "/dashboard/admin/attendance",
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
    children: [
      { label: "Profile", path: "/admin/profile" },
      { label: "Logout", path: "/logout" },
    ],
  },
];



export default function Sidebar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const router = useRouter();

  const handleClick = (item) => {
    // If item has children → toggle
    if (item.children) {
      setActiveMenu(activeMenu === item.label ? null : item.label);
    } 
    // If item has path → navigate
    else if (item.path) {
      router.push(item.path);
    }
  };

  return (
    <aside className="w-60 h-screen border-r border-gray-200">
      <div className="pb-8"><h1 className="text-xl font-bold p-4">School Dashboard</h1></div>
      {adminMenu.map((item) => (
        <div key={item.label} className="">

          {/* Parent Menu */}
          <div
            onClick={() => handleClick(item)}
            className="p-4 cursor-pointer flex justify-between items-center hover:bg-gray-100"
          >
            <span className="font-semibold">{item.label}</span>

            {/* Show toggle icon only if children exist */}
            {item.children && (
              <span className="text-lg">
                {activeMenu === item.label ? "−" : "+"}
              </span>
            )}
          </div>

          {/* Child Menu */}
          {activeMenu === item.label && item.children && (
            <ul className="pl-6 pb-3 space-y-2 text-sm text-gray-600">
              {item.children.map((child) => (
                <li
                  key={child.label}
                  onClick={() => router.push(child.path)}
                  className="cursor-pointer hover:text-black"
                >
                  {child.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </aside>
  );
}
