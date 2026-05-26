"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useAuthModal } from "@/hooks/useAuthModal";

import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function AuthModal() {
  const router = useRouter();
  const { isOpen, view, closeModal } = useAuthModal();

  const handleClose = useCallback(() => {
    closeModal();
    router.push("/");
  }, [closeModal, router]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [handleClose, isOpen]);

  if (!isOpen) return null;

  const renderForm = () => {
    switch (view) {
      case "login":
        return <LoginForm />;
      case "register":
        return <RegisterForm />;
      case "forgot-password":
        return <ForgotPasswordForm />;
      case "reset-password":
        return <ResetPasswordForm />;
      default:
        return <LoginForm />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-[388px] h-[550px] mt-[-28px] bg-[#F5F5F5] rounded-[25px] shadow-2xl px-10 py-10 flex flex-col">
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-[21px] right-[25px] w-8 h-8 flex items-center justify-center"
          type="button"
        >
          <X className="w-8 h-8 text-black" strokeWidth={2} />
        </button>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center">
          {renderForm()}
        </div>
      </div>
    </div>
  );
}