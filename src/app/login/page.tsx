"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/store/slices/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = () => {
    dispatch(login());
    router.push("/"); // Redirect to dashboard after login
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome</h1>
        <p className="mb-6 text-gray-600">Please log in to continue</p>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Log In
        </button>
      </div>
    </main>
  );
}
