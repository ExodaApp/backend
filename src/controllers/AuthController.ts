import { Request, Response, NextFunction } from 'express'
import { AuthService } from '../services/AuthService'
import { UserService } from '../services/UserService'
import { UserPrisma } from '../repositories/prisma/UserPrisma'

export class AuthController {
    private readonly _userService: UserService

    constructor() {
        const userRepository = new UserPrisma()
        this._userService = new UserService(userRepository)
    }

    /**
    * Verify user's signature and return a JWT if valid
    */
    public authenticate = async (
        req: Request,
        res: Response<{ jwt: string }>,
        next: NextFunction
    ) => {
        try {
            const { userAddress, signature } = req.body

            // TODO: change this for a random nonce and remove nonce from user schema
            const nonce = await this._userService.getNonce(userAddress)

            if (nonce === null)
                throw new Error('User does not exist')

            const jwt = new AuthService(userAddress, signature, nonce).authenticate()

            res.json({ jwt })
        } catch (error) {
            next(error)
        }
    }

}
