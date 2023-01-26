import { PrismaClient, User } from '@prisma/client'
import { UserModel } from '../schemas'

const prisma = new PrismaClient()

export class UserService {
    static async getUser(address: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { address }
        })

        return user
    }

    static async createUser(address: string): Promise<User> {
        return await prisma.user.create({ data: { address }})
    }


    static async getNonce(address: string): Promise<number | null> {
        let user = await UserService.getUser(address)

        if (!user)
            return null

        return user.nonce
    }
}
