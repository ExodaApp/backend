import { PrismaClient } from '@prisma/client'
import { ExchangeWallet } from '../../types'
import { ExchangeWalletRepository } from '../ExchangeWalletRepository'
import { CreateExchangeWalletParams } from '../../interfaces/CreateExchangeWalletParams'

export class ExchangeWalletPrisma implements ExchangeWalletRepository {
  private readonly _prisma: PrismaClient

  constructor() {
    this._prisma = new PrismaClient()
  }

  public create(exchangeWallet: CreateExchangeWalletParams): Promise<ExchangeWallet> {
    return this._prisma.exchangeWallet.create({
      data: exchangeWallet
    })
  }

  public delete(id: number, userAddress: string): Promise<{ count: number }> {
    return this._prisma.exchangeWallet.deleteMany({
      where: {
        id,
        userAddress,
      }
    })
  }

  public update(id: number, userAddress: string, exchangeWallet: CreateExchangeWalletParams): Promise<{ count: number }> {
    return this._prisma.exchangeWallet.updateMany({
      where: {
        id,
        userAddress,
      },
      data: exchangeWallet,
    })
  }

  public findUserExchangeWallets(userAddress: string): Promise<ExchangeWallet[]> {
    return this._prisma.exchangeWallet.findMany({
      where: {
        userAddress,
      }
    })
  }
}
