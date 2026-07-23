"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useAuthModal } from "@/hooks/useAuthModal";

import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

interface AuthModalProps {
  redirectTo?: string;
}

export default function AuthModal({ redirectTo }: AuthModalProps = {}) {
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
      case "login": return <LoginForm redirectTo={redirectTo} />;
      case "register": return <RegisterForm />;
      case "forgot-password": return <ForgotPasswordForm />;
      case "reset-password": return <ResetPasswordForm />;
      default: return <LoginForm redirectTo={redirectTo} />;
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
      <div className="relative w-full max-w-[388px] max-h-[90vh] overflow-y-auto bg-[#F5F5F5] rounded-[25px] shadow-2xl px-6 sm:px-10 pb-10 flex flex-col">

        {/* ✅ iPhone SE: pt-2, iPad Air & Nest Hub Max: pt-4 மேலே */}
        <div className="flex justify-end items-center w-full pt-2 sm:pt-5 pb-0">
          <button
            onClick={handleClose}
            className="flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors w-11 h-11 sm:w-9 sm:h-9"
            type="button"
          >
            <X
              className="text-black w-9 h-9 sm:w-6 sm:h-6"
              strokeWidth={3}
            />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center pt-2">
          {renderForm()}
        </div>
      </div>
    </div>
  );
}