import { ExchangeWalletRepository } from '../repositories/ExchangeWalletRepository'
import { CreateExchangeWalletParams } from '../interfaces/CreateExchangeWalletParams'
import { ExchangeWallet } from '../types'

export class ExchangeWalletService {
    constructor(private readonly _exchangeWalletRepository: ExchangeWalletRepository) {}

    public createExchangeWallet(exchangeWallet: CreateExchangeWalletParams): Promise<ExchangeWallet> {
        return this._exchangeWalletRepository.create(exchangeWallet)
    }

    public deleteExchangeWallet(id: number, userAddress: string): Promise<{ count: number }> {
        return this._exchangeWalletRepository.delete(id, userAddress)
    }

    public updateExchangeWallet(
        id: number,
        userAddress: string,
        exchangeWallet: CreateExchangeWalletParams
    ): Promise<{ count: number }> {
        return this._exchangeWalletRepository.update(id, userAddress, exchangeWallet)
    }

    public findUserExpenses(userAddress: string) {
        return this._exchangeWalletRepository.findUserExchangeWallets(userAddress)
    }
}
