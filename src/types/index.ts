import { User as PrismaUser } from '@prisma/client'

export type User = PrismaUser

export enum Currency {
    USD = "USD",
    BRL = "BRL",
    EUR = "EUR",
}
