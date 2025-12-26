"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";
import { AUTH_ROUTES } from "@/lib/routes";

export const useProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace(AUTH_ROUTES.LOGIN);
    }
  }, [isAuthenticated, loading, router]);
};



// Usage:

// "use client";
// import { useProtectedRoute } from "@/hooks/useProtectedRoute";

// export default function AdminPage() {
//   useProtectedRoute();
//   return <div>Admin Dashboard</div>;
// }
