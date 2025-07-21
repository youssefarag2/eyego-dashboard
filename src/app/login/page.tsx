// src/app/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/store/slices/authSlice";
import { RootState, AppDispatch } from "@/store/store";
import { Eye, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Get auth state from Redux store
  const { status, error, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );

  const [email, setEmail] = useState("admin@eyego.com");
  const [password, setPassword] = useState("password");

  // Redirect if user is already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-slate-900">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl mx-4"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="bg-blue-500 p-3 rounded-full">
            <Eye className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Eyego</h1>
          <p className="text-gray-500">Sign in to your dashboard.</p>
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>

        {/* Display error from Redux state */}
        {error && (
          <p className="text-sm text-center text-red-600 bg-red-100 p-2 rounded-lg">
            {error}
          </p>
        )}

        <div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Signing In..." : "Sign In"}
          </button>
        </div>
        <p className="text-xs text-center text-gray-500">
          Use email: <span className="font-medium">admin@eyego.com</span> &
          password: <span className="font-medium">password</span>
        </p>
      </form>
    </main>
  );
}
