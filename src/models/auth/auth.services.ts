import { hashToken } from '@src/utils/jwt';
import prisma from 'src/utils/db'

const addRefreshTokenToWhitelist = ({ jti, refreshToken, userId }: any) => {
    return prisma.refreshToken.create({
        data: {
            id: jti,
            hashedToken: hashToken(refreshToken),
            userId
        },
    });
}


const findRefreshTokenById = (id: any) => {
    return prisma.refreshToken.findUnique({
        where: {
            id,
        },
    });
}

const deleteRefreshToken = (id: any) => {
    return prisma.refreshToken.update({
        where: {
            id,
        },
        data: {
            revoked: true
        }
    });
}

const revokeTokens = (userId: any) => {
    return prisma.refreshToken.updateMany({
        where: {
            userId
        },
        data: {
            revoked: true
        }
    });
}

export {
    addRefreshTokenToWhitelist,
    findRefreshTokenById,
    deleteRefreshToken,
    revokeTokens
};