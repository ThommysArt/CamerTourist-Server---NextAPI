import { PrismaClient } from '@prisma/client'

const db = () => {
    const prisma = new PrismaClient()
    return prisma
}
// use `prisma` in your application to read and write data in your DB

export default db;