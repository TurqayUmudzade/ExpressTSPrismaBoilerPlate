import bcrypt from 'bcrypt'
import prisma from 'src/utils/db'

const findUserByUsername = (username: string) => {
    return prisma.user.findUnique({
        where: {
            username,
        },
    });
}

const createUserByUsernameAndPassword = (user: any) => {
    user.password = bcrypt.hashSync(user.password, 12);
    return prisma.user.create({
        data: user,
    });
}

const findUserById = (id: any) => {
    return prisma.user.findUnique({
        where: {
            id,
        },
    });
}

export {
    findUserByUsername,
    findUserById,
    createUserByUsernameAndPassword
};