"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuthModal } from "@/hooks/useAuthModal";
import { apiClient } from "@/lib/api";
import { dispatchWebsiteAuthChanged } from "@/hooks/useWebsiteAuthSession";

interface LoginFormProps {
  redirectTo?: string;
  tokenKey?: string;
  showSecondaryActions?: boolean;
}

type LoginFormData = {
  email: string;
  password: string;
};

type LoginPayload = {
  token?: string;
  accessToken?: string;
  access_token?: string;
  user?: {
    role?: string;
  };
};

type LoginResponseData = LoginPayload & {
  data?: LoginPayload;
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
        const responseData = response.data as LoginResponseData | undefined;
        const payload = responseData?.data ?? responseData;

        const token =
          payload?.token ||
          payload?.accessToken ||
          payload?.access_token;

        const role = payload?.user?.role;
        const isAdmin = role === "admin";

        if (token) {
          localStorage.setItem(tokenKey, token);
          document.cookie = `${tokenKey}=${encodeURIComponent(
            token
          )}; path=/; samesite=lax`;

          if (isAdmin) {
            localStorage.setItem("adminToken", token);
            document.cookie = `adminToken=${encodeURIComponent(
              token
            )}; path=/; samesite=lax`;
          }

          dispatchWebsiteAuthChanged();

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
      className="w-full max-w-[288px] mx-auto flex flex-col gap-5 text-gray-950"
    >
      <h2 className="text-center text-[30px] font-bold leading-[38px] mb-2">
        Welcome back
      </h2>

      {/* EMAIL */}
      <div className="relative border-b-2 border-gray-700 pb-2 mb-3">
        <Mail className="absolute left-0 top-0 w-5 h-5 text-gray-950" />
        <input
          {...register("email")}
          placeholder="Email"
          className="w-full pl-8 bg-transparent outline-none text-[14px] font-semibold text-gray-950 placeholder:text-gray-400"
        />
      </div>

      {/* PASSWORD */}
      <div className="relative border-b-2 border-gray-700 pb-2">
        <Lock className="absolute left-0 top-0 w-5 h-5 text-gray-950" />
        <input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full pl-8 pr-8 bg-transparent outline-none text-[14px] font-semibold text-gray-950 placeholder:text-gray-400"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-0 top-0 w-[26px] h-[26px] cursor-pointer text-gray-950"
        >
          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>

      {showSecondaryActions && (
        <div className="text-right">
          <button
            type="button"
            onClick={() => openModal("forgot-password")}
            className="text-[14px] font-semibold text-blue-600 hover:underline"
          >
            Forgot password?
          </button>
        </div>
      )}

      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full h-[48px] bg-[#BC0101] text-white rounded-lg font-semibold hover:bg-[#a00000] disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>

      {showSecondaryActions && (
        <>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-[2px] bg-gray-300" />
            <span className="text-[12px] text-gray-500">OR</span>
            <div className="flex-1 h-[2px] bg-gray-300" />
          </div>

          <button
            type="button"
            className="flex items-center justify-center gap-2 w-full h-[48px] border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <span>Sign in with Google</span>
          </button>

          <p className="text-center text-[16px]">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => openModal("register")}
              className="text-blue-600 hover:underline"
            >
              Register
            </button>
          </p>
        </>
      )}
    </form>
  );
}