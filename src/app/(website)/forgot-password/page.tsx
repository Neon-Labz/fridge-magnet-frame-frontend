'use client'

import React from 'react'
import { useAuthModal } from '@/hooks/useAuthModal'
import AuthModal from '@/components/auth/AuthModal'

export default function ForgotPasswordPage() {
  const { openModal } = useAuthModal()

  React.useEffect(() => {
    openModal('forgot-password')
  }, [openModal])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AuthModal />
    </div>
  )
}
