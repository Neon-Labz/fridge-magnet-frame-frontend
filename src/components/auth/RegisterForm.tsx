
'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Lock, User } from 'lucide-react'
import { useAuthModal } from '@/hooks/useAuthModal'
import { apiClient } from '@/lib/api'

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type RegisterFormData = z.infer<typeof registerSchema>

// GoogleIcon: same as login
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

function InputField({
  type = 'text',
  placeholder = '',
  icon,
  error = '',
  register,
  name = '',
  autoComplete = '',
}: {
  type?: string
  placeholder?: string
  icon: React.ReactNode
  error?: string
  register: any
  name: string
  autoComplete?: string
}) {
  return (
    <div className="mb-5 w-full">
      <div className={`relative`}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          {...register(name)}
          type={type}
          name={name}
          autoComplete={autoComplete}
          placeholder={placeholder}
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#111827',
            borderBottom: error ? '2px solid #ef4444' : '2px solid #374151',
            paddingLeft: '40px',
          }}
          className={`w-full pr-3 py-3 bg-transparent focus:outline-none focus:border-gray-900 transition-colors ${error ? '' : ''}`}
        />
      </div>
      {error && <p className="text-xs text-red-600 mt-1 ml-1">{error}</p>}
    </div>
  )
}

export default function RegisterForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { switchView } = useAuthModal()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true)
    setError('')
    try {
      const response = await apiClient.register(data)
      if (response.success) {
        // Handle successful registration
        // You might want to switch to login view or close modal here
      } else {
        setError(response.error || 'Registration failed')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  // All icons dark, use lucide-react for consistency
  const userIcon = <User className="h-5 w-5" style={{ color: '#111827' }} />
  const emailIcon = <Mail className="h-5 w-5" style={{ color: '#111827' }} />
  const lockIcon = <Lock className="h-5 w-5" style={{ color: '#111827' }} />

  return (
    <div className="space-y-5">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <InputField
          name="fullName"
          type="text"
          placeholder="Full Name"
          icon={userIcon}
          error={errors.fullName?.message}
          register={register}
          autoComplete="name"
        />
        <InputField
          name="email"
          type="email"
          placeholder="Email"
          icon={emailIcon}
          error={errors.email?.message}
          register={register}
          autoComplete="email"
        />
        <InputField
          name="password"
          type="password"
          placeholder="Password"
          icon={lockIcon}
          error={errors.password?.message}
          register={register}
          autoComplete="new-password"
        />

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* Register Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-4 px-4 rounded-xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" style={{ borderColor: '#E5E7EB' }} />
        </div>
        <div className="relative flex justify-center" style={{ fontSize: '12px', color: '#6B7280' }}>
          <span className="px-2 bg-white">OR</span>
        </div>
      </div>

      {/* Google Sign-In */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '8px' }}>
        <button
          type="button"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
          className="hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          <div style={{ width: '20px', height: '20px', objectFit: 'contain', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <GoogleIcon />
          </div>
          <span style={{ fontSize: '14px', fontWeight: 500, color: '#111827' }}>
            Sign in with Google
          </span>
        </button>
      </div>

      {/* Footer */}
      <div className="text-center mt-1">
        <span style={{ fontSize: '13px', color: '#6B7280' }}>
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => switchView('login')}
            style={{ fontSize: '13px', color: '#2563EB', fontWeight: 500 }}
            className="hover:underline transition-colors"
          >
            Sign in
          </button>
        </span>
      </div>
    </div>
  )
}
