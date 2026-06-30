"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useAuthModal } from "@/hooks/useAuthModal";
import { apiClient } from "@/lib/api";
import { useSearchParams } from "next/navigation";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { switchView } = useAuthModal();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const token = searchParams.get("token");
      if (!token) {
        setError("This reset link is invalid or incomplete");
        return;
      }

      const response = await apiClient.resetPassword(
        token,
        data.password
      );

      if (response.success) {
        setSuccess(true);
      } else {
        setError(response.error || "Something went wrong");
      }
    } catch {
      setError("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-[288px] mx-auto flex flex-col gap-6 text-center py-6">
        <div>
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            ✔
          </div>

          <h2 className="text-[24px] font-bold mb-2">
            Password Updated
          </h2>

          <p className="text-[14px] text-gray-600">
            Your password has been reset successfully.
          </p>
        </div>

        <button
          onClick={() => switchView("login")}
          className="w-full h-[48px] bg-[#BC0101] text-white rounded-lg font-semibold hover:bg-[#a00000] cursor-pointer"
        >
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[288px] mx-auto flex flex-col gap-6 py-4">
      {/* TITLE */}
      <div className="text-center">
        <h2 className="text-[28px] font-bold">
          Reset Password
        </h2>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        {/* NEW PASSWORD */}
        <div className="relative border-b-2 border-gray-700 pb-2">
          <Lock className="absolute left-0 top-0 w-5 h-5" />

          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            className="w-full pl-8 pr-8 bg-transparent outline-none text-[14px] font-semibold"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-0 w-[26px] h-[26px] flex items-center justify-center cursor-pointer"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="text-[12px] text-red-600">
            {errors.password.message}
          </p>
        )}

        {/* CONFIRM PASSWORD */}
        <div className="relative border-b-2 border-gray-700 pb-2">
          <Lock className="absolute left-0 top-0 w-5 h-5" />

          <input
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full pl-8 pr-8 bg-transparent outline-none text-[14px] font-semibold"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            className="absolute right-0 top-0 w-[26px] h-[26px] flex items-center justify-center cursor-pointer"
          >
            {showConfirmPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="text-[12px] text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}

        {/* ERROR */}
        {error && (
          <p className="text-[12px] text-red-600">
            {error}
          </p>
        )}

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-[48px] bg-[#BC0101] text-white rounded-lg font-semibold hover:bg-[#a00000] cursor-pointer disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>

      {/* BACK */}
      <button
        onClick={() => switchView("login")}
        className="text-[14px] text-blue-600 hover:underline cursor-pointer text-center"
      >
        ← Back to Login
      </button>
    </div>
  );
}
