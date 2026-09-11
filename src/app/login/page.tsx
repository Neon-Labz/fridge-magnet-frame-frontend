"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import AuthModal from "@/components/auth/AuthModal";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("token");

    if (token) {
      router.replace("/dashboard/products");
    }
  }, [router]);

  return (
    <main className="min-h-dvh w-full bg-[#071C40]">
      <div className="min-h-dvh w-full flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8">
        <LoginForm
          redirectTo="/dashboard/products"
          tokenKey="adminToken"
          showSecondaryActions={false}
        />
      </div>

      <AuthModal />
    </main>
  );
}