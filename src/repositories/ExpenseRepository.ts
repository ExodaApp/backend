import { Expense, Currency  } from '../types'
import { CreateExpenseParams } from '../interfaces/CreateExpenseParams'

export abstract class ExpenseRepository {
    abstract batchCreate(expenses: CreateExpenseParams[]): Promise<{ count: number }>

    abstract delete(id: number, userAddress: string): Promise<{ count: number }>

    abstract update(id: number, userAddress: string, fields: CreateExpenseParams): Promise<{ count: number }>

    abstract findUserExpenses(userAddress: string): Promise<Expense[]>
}
