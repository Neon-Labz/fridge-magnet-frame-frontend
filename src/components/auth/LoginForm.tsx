"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuthModal } from "@/hooks/useAuthModal";
import { apiClient } from "@/lib/api";
import {
  dispatchWebsiteAuthChanged,
  saveWebsiteAuthSession,
} from "@/hooks/useWebsiteAuthSession";
import Image from "next/image";

interface LoginFormProps {
  redirectTo?: string;
  tokenKey?: string;
  showSecondaryActions?: boolean;
}

type LoginFormData = {
  email: string;
  password: string;
};

type LoginResponseData = {
  token?: string;
  access_token?: string;
  user?: {
    id?: string;
    fullName?: string;
    email?: string;
    role?: string;
  };
};


export default function LoginForm({
  redirectTo,
  tokenKey = "token",
  showSecondaryActions = true,
}: LoginFormProps) {
  const { openModal } = useAuthModal();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError("");

    try {
      const response = await apiClient.login(data);

      if (response.success) {
        const payload = response.data as LoginResponseData | undefined;
        const token = payload?.token || payload?.access_token;
        const role = payload?.user?.role;
        const isAdmin = role === "admin";

        if (token) {
          if (tokenKey === "token" && !isAdmin && payload?.user) {
            saveWebsiteAuthSession(token, payload.user);
          } else {
            localStorage.setItem(tokenKey, token);
            localStorage.setItem("user", JSON.stringify(payload?.user));
            document.cookie = `${tokenKey}=${encodeURIComponent(token)}; path=/; samesite=lax`;
          }

          if (isAdmin) {
            localStorage.setItem("adminToken", token);
            document.cookie = `adminToken=${encodeURIComponent(token)}; path=/; samesite=lax`;
          }

          if (tokenKey !== "token" || isAdmin) {
            dispatchWebsiteAuthChanged();
          }

          const finalRedirect =
            redirectTo ||
            (isAdmin
              ? "/dashboard/products"
              : tokenKey === "token"
              ? "/"
              : undefined);

          if (finalRedirect) {
            if (finalRedirect.startsWith("/dashboard")) {
              window.location.href = finalRedirect;
            } else {
              router.replace(finalRedirect);
            }
          }
        } else {
          setError("Login succeeded but no auth token was returned");
        }
      } else {
        setError(response.error || "Login failed");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[288px] mx-auto flex flex-col gap-[-20px] sm:gap-5 text-gray-950"
    >
      <Image src="/logo.png" alt="Logo" width={150} height={10} className="mx-auto" />
      <h2 className="text-center text-[24px] sm:text-[28px] font-bold leading-tight sm:leading-[38px]">
        Login
      </h2>

      <div className="relative border-b-2 border-gray-700 py-0.5 sm:py-2 pl-5">
        <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-950" />
        <input
          {...register("email")}
          placeholder="Email"
          className="w-full pl-8 bg-transparent outline-none text-[14px] font-semibold text-gray-950 placeholder:text-gray-400"
        />
      </div>

      <div className="relative border-b-2 border-gray-700 py-0.5 sm:py-2 pl-5">
        <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-950" />
        <input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full pl-8 pr-8 bg-transparent outline-none text-[14px] font-semibold text-gray-950 placeholder:text-gray-400"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[26px] h-[26px] cursor-pointer text-gray-950"
        >
          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>

      {/* {showSecondaryActions && (
        <div className="text-right -mt-1 sm:mt-0">
          <button
            type="button"
            onClick={() => openModal("forgot-password")}
            className="text-[12px] sm:text-[14px] font-semibold text-blue-600 hover:underline"
          >
            Forgot password?
          </button>
        </div>
      )} */}

      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-1.5 sm:py-2 text-[13px] sm:text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full h-[36px] sm:h-[48px] bg-[#BC0101] text-white rounded-lg font-semibold hover:bg-[#a00000] disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>

    </form>
  );
}