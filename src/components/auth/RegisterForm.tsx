"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, User } from "lucide-react";
import { useAuthModal } from "@/hooks/useAuthModal";
import { apiClient } from "@/lib/api";
import { Eye, EyeOff } from "lucide-react";

const registerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

type RegisterFormData = z.infer<typeof registerSchema>;

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

export default function RegisterForm() {
  const { switchView } = useAuthModal();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      await apiClient.register(data);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full h-[48px] pl-10 pr-3 border-b-2 border-gray-700 bg-transparent outline-none text-[14px] font-semibold";

  return (
    <div className="w-full max-w-[288px] mx-auto flex flex-col gap-4">
      {/* TITLE */}
      <h2 className="text-center text-[30px] font-bold leading-[30px]">
        Create Account
      </h2>

      {/* FULL NAME */}
      <div className="relative">
        <User className="absolute left-0 top-3 w-5 h-5" />
        <input
          {...register("fullName")}
          placeholder="Full Name"
          className={inputClass}
        />
      </div>

      {/* EMAIL */}
      <div className="relative">
        <Mail className="absolute left-0 top-3 w-5 h-5" />
        <input
          {...register("email")}
          placeholder="Email"
          className={inputClass}
        />
      </div>

      {/* PASSWORD */}
      <div className="relative">
        <Lock className="absolute left-0 top-3 w-5 h-5" />

        <input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full h-[48px] pl-10 pr-10 border-b-2 border-gray-700 bg-transparent outline-none text-[14px] font-semibold"
        />

        {/* EYE TOGGLE */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-0 top-3 w-[26px] h-[26px] flex items-center justify-center cursor-pointer"
        >
          {showPassword ? (
            <Eye className="w-5 h-5" />
          ) : (
            <EyeOff className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* REGISTER BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="w-full h-[48px] bg-[#BC0101] text-white rounded-lg font-semibold hover:bg-[#a00000] cursor-pointer"
      >
        {loading ? "Creating..." : "Register"}
      </button>

      {/* OR LINE */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-[2px] bg-gray-300" />
        <span className="text-[12px] text-gray-500">OR</span>
        <div className="flex-1 h-[2px] bg-gray-300" />
      </div>

      {/* GOOGLE */}
      <button
        type="button"
        className="flex items-center justify-center gap-2 cursor-pointer w-full h-[48px] border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <GoogleIcon />
        <span className="text-[16px] font-normal">Sign up with Google</span>
      </button>

      {/* FOOTER */}
      <p className="text-center text-[16px]">
        Already have an account?{" "}
        <button
          onClick={() => switchView("login")}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}