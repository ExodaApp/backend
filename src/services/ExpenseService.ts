import { Currency, Expense } from '../types'
import { ExpenseRepository } from '../repositories/ExpenseRepository'
import { CreateExpenseParams } from '../interfaces/CreateExpenseParams'
import { CurrencyService } from './CurrencyService'
import BigNumber from 'bignumber.js'

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

    public async totalExpensesUsdValue(userAddress: string): Promise<string> {
        const expenses = await this.findUserExpenses(userAddress)

        const totalUsdValue = await expenses.reduce(async (acc: Promise<BigNumber>, curr) => {
            const accumulator = await acc

            const expenseValue: BigNumber = new BigNumber(curr.value) // TODO: whats going on here
            const currencyExchangeRate = await CurrencyService.getUsdExchangeRate(curr.currency as Currency) // TODO: remove as Currency

            return accumulator.plus(expenseValue.times(currencyExchangeRate))
        }, Promise.resolve(new BigNumber(0)))


        return totalUsdValue.toString()
    }
}
