import { NextFunction, Request, Response } from 'express'
import { TokenService } from '../services/TokenService'

export class TokenController {
    public static getPrice = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { tokenAddress } = req.params
        const { chain } = req.query

        const price = TokenService.getPrice(tokenAddress, chain)
    }
}
