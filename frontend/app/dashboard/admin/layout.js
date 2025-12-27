import Sidebar from "@/components/admin/Sidebar";

export default function adminLayout({ children }) {
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
