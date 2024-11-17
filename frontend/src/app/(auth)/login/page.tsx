"use client";
import { useAuthStore } from "@/app/stores/authStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const authenticated = useAuthStore((state) => state.authenticated);
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  useEffect(() => {
    if (authenticated && user?.token) {
      // Redirect to /
      router.push("/");
    }
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        try {
          const error = await response.json();
          setErrorMessage(error.message);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
          return;
        } catch (error) {
          console.error(error);
          throw new Error("An error occurred");
        }
      }

      const data = await response.json();
      login();
      setUser(data.user);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-74px)] bg-gray-100 py-12">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        {errorMessage && (
          <div className="bg-red-500 text-white p-2 mb-4 rounded">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;