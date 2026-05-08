'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock } from 'lucide-react'
import { useAuthModal } from '@/hooks/useAuthModal'
import { apiClient } from '@/lib/api'

const styles = `
  .login-input {
    font-size: 14px;
    font-weight: 600;
    color: #111827;
    border-bottom: 2px solid #374151;
  }
  .login-forgot-btn {
    font-size: 13px;
    color: #2563EB;
  }
  .login-divider {
    display: flex;
    align-items: center;
    margin: 16px 0;
  }
  .login-divider-line {
    flex: 1;
    border-top: 1px solid #E5E7EB;
  }
  .login-divider-text {
    padding: 0 8px;
    font-size: 12px;
    color: #6B7280;
    background: white;
  }
  .login-google-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
  }
  .login-google-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
  }
  .login-google-icon {
    width: 20px;
    height: 20px;
    object-fit: contain;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login-google-text {
    font-size: 14px;
    font-weight: 500;
    color: #111827;
  }
  .login-footer {
    font-size: 13px;
    color: #6B7280;
  }
  .login-footer-link {
    font-size: 13px;
    color: #2563EB;
    font-weight: 500;
  }
`

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

type LoginResponseData = {
  token?: string
  accessToken?: string
  data?: {
    token?: string
  }
}

type LoginFormProps = {
  redirectTo?: string
  tokenKey?: string
}

export default function LoginForm({ redirectTo, tokenKey = 'token' }: LoginFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { switchView } = useAuthModal()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    setError('')

    try {
      const response = await apiClient.login(data)
      
      if (response.success) {
        const responseData = response.data as LoginResponseData | undefined
        const token =
          responseData?.token ||
          responseData?.accessToken ||
          responseData?.data?.token

        if (token) {
          setTimeout(() => {
            localStorage.setItem(tokenKey, token)
            document.cookie = `${tokenKey}=${token}; path=/; samesite=lax`

            if (redirectTo) {
              router.replace(redirectTo)
            }
          }, 0)
        } else if (redirectTo) {
          router.replace(redirectTo)
        }
      } else {
        setError(response.error || 'Login failed')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{styles}</style>
      <div className="space-y-5">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Email Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5" style={{ color: '#111827' }} />
            </div>
            <input
              {...register('email')}
              type="email"
              placeholder="Email"
              className={`
                login-input
                w-full pl-10 pr-3 py-3 bg-transparent
                focus:outline-none focus:border-gray-900 transition-colors
                ${errors.email ? 'border-red-500' : ''}
              `}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}

          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5" style={{ color: '#111827' }} />
            </div>
            <input
              {...register('password')}
              type="password"
              placeholder="Password"
              className={`
                login-input
                w-full pl-10 pr-3 py-3 bg-transparent
                focus:outline-none focus:border-gray-900 transition-colors
                ${errors.password ? 'border-red-500' : ''}
              `}
            />
          </div>
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}

          {/* Forgot Password Link */}
          <div className="text-right mt-1">
            <button
              type="button"
              onClick={() => switchView('forgot-password')}
              className="login-forgot-btn hover:underline transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-4 px-4 rounded-xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* Divider */}
        <div className="login-divider">
          <div className="login-divider-line" />
          <div className="login-divider-text">OR</div>
          <div className="login-divider-line" />
        </div>

        {/* Google Login Button */}
        <div className="login-google-container">
          <button
            type="button"
            className="login-google-btn hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            <div className="login-google-icon">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            </div>
            <span className="login-google-text">
              Sign in with Google
            </span>
          </button>
        </div>

        {/* Register Link */}
        <div className="text-center mt-1">
          <span className="login-footer">
            Don&apos;t have an account?{' '}
            <button
              onClick={() => switchView('register')}
              className="login-footer-link hover:underline transition-colors"
            >
              Register
            </button>
          </span>
        </div>
      </div>
    </>
  )
}
