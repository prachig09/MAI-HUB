'use client'
import { useState } from 'react'
import type { Page, UserRole } from '@/src/types/types'

interface HeaderProps {
  page: Page
  navigate: (p: Page) => void
  userRole: UserRole
  onLogout: () => void
  notifCount: number
}

const navLinks: { label: string; page: Page | null }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Timetable', page: 'timetable' },
  { label: 'Faculty', page: 'faculty-directory' },
  { label: 'Events', page: 'events' },
  { label: 'Research', page: 'faculty-directory' },
  { label: 'Community', page: 'community' },
  { label: 'Notices', page: 'notices' },
]

export default function Header({ page, navigate, userRole, onLogout, notifCount }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Top identity bar */}
      <div className="bg-[#1e3a8a] text-white">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            {/* Logo placeholder */}
            <div className="w-9 h-9 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-white">GBS</span>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-wide">Goa Business School</span>
                <span className="text-white/40 hidden sm:inline">|</span>
                <span className="text-white/80 text-xs hidden sm:inline">Dept. of Computer Science & Technology</span>
              </div>
              <div className="text-blue-200 text-xs font-medium tracking-wider">MSc Artificial Intelligence Portal</div>
            </div>
          </button>

          <div className="flex items-center gap-3">
            {userRole !== 'visitor' && (
              <>
                <button
                  onClick={() => navigate('notifications')}
                  className="relative p-1.5 text-white/80 hover:text-white transition-colors"
                  title="Notifications"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {notifCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {notifCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => navigate('search')}
                  className="p-1.5 text-white/80 hover:text-white transition-colors"
                  title="Search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </>
            )}
            {userRole !== 'visitor' ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(userRole === 'student' ? 'student-profile' : 'faculty-directory')}
                  className="flex items-center gap-1.5 text-xs text-white/90 hover:text-white transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-400/50 border border-white/30 flex items-center justify-center">
                    <span className="text-xs font-semibold">{userRole === 'student' ? 'RS' : 'DP'}</span>
                  </div>
                  <span className="hidden sm:inline font-medium">
                    {userRole === 'student' ? 'Rahul Sharma' : 'Dr. Priya Nair'}
                  </span>
                </button>
                <button
                  onClick={onLogout}
                  className="text-xs px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded border border-white/20 text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('login')}
                className="text-xs px-4 py-1.5 bg-white text-[#1e3a8a] font-semibold rounded hover:bg-blue-50 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Desktop nav */}
            <nav className="hidden md:flex items-center">
              {navLinks.map(({ label, page: p }) => (
                <button
                  key={label}
                  onClick={() => p && navigate(p)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    page === p
                      ? 'border-[#2563eb] text-[#2563eb]'
                      : 'border-transparent text-slate-600 hover:text-[#2563eb] hover:border-blue-200'
                  }`}
                >
                  {label}
                </button>
              ))}
              {userRole !== 'visitor' && (
                <>
                  <button
                    onClick={() => navigate(userRole === 'student' ? 'student-dashboard' : 'faculty-dashboard')}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      page === 'student-dashboard' || page === 'faculty-dashboard'
                        ? 'border-[#2563eb] text-[#2563eb]'
                        : 'border-transparent text-slate-600 hover:text-[#2563eb]'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => navigate('calendar')}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      page === 'calendar'
                        ? 'border-[#2563eb] text-[#2563eb]'
                        : 'border-transparent text-slate-600 hover:text-[#2563eb]'
                    }`}
                  >
                    Calendar
                  </button>
                  {userRole === 'faculty' && (
                    <button
                      onClick={() => navigate('workload')}
                      className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                        page === 'workload'
                          ? 'border-[#2563eb] text-[#2563eb]'
                          : 'border-transparent text-slate-600 hover:text-[#2563eb]'
                      }`}
                    >
                      Workload
                    </button>
                  )}
                </>
              )}
            </nav>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-slate-600"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>

            <button
              onClick={() => navigate('search')}
              className="hidden md:flex items-center gap-2 text-sm text-slate-500 hover:text-[#2563eb] py-3 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search</span>
            </button>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden border-t border-slate-100 py-2 pb-3">
              {navLinks.map(({ label, page: p }) => (
                <button
                  key={label}
                  onClick={() => { p && navigate(p); setMenuOpen(false) }}
                  className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#2563eb]"
                >
                  {label}
                </button>
              ))}
              {userRole !== 'visitor' && (
                <>
                  <button onClick={() => { navigate(userRole === 'student' ? 'student-dashboard' : 'faculty-dashboard'); setMenuOpen(false) }}
                    className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#2563eb]">
                    Dashboard
                  </button>
                  <button onClick={() => { navigate('calendar'); setMenuOpen(false) }}
                    className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#2563eb]">
                    Calendar
                  </button>
                  {userRole === 'faculty' && (
                    <button onClick={() => { navigate('workload'); setMenuOpen(false) }}
                      className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#2563eb]">
                      Workload Analytics
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
