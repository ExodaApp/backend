import { Request, Response, NextFunction } from 'express'
import { UserService } from '../services/UserService'
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
    * Checks if user's membership is active for the current month
    */
    public isMembershipActive = async (req: Request, res: Response, next: NextFunction) => {
    }
}

