'use client'

import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'
import { Page, UserRole, ROUTE_MAP } from '@/src/types/types'

interface AppShellProps {
  children: React.ReactNode
}

const NO_FOOTER_ROUTES = ['/login', '/student/dashboard', '/faculty/dashboard']

export default function AppShell({ children }: AppShellProps) {
  const router = useRouter()
  const pathname = usePathname()

  const [userRole, setUserRole] = useState<UserRole>('student')

  // Map App Router pathnames back to the 'Page' type expected by Header/Footer
  const currentPage: Page = (pathname.replace('/', '') as Page) || 'home'

  const navigate = (p: Page) => {
    if (ROUTE_MAP[p]) {
      router.push(ROUTE_MAP[p])
    }
  }

  const handleLogout = () => {
    setUserRole('visitor')
    router.push('/login')
  }

  const notifCount = userRole !== 'visitor' ? 3 : 0
  const isLoginPage = pathname === '/login'
  const hideFooter = NO_FOOTER_ROUTES.includes(pathname)

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      {!isLoginPage && (
        <Header
          page={currentPage}
          navigate={navigate}
          userRole={userRole}
          onLogout={handleLogout}
          notifCount={notifCount}
        />
      )}

      <main className="flex-1">{children}</main>

      {!hideFooter && <Footer navigate={navigate} />}
    </div>
  )
}