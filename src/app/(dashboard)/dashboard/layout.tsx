'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import LayoutWrapper from '@/components/layout/LayoutWrapper'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  const isLoginPage = pathname === '/dashboard/login'

  useEffect(() => {
    if (isLoginPage) {
      return
    }

    const token = localStorage.getItem('adminToken')

    // Read the stored user and confirm the admin role.
    let role: string | undefined
    try {
      const rawUser = localStorage.getItem('user')
      if (rawUser) {
        role = JSON.parse(rawUser)?.role
      }
    } catch {
      role = undefined
    }

    // Only an authenticated admin may access the dashboard.
    if (!token || role !== 'admin') {
      localStorage.removeItem('adminToken')
      document.cookie = 'adminToken=; path=/; max-age=0; samesite=lax'
      router.replace('/dashboard/login')
      return
    }

    // Mirror the token into a cookie so middleware/SSR can see it.
    const hasCookie = document.cookie
      .split('; ')
      .some((cookie) => cookie.startsWith('adminToken='))

    if (!hasCookie) {
      document.cookie = `adminToken=${token}; path=/; samesite=lax`
    }

    setAuthorized(true)
  }, [pathname, router, isLoginPage])

  if (isLoginPage) {
    return <>{children}</>
  }

  // Avoid flashing protected content before the admin check resolves.
  if (!authorized) {
    return null
  }

  return <LayoutWrapper>{children}</LayoutWrapper>
}
