import Sidebar from "@/components/student/Sidebar";


export default function Layout({ children }) {
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
