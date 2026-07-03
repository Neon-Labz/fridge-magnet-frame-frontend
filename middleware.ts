import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('adminToken')?.value

  // If user has a valid admin token and visits /dashboard, send them to products
  if (pathname === '/dashboard') {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = token ? '/dashboard/products' : '/login'
    return NextResponse.redirect(redirectUrl)
  }

  // If already logged in and trying to access the old dashboard login, redirect to products
  if (pathname === '/dashboard/login') {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = token ? '/dashboard/products' : '/login'
    return NextResponse.redirect(redirectUrl)
  }

  // Protect all other /dashboard/* routes — redirect to main login if unauthenticated
  if (!token) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/login'
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
