"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) router.replace("/auth/login");

  router.replace(`/dashboard/${user.role.toLowerCase()}`);
  return null;
}
