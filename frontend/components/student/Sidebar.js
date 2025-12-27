"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const studentMenu = [
  { label: "Dashboard", path: "/dashboard/student" },

  { label: "Attendance", path: "/dashboard/student/attendance" },

  { label: "Timetable", path: "/dashboard/student/timetable" },
  { label: "PTM", path: "/dashboard/student/ptm" },

  { label: "Profile", path: "/dashboard/student/profile" },

  { label: "Logout", path: "/logout" },
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
      <div onClick={() => router.push("/dashboard/student")} className="pb-8 cursor-pointer"><h1 className="text-xl font-bold p-4">School Dashboard</h1></div>
      {studentMenu.map((item) => (
        <div key={item.label} className="">

          {/* Parent Menu */}
          <div
            onClick={() => handleClick(item)}
            className="p-4 cursor-pointer flex justify-between items-center hover:bg-gray-100"
          >
            <span className="font-semibold">{item.label}</span>

            {/* Show toggle icon only if children exist */}
            {/* {item.children && (
              <span className="text-lg">
                {activeMenu === item.label ? "−" : "+"}
              </span>
            )} */}
          </div>

          {/* Child Menu */}
          {activeMenu === item.label && item.children && (
            
            <ol  className="pl-6 pb-3 space-y-2 text-sm text-gray-600">
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
    </aside>
  );
}
