import {
    User as PrismaUser,
    Expense as PrismaExpense,
    ExchangeWallet as PrismaExchangeWallet,
} from '@prisma/client'

export type User = PrismaUser
export type Expense = PrismaExpense
export type ExchangeWallet = PrismaExchangeWallet

export enum Currency {
    USD = 'USD',
    BRL = 'BRL',
    ARS = 'ARS',
    EUR = 'EUR',
    CAD = 'CAD',
    JPY = 'JPY',
}
