import Sidebar from "@/components/teacher/Sidebar";


export default function dashboardLayout({ children }) {
  return (
    <div
      style={{}}
      className="flex "
    >
      <Sidebar/>
      {children}
    </div>
  );
}
