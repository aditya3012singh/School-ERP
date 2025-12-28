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

  // useEffect(() => {
  //   if (user?.role) {
  //     router.replace(`/dashboard/${user.role.toLowerCase()}`);
  //   }
  // }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      const result = await dispatch(login({ email, password }));
      // ✅ result IS the user object
      router.replace(`/dashboard/${result.payload.role.toLowerCase()}`);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl min-h-96 space-y-6 bg-white p-10 rounded-lg shadow"
    >
      <h1 className="text-2xl font-semibold text-center">Login</h1>

      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && <p>{error}</p>}
    </form>
  );
}
