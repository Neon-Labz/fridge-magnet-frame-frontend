'use client'

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuthModal } from '@/hooks/useAuthModal'
import AuthModal from '@/components/auth/AuthModal'

function LoginPageContent() {
  const { openModal } = useAuthModal()
  const searchParams = useSearchParams()

  const rawRedirect = searchParams.get('redirect')
  // Only allow internal, same-origin paths to avoid open-redirect issues.
  const redirectTo =
    rawRedirect && rawRedirect.startsWith('/') && !rawRedirect.startsWith('//')
      ? rawRedirect
      : undefined

  React.useEffect(() => {
    openModal('login')
  }, [openModal])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AuthModal redirectTo={redirectTo} />
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  )
}
