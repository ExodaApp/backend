import { Request , Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
    /**
    * Receives a signed message from user and returns JWT
    */
    static async authenticate(req: Request, res: Response<{ jwt: string} >) {
        res.json({ jwt: '' })
    }

    /**
    * Receives user wallet address and sends back the current user nonce
    */
    static async nonce(req: Request, res: Response<{ nonce: number }>) {
        res.json({
            nonce: await UserService.getNonce(req.params.address)
        })
    }

    /**
    * Checks if user's membership is active for the current month
    */
    static async isMembershipActive(req: Request, res: Response) {
    }
}

