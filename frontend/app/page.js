"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function HomePage() {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role) {
      router.replace(`/dashboard/${user.role.toLowerCase()}`);
    } else {
      router.replace("/auth/login");
    }
  }, [user, router]);

  return null;
}
