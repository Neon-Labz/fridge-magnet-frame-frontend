import { NextResponse } from 'next/server'

type LoginBody = {
  email?: string
  password?: string
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as LoginBody

  if (!body.email || !body.password) {
    return NextResponse.json(
      { message: 'Email and password are required' },
      { status: 400 }
    )
  }

  return NextResponse.json({
    token: 'mock-admin-token',
    user: {
      email: body.email,
      role: 'admin',
    },
  })
}

export function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  )
}