import { Currency, Expense } from '../types'
import { ExpenseRepository } from '../repositories/ExpenseRepository'
import { CreateExpenseParams } from '../interfaces/CreateExpenseParams'

export class ExpenseService {
    constructor(private readonly _expenseRepository: ExpenseRepository) {}

    public batchCreateExpenses(expenses: CreateExpenseParams[]): Promise<{ count: number }> {
        return this._expenseRepository.batchCreate(expenses)
    }

    public deleteExpense(id: number, userAddress: string): Promise<{ count: number }> {
        return this._expenseRepository.delete(id, userAddress)
    }

    public findUserExpenses(userAddress: string): Promise<Expense[]> {
        return this._expenseRepository.findUserExpenses(userAddress)
    }

    public updateExpenses(
        id: number,
        userAddress: string,
        fields: CreateExpenseParams
    ): Promise<{ count: number }> {
        return this._expenseRepository.update(id, userAddress, fields)
    }
}
