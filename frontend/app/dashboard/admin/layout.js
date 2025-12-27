import Sidebar from "@/components/admin/Sidebar";

export default function adminLayout({ children }) {
  return (
    <div
      style={{}}
      className="flex "
    > <div>
        <Sidebar/>
    </div>
      <div className="w-full">
        {children}
      </div>
      
    </div>
  );
}
