import { Currency } from '@prisma/client'

export interface CreateExpenseParams {
    name: string,
    dueDay: number,
    value: number,
    userAddress: string,
    currency: Currency,
}
