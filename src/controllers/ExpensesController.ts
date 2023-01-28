import { Request, Response, NextFunction } from 'express'
import { ExpenseService } from '../services/ExpenseService'
import { ExpensePrisma } from '../repositories/prisma/ExpensePrisma'
import { CreateExpenseParams } from '../interfaces/CreateExpenseParams'
import { Expense } from '../types'

export class ExpenseController {
    private readonly _expenseService: ExpenseService

    constructor() {
        const expenseRepository = new ExpensePrisma()
        this._expenseService = new ExpenseService(expenseRepository)
    }
        
    /**
     * Create multiple expenses in a single transaction
     */
    public batchCreateExpenses = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const expenses = req.body.expenses.map((expense: CreateExpenseParams) => {
                expense.userAddress = req.userAddress
                return expense
            })

            res.json(
                await this._expenseService.batchCreateExpenses(expenses)
            )
        } catch (error) {
            next(error)
        }
    }

    /**
     * Find all user expenses
     */
    public getExpenses = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(
                await this._expenseService.findUserExpenses(req.userAddress)
            )
        } catch (error) {
            next(error)
        }
    }

    /**
     * Delete single expense based on expense id and userAddress
     */
    public deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(
                await this._expenseService.deleteExpense(Number(req.params.id), req.userAddress)
            )
        } catch (error) {
            next(error)
        }
    }

    /**
     * Update single expense based on id and userAddress
     */
    public updateExpense = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await this._expenseService.updateExpenses(Number(req.params.id), req.userAddress, req.body))
        } catch (error) {
            console.log(error)
            next(error)
        }

    }
}
