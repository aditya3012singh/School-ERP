"use client";

import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    console.log("Login submitted", { email, password });
    // dispatch(loginUser({ email, password }))
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-4 bg-white p-6 rounded-lg shadow"
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

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded hover:opacity-90 transition"
      >
        Login
      </button>
    </form>
  );
}
