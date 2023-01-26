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
    * Create user if address doesn't exist on DB
    */
    public createUser = async (
        req: Request,
        res: Response<{ user: User }>,
        next: NextFunction
    ) => {
        try {
            res.json({
                user: await this._userService.createUser(req.body.address)
            })
        } catch (error) {
            next(error)
        }
    }

    /**
    * Receives user wallet address and sends back the current user nonce
    */
    public nonce = async (req: Request, res: Response<{ nonce: number | null }>) => {
        console.log({ this: this })

        res.json({
            nonce: await this._userService.getNonce(req.params.address)
        })
    }

    public authenticate = async (
        req: Request,
        res: Response<{ jwt: string }>,
        next: NextFunction
    ) => {
        try {
            const { address, signature } = req.body
            const nonce = await this._userService.getNonce(address)

            if (nonce === null)
                throw new Error('User does not exist')

            new AuthService(address, signature, nonce).authenticate()
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

