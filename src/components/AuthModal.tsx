'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { useAuthModal, AuthModalView } from '@/hooks/useAuthModal'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import ForgotPasswordForm from './ForgotPasswordForm'
import ResetPasswordForm from './ResetPasswordForm'

export default function AuthModal() {
  const { isOpen, view, closeModal } = useAuthModal()

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, closeModal])

  if (!isOpen) return null

  const renderForm = () => {
    switch (view) {
      case 'login':
        return <LoginForm />
      case 'register':
        return <RegisterForm />
      case 'forgot-password':
        return <ForgotPasswordForm />
      case 'reset-password':
        return <ResetPasswordForm />
      default:
        return <LoginForm />
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal */}
      <div className="relative w-[546px] h-[588px] rounded-3xl bg-[#F5F5F5] shadow-xl p-[40px_48px] flex flex-col justify-center items-stretch">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center border-2 border-black rounded-full hover:bg-neutral-200 transition"
          type="button"
        >
          <X className="h-5 w-5 text-black" strokeWidth={2.5} />
        </button>
        <div className="flex-1 flex flex-col justify-center">
          {renderForm()}
        </div>
      </div>
    </div>
  );
}
