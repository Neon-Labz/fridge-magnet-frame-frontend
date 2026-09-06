'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '@/components/auth/LoginForm'
import AuthModal from '@/components/auth/AuthModal'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('token')
    if (token) {
      router.replace('/dashboard/products')
    }
  }, [router])

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <LoginForm
          redirectTo="/dashboard/products"
          tokenKey="adminToken"
          showSecondaryActions={false}
        />
      </div>
      <AuthModal />
    </main>
  )
}
