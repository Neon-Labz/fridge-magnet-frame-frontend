'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Lock } from 'lucide-react'
import { useAuthModal } from '@/hooks/useAuthModal'
import { apiClient } from '@/lib/api'

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const { switchView } = useAuthModal()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = async (data: ResetPasswordFormData) => {
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      // In a real app, you'd get the token from URL params
      const token = 'reset-token-from-url'
      const response = await apiClient.resetPassword(token, data.password)
      
      if (response.success) {
        setSuccess(true)
        console.log('Password reset successful:', response.data)
      } else {
        setError(response.error || 'Failed to reset password')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="space-y-6">
        {/* Success Message */}
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Password Updated</h2>
          <p className="text-gray-600">
            Your password has been successfully reset. You can now login with your new password.
          </p>
        </div>

        {/* Back to Login */}
        <div className="text-center">
          <button
            onClick={() => switchView('login')}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset password</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* New Password Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            {...register('password')}
            type="password"
            placeholder="New password"
            className={`
              w-full pl-10 pr-3 py-3 border-b-2 bg-transparent
              focus:outline-none focus:border-red-600 transition-colors
              ${errors.password ? 'border-red-500' : 'border-gray-300'}
            `}
          />
        </div>
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}

        {/* Confirm Password Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            {...register('confirmPassword')}
            type="password"
            placeholder="Confirm password"
            className={`
              w-full pl-10 pr-3 py-3 border-b-2 bg-transparent
              focus:outline-none focus:border-red-600 transition-colors
              ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}
            `}
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* Update Password Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>

      {/* Back to Login */}
      <div className="text-center">
        <button
          onClick={() => switchView('login')}
          className="text-sm text-gray-600 hover:text-red-600 transition-colors"
        >
          ← Back to Login
        </button>
      </div>
    </div>
  )
}
