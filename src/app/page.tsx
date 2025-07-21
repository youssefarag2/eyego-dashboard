// src/app/login/page.tsx
"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/store/slices/authSlice";
import { Eye } from "lucide-react"; // A nice icon for "Eyego"

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = () => {
    // In the future, we'll add form validation and an API call here
    dispatch(login());
    router.push("/"); // Redirect to dashboard after login
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl mx-4">
        <div className="flex flex-col items-center gap-2">
          <div className="bg-blue-500 p-3 rounded-full">
            <Eye className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Eyego</h1>
          <p className="text-gray-500">Welcome! Sign in to your dashboard.</p>
        </div>

        {/* We will add form inputs here later */}
        <div className="mt-8 space-y-6">
          <button
            onClick={handleLogin}
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
          >
            Sign In
          </button>
        </div>
      </div>
    </main>
  );
}
