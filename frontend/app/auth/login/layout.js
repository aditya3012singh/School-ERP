import LoginSideInfo from "@/components/auth/Text";

export default function LoginLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      
      {/* Left Side – Info Section */}
      <div className="hidden md:flex w-1/2 bg-blue-900">
        <LoginSideInfo />
      </div>

      {/* Right Side – Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        {children}
      </div>

    </div>
  );
}
