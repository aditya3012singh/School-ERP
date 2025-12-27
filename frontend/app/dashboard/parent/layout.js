import Sidebar from "@/components/parent/Sidebar";


export default function dashboardLayout({ children }) {
  return (
    <div
      style={{}}
      className="flex"
    >
      <Sidebar/>
      {children}
    </div>
  );
}
