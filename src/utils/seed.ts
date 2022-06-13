import { PrismaClient } from '@prisma/client'
import users from '@src/models/user/user.seeds'
import { createUserByUsernameAndPassword } from '@src/models/user/user.services'


const prisma = new PrismaClient()

async function main() {
    await prisma.user.deleteMany({})x


    for (const user of users) {
        await createUserByUsernameAndPassword(user)
    }



}

main()
    .catch((e: Error) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })