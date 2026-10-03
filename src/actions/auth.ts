'use server'

import { prisma } from '@/src/lib/prisma'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Please fill in all fields.' }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return { error: 'Invalid email or password.' }
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return { error: 'Invalid email or password.' }
    }

    // Set HTTP cookie for session management
    const cookieStore = await cookies()
    cookieStore.set('user_role', user.role, { path: '/' })
    cookieStore.set('user_email', user.email, { path: '/' })

    return { success: true, role: user.role }
  } catch (error) {
    return { error: 'Something went wrong. Please try again.' }
  }
}

export async function signupAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string
  const role = (formData.get('role') as string) || 'student'

  if (!email || !password || !name) {
    return { error: 'All fields are required.' }
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { error: 'An account with this email already exists.' }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
    })

    return { success: true }
  } catch (error) {
    return { error: 'Failed to create account.' }
  }
}