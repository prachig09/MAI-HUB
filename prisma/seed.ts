import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('password123', 10)

  // Seed demo student
  await prisma.user.upsert({
    where: { email: 'student@gbs.ac.in' },
    update: {},
    create: {
      email: 'student@gbs.ac.in',
      name: 'Rahul Sharma',
      password,
      role: 'student',
    },
  })

  // Seed demo faculty
  await prisma.user.upsert({
    where: { email: 'faculty@gbs.ac.in' },
    update: {},
    create: {
      email: 'faculty@gbs.ac.in',
      name: 'Dr. Priya Nair',
      password,
      role: 'faculty',
    },
  })

  console.log('Database seeded with demo users!')
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())