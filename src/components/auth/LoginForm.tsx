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

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

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
          localStorage.setItem(tokenKey, token);
          localStorage.setItem("user", JSON.stringify(payload?.user));
          document.cookie = `${tokenKey}=${encodeURIComponent(token)}; path=/; samesite=lax`;

          if (isAdmin) {
            localStorage.setItem("adminToken", token);
            document.cookie = `adminToken=${encodeURIComponent(token)}; path=/; samesite=lax`;
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
      className="w-full max-w-[288px] mx-auto flex flex-col sm:gap-8 lg:gap-6  text-gray-950"
    >
      <h2 className="text-center text-[30px] font-bold leading-[38px] mb-1">
        Login
      </h2>

      {/* EMAIL */}
      <div className="relative border-b-2 border-gray-700 py-2 pl-5">
        <Mail className="absolute left-0 top-1/2 -translate-y-1/2  w-5 h-5 text-gray-950" />
        <input
          {...register("email")}
          placeholder="Email"
          className="w-full pl-8 bg-transparent outline-none text-[14px] font-semibold text-gray-950 placeholder:text-gray-400"
        />
      </div>

      {/* PASSWORD */}
      <div className="relative border-b-2 border-gray-700 py-2 pl-5">
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
          className="absolute right-0 top-3 w-[26px] h-[26px] cursor-pointer text-gray-950"
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
            disabled
            className="flex items-center justify-center gap-2 w-full h-[48px] border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <GoogleIcon />
            <span>Sign in with Google</span>
          </button>

          <p className="text-center text-[14px]">
            Don't have an account?{" "}
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