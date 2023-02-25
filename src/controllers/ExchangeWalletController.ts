import { Request, Response, NextFunction } from 'express'
import { ExchangeWalletPrisma }  from '../repositories/prisma/ExchangeWalletPrisma'
import { ExchangeWalletService } from '../services/ExchangeWalletService'

export class ExchangeWalletController {
    private readonly _exchangeWalletService: ExchangeWalletService

    constructor() {
        const exchangeWalletRepository = new ExchangeWalletPrisma()
        this._exchangeWalletService = new ExchangeWalletService(exchangeWalletRepository)
    }

    public getExchangeWallets = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(
                // @ts-ignore
                await this._exchangeWalletService.findUserExpenses(req.ssx.siwe?.data.address)
            )
        } catch (error) {
            next(error)
        }
    }

    public createExchangeWallet = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const exchangeWallet = req.body
            // @ts-ignore
            exchangeWallet.userAddress = req.ssx.siwe?.data.address

            res.json(
                await this._exchangeWalletService.createExchangeWallet(exchangeWallet)
            )
        } catch (error) {
            next(error)
        }
    }

    public deleteExchangeWallet = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(
                // @ts-ignore
                await this._exchangeWalletService.deleteExchangeWallet(Number(req.params.id), req.ssx.siwe?.data.address)
            )
        } catch (error) {
            next(error)
        }
    }

    public updateExchangeWallet = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(
                // @ts-ignore
                await this._exchangeWalletService.updateExchangeWallet(Number(req.params.id), req.ssx.siwe?.data.address, req.body)
            )
        } catch (error) {
            next(error)
        }
    }
}
