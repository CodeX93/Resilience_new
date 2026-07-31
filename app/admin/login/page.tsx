"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCms } from "@/components/cms/CmsProvider";

export default function AdminLoginPage() {
  const { login, isAdmin } = useCms();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // If already logged in, redirect to home page
  React.useEffect(() => {
    if (isAdmin) {
      router.push("/");
    }
  }, [isAdmin, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login(password);
      if (result.success) {
        router.push("/");
      } else {
        setError(result.error || "Authentication failed");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-[#faf2ef] px-4">
      <div className="w-full max-w-md rounded-3xl border border-green-200 bg-gradient-to-b from-[#fffcf7] to-[#e8e2d8] p-8 shadow-ds4">
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 bg-mint-100 text-green-800 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
            Control Panel Portal
          </span>
          <h1 className="font-heading text-3xl font-bold text-green-950">CMS Admin Login</h1>
          <p className="text-sm text-green-700 mt-2">
            Enter the password to access inline editing features.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-green-800 mb-2">
              Admin Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-green-200 bg-white/70 p-3 text-base focus:outline-none focus:ring-2 focus:ring-mint-500 focus:bg-white"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700 font-semibold">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-green-800 py-3 text-base font-semibold text-white hover:bg-green-900 transition-colors shadow-md disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Access Control Panel"}
          </button>
        </form>
      </div>
    </div>
  );
}
