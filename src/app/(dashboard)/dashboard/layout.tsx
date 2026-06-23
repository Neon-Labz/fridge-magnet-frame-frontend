'use client'

import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import LayoutWrapper from '@/components/layout/LayoutWrapper'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (pathname === '/dashboard/login') {
      return
    }

    const token =
      localStorage.getItem('adminToken') || localStorage.getItem('token')

    if (!token) {
      router.replace('/dashboard/login')
      return
    }

    const hasCookie = document.cookie
      .split('; ')
      .some((cookie) => cookie.startsWith('adminToken='))

    if (!hasCookie) {
      document.cookie = `adminToken=${token}; path=/; samesite=lax`
    }
  }, [pathname, router])

  if (pathname === '/dashboard/login') {
    return <>{children}</>
  }

  return <LayoutWrapper>{children}</LayoutWrapper>
}
