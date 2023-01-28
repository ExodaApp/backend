import { User as PrismaUser, Expense as PrismaExpense } from '@prisma/client'

export type User = PrismaUser
export type Expense = PrismaExpense

export enum Currency {
    USD = "USD",
    BRL = "BRL",
    EUR = "EUR",
}
