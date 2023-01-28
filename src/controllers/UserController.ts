import { Request, Response, NextFunction } from 'express'
import { UserService } from '../services/UserService'
import { AuthService } from '../services/AuthService'
import { UserPrisma } from '../repositories/prisma/UserPrisma'
import { User } from '../types'

export class UserController {
    private readonly _userService: UserService

    constructor() {
        const userRepository = new UserPrisma()
        this._userService = new UserService(userRepository)
    }

    /**
    * Create user if userAddress doesn't exist on DB
    */
    public createUser = async (
        req: Request,
        res: Response<User>,
        next: NextFunction
    ) => {
        try {
            res.json(
                await this._userService.createUser(req.body.userAddress)
            )
        } catch (error) {
            next(error)
        }
    }

    /**
    * Receives user wallet userAddress and sends back the current user nonce
    */
    public nonce = async (req: Request, res: Response<{ nonce: number | null }>) => {
        res.json({
            nonce: await this._userService.getNonce(req.params.userAddress)
        })
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
            const nonce = await this._userService.getNonce(userAddress)

            if (nonce === null)
                throw new Error('User does not exist')

            const jwt = new AuthService(userAddress, signature, nonce).authenticate()

            await this._userService.increaseNonce(userAddress)

            res.json({ jwt })
        } catch (error) {
            next(error)
        }
    }

    /**
    * Checks if user's membership is active for the current month
    */
    public isMembershipActive = async (req: Request, res: Response, next: NextFunction) => {
    }
}

