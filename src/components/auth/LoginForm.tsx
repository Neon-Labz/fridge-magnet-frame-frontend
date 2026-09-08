"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
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

const REMEMBER_EMAIL_KEY = "rememberedLoginEmail";

export default function LoginForm({
  redirectTo,
  tokenKey = "token",
}: LoginFormProps) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { register, handleSubmit, setValue } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Load remembered email
  useEffect(() => {
    const rememberedEmail = localStorage.getItem(REMEMBER_EMAIL_KEY);

    if (rememberedEmail) {
      setValue("email", rememberedEmail);
      setRememberMe(true);
    }
  }, [setValue]);

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError("");

    try {
      // Remember email
      if (rememberMe) {
        localStorage.setItem(REMEMBER_EMAIL_KEY, data.email);
      } else {
        localStorage.removeItem(REMEMBER_EMAIL_KEY);
      }

      const response = await apiClient.login(data);

      if (response.success) {
        const payload = response.data as LoginResponseData | undefined;

        const token = payload?.token || payload?.access_token;

        const role = payload?.user?.role;
        const isAdmin = role === "admin";

        if (!token) {
          setError("Login succeeded but no auth token was returned");
          return;
        }

        /*
         * Normal website user
         */
        if (tokenKey === "token" && !isAdmin && payload?.user) {
          saveWebsiteAuthSession(token, payload.user);
        } else {
          /*
           * Admin / custom token
           */
          localStorage.setItem(tokenKey, token);

          localStorage.setItem("user", JSON.stringify(payload?.user));

          document.cookie = `${tokenKey}=${encodeURIComponent(
            token,
          )}; path=/; samesite=lax`;
        }

        /*
         * Admin token
         */
        if (isAdmin) {
          localStorage.setItem("adminToken", token);

          document.cookie = `adminToken=${encodeURIComponent(
            token,
          )}; path=/; samesite=lax`;
        }

        if (tokenKey !== "token" || isAdmin) {
          dispatchWebsiteAuthChanged();
        }

        /*
         * Redirect
         */
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
        setError(response.error || "Login failed");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-[420px]">
      {/* Login Card */}
      <div
        className="
          w-full
          bg-white
          rounded-3xl
          shadow-2xl
          px-6
          py-7
          sm:px-10
          sm:py-9
          md:px-11
          md:py-10
        "
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col"
        >
          {/* Logo */}
          {/* <div className="flex justify-center mb-5 sm:mb-6">
            <Image
              src="/logo.png"
              alt="Logo"
              width={150}
              height={45}
              className="
                w-[125px]
                sm:w-[150px]
                h-auto
                object-contain
              "
              priority
            />
          </div> */}

          {/* Heading */}
          <div className="text-center mb-7 sm:mb-8">
            <h2
              className="
                text-[26px]
                sm:text-[30px]
                font-black
                text-[#071C40]
                leading-tight
              "
            >
              Admin Panel
            </h2>

            <p
              className="
                mt-2
                text-sm
                sm:text-[15px]
                text-gray-500
              "
            >
              Sign in to continue to your account
            </p>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="
                block
                text-sm
                font-semibold
                text-[#071C40]
                mb-2
              "
            >
              Email address
            </label>

            <div
              className="
                flex
                items-center
                gap-3
                bg-gray-50
                border
                border-gray-200
                rounded-xl
                px-4
                h-[48px]
                sm:h-[52px]
                transition-all
                focus-within:border-[#123D87]
                focus-within:ring-2
                focus-within:ring-[#123D87]/15
              "
            >
              <Mail size={18} className="text-gray-400 shrink-0" />

              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                {...register("email")}
                placeholder="Enter your email"
                className="
                  w-full
                  bg-transparent
                  outline-none
                  text-sm
                  text-gray-900
                  placeholder:text-gray-400
                "
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="
                block
                text-sm
                font-semibold
                text-[#071C40]
                mb-2
              "
            >
              Password
            </label>

            <div
              className="
                flex
                items-center
                gap-3
                bg-gray-50
                border
                border-gray-200
                rounded-xl
                px-4
                h-[48px]
                sm:h-[52px]
                transition-all
                focus-within:border-[#123D87]
                focus-within:ring-2
                focus-within:ring-[#123D87]/15
              "
            >
              <Lock size={18} className="text-gray-400 shrink-0" />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                {...register("password")}
                placeholder="Enter your password"
                className="
                  w-full
                  bg-transparent
                  outline-none
                  text-sm
                  text-gray-900
                  placeholder:text-gray-400
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="
                  shrink-0
                  text-gray-400
                  hover:text-[#123D87]
                  transition-colors
                  cursor-pointer
                "
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center mb-6 px-1">
            <label
              htmlFor="rememberMe"
              className="
                flex
                items-center
                gap-2.5
                cursor-pointer
                select-none
              "
            >
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="
                  w-4
                  h-4
                  rounded
                  border-gray-300
                  cursor-pointer
                  accent-[#123D87]
                "
              />

              <span className="text-sm text-gray-600">Remember me</span>
            </label>
          </div>

          {/* Error */}
          {error && (
            <div
              className="
                mb-5
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
              "
            >
              <p
                className="
                  text-[13px]
                  sm:text-sm
                  font-medium
                  text-[#D83223]
                "
              >
                {error}
              </p>
            </div>
          )}

          {/* Sign In */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              h-[48px]
              sm:h-[52px]
              bg-[#D83223]
              hover:bg-[#b9271b]
              active:scale-[0.99]
              text-white
              rounded-xl
              font-bold
              text-sm
              sm:text-[15px]
              transition-all
              shadow-md
              hover:shadow-lg
              disabled:opacity-60
              disabled:cursor-not-allowed
              flex
              items-center
              justify-center
              gap-2
            "
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
