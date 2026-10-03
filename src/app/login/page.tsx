'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginAction } from '@/src/actions/auth'
import { Page, ROUTE_MAP } from '@/src/types/types'

interface LoginPageProps {
  onLogin?: (role: 'student' | 'faculty') => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const router = useRouter()
  const navigate = (p: Page) => router.push(ROUTE_MAP[p])

  const [tab, setTab] = useState<'student' | 'faculty'>('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please enter your credentials.')
      return
    }
    setError('')
    setLoading(true)
    
const formData = new FormData()
  formData.append('email', email)
  formData.append('password', password)

  try {
    const result = await loginAction(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    if (result?.success) {
      const userRole = result.role as 'student' | 'faculty'
      if (onLogin) onLogin(userRole)

      if (userRole === 'faculty') {
        router.push('/faculty/dashboard')
      } else {
        router.push('/student/dashboard')
      }
      router.refresh()
    }
  } catch (err) {
    setError('An unexpected error occurred.')
    setLoading(false)
  }

  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center px-4 py-12">
      {/* Brand header */}
      <div className="text-center mb-8">
        <button onClick={() => navigate('home')} className="inline-flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-[#1e3a8a] flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">GBS</span>
          </div>
          <div>
            <p className="font-bold text-slate-900 text-base">MSc AI Portal</p>
            <p className="text-slate-500 text-xs">Goa Business School · DCST</p>
          </div>
        </button>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <h1 className="text-xl font-bold text-slate-900 text-center mb-1">Sign In</h1>
          <p className="text-sm text-slate-500 text-center mb-6">Sign in to access your academic dashboard.</p>

          {/* Role tabs */}
          <div className="flex rounded-lg border border-slate-200 overflow-hidden mb-6">
            <button
              onClick={() => setTab('student')}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${tab === 'student' ? 'bg-[#1e3a8a] text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Student Login
            </button>
            <button
              onClick={() => setTab('faculty')}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${tab === 'faculty' ? 'bg-[#1e3a8a] text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Faculty Login
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {tab === 'student' ? 'Student ID / University Email' : 'Faculty ID / University Email'}
              </label>
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={tab === 'student' ? 'e.g. AI2026001 or student@gbs.ac.in' : 'e.g. faculty@gbs.ac.in'}
                className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <button type="button" className="text-xs text-[#2563eb] hover:underline">Forgot Password?</button>
              </div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 text-xs text-red-700">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-semibold rounded-lg text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing In…
                </>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Use your GBS university credentials to sign in.
              For access issues, contact{' '}
              <a href="mailto:it@gbs.ac.in" className="text-[#2563eb] hover:underline">it@gbs.ac.in</a>
            </p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('home')}
            className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            ← Visitor? Continue to Public Website
          </button>
        </div>

        {/* Demo hint */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-center">
          <p className="text-xs text-blue-700">
            <span className="font-semibold">Demo:</span> Enter any credentials and click Sign In to explore the portal as {tab === 'student' ? 'a student' : 'faculty'}.
          </p>
        </div>
      </div>
    </div>
  )
}
