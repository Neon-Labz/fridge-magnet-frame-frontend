import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('adminToken')?.value

  if (pathname === '/dashboard') {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = token ? '/dashboard/products' : '/dashboard/login'
    return NextResponse.redirect(redirectUrl)
  }

  if (pathname === '/dashboard/login') {
    if (token) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/dashboard/products'
      return NextResponse.redirect(redirectUrl)
    }
    return NextResponse.next()
  }

  if (!token) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/dashboard/login'
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
