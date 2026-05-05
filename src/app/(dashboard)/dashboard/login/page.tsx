'use client'

import LoginForm from '@/components/auth/LoginForm'

export default function DashboardLoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
        <LoginForm redirectTo="/dashboard/products" tokenKey="adminToken" />
      </div>
    </main>
  )
}
