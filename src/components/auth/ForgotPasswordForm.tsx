"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail } from "lucide-react";
import { useAuthModal } from "@/hooks/useAuthModal";
import { apiClient } from "@/lib/api";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { switchView } = useAuthModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await apiClient.forgotPassword(data);

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
      <div className="w-full max-w-[288px] mx-auto flex flex-col gap-6 text-center">
        <div>
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            ✔
          </div>

          <h2 className="text-[24px] font-bold mb-2">Check Your Email</h2>

          <p className="text-[14px] text-gray-600">
            Reset link sent successfully.
          </p>
        </div>

        <button
          onClick={() => switchView("login")}
          className="text-[14px] text-blue-600 hover:underline cursor-pointer"
        >
          ← Back to Login
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[288px] mx-auto flex flex-col gap-4">
      {/* TITLE */}
      <div className="text-center">
        <h2 className="text-[28px] font-bold">Forgot Password</h2>

        <p className="text-[13px] text-gray-500 mt-2 mb-4">
          Enter your email to receive reset link
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        {/* EMAIL */}
        <div className="relative border-b-2 border-gray-700 pb-2 m-2b-3">
          <Mail className="absolute left-0 top-0 w-5 h-5" />

          <input
            {...register("email")}
            placeholder="Email"
            className="w-full pl-8 bg-transparent outline-none text-[14px] font-semibold"
          />
        </div>

        {errors.email && (
          <p className="text-[12px] text-red-600">{errors.email.message}</p>
        )}

        {error && <p className="text-[12px] text-red-600">{error}</p>}

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-[48px] bg-[#BC0101] text-white rounded-lg font-semibold hover:bg-[#a00000] cursor-pointer disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {/* BACK */}
      <button
        onClick={() => switchView("login")}
        className="text-[14px] pt-3 text-blue-600 hover:underline cursor-pointer text-center"
      >
        ← Back to Login
      </button>
    </div>
  );
}
