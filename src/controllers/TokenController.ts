import { NextFunction, Request, Response } from 'express'
import { availableChains } from '../constants/chains'
import { toGenesisChain } from '../helpers'
import { TokenService } from '../services/TokenService'
import { Chain } from '../types/chain'

export class TokenController {
    public getPrice = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { tokenAddress } = req.params
            const chain: Chain = toGenesisChain(req.query.chain?.toString())

            const price = await TokenService.getPrice(tokenAddress, chain)

            res.json({
                price: price ? price.toString() : price
            })
        } catch (error) {
            next(error)
        }
    }
}
