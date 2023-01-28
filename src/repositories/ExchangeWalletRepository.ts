import { ExchangeWallet } from '../types'
import { CreateExchangeWalletParams } from '../interfaces/CreateExchangeWalletParams'

export abstract class ExchangeWalletRepository {
    abstract create(exchangeWallet: CreateExchangeWalletParams): Promise<ExchangeWallet>

    abstract delete(id: number, userAddress: string): Promise<{ count: number }>

    abstract update(id: number, userAddress: string, exchangeWallet: CreateExchangeWalletParams): Promise<{ count: number }>

    abstract findUserExchangeWallets(userAddress: string): Promise<ExchangeWallet[]>
}
