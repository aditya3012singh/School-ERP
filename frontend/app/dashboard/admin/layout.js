import Sidebar from "@/components/admin/Sidebar";
import { Bell } from "lucide-react";

export default function adminLayout({ children }) {
  return (
    <div
      style={{}}
      className="flex "
    > <div className="">
        <Sidebar/>
    </div>
      <div className="w-full">
          <header className="bg-white border-b px-6 py-2 sticky top-0 z-10">
          <div className="flex justify-between max-w-[1600px] mx-auto">
            <div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-xs text-gray-500">
                School ERP overview & analytics
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                {/* <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  placeholder="Search students, teachers..."
                  className="pl-10 pr-4 py-2 border rounded-lg text-sm w-80 bg-gray-50"
                /> */}
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                A
              </div>
            </div>
          </div>
        </header>
        {children}
      </div>
      
    </div>
  );
}
