"use client";

import { login } from "@/store/api/auth.thunk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const { user, loading, error } = useSelector((state) => state.auth);

  // ✅ Redirect ONLY after successful login
  useEffect(() => {
    if (user?.role) {
      router.replace(`/dashboard/${user.role.toLowerCase()}`);
    }
  }, [user, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit}
      className="w-full max-w-3xl min-h-96 space-y-6 bg-white p-10 rounded-lg shadow"
    >
      <h1 className="text-2xl font-semibold text-center">Login</h1>

      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <button disabled={loading} className="border p-2 rounded-2xl bg-black text-white">
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}