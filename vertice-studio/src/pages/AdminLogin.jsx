import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

const inputClass = hasError =>
  `w-full border-b bg-transparent py-2 text-sm outline-none transition-colors placeholder-gray-300 ${
    hasError
      ? 'border-red-400 focus:border-red-500'
      : 'border-gray-200 focus:border-brand-dark'
  }`

const AdminLogin = () => {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [authError, setAuthError] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) })

  const onSubmit = async ({ email, password }) => {
    setAuthError(null)
    const { error } = await signIn(email, password)
    if (error) {
      setAuthError('Invalid credentials. Please try again.')
    } else {
      navigate('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-3 text-center">
          Vertice Studio
        </p>
        <h1 className="font-heading text-3xl font-medium text-brand-dark text-center mb-12">
          Admin Access
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@verticestudio.com"
              {...register('email')}
              className={inputClass(errors.email)}
            />
            {errors.email && (
              <p className="mt-1.5 text-[11px] text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register('password')}
              className={inputClass(errors.password)}
            />
            {errors.password && (
              <p className="mt-1.5 text-[11px] text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {authError && (
            <p className="text-[11px] text-red-400 tracking-wide">
              {authError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-dark text-white py-3.5 text-[11px] tracking-[0.25em] uppercase hover:opacity-80 transition-opacity disabled:opacity-50 mt-2"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
