import { Request, Response, NextFunction } from 'express'
import { ExpenseService } from '../services/ExpenseService'
import { ExpensePrisma } from '../repositories/prisma/ExpensePrisma'
import { CreateExpenseParams } from '../interfaces/CreateExpenseParams'

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
                if (!req.ssx.userId)
                    throw new Error('ExpenseController: used address not found')

                expense.userAddress = req.ssx.userId
                return expense
            })

            res.json(
                await this._expenseService.batchCreateExpenses(expenses)
            )
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * Find all user expenses
     */
    public getExpenses = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.ssx.userId)
                throw new Error('ExpenseController: used address not found')

            res.json(
                await this._expenseService.findUserExpenses(req.ssx.userId)
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
            if (!req.ssx.userId)
                throw new Error('ExpenseController: used address not found')

            res.json(
                await this._expenseService.deleteExpense(Number(req.params.id), req.ssx.userId)
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
            if (!req.ssx.userId)
                throw new Error('ExpenseController: used address not found')

            res.json(await this._expenseService.updateExpenses(Number(req.params.id), req.ssx.userId, req.body))
        } catch (error) {
            next(error)
        }

    }
}
