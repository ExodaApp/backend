import { PrismaClient, Currency } from '@prisma/client'
import { ExpenseRepository } from '../ExpenseRepository'
import { Expense } from '../../types'
import { CreateExpenseParams } from '../../interfaces/CreateExpenseParams'

export class ExpensePrisma implements ExpenseRepository {
  private readonly _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  public batchCreate(expenses: CreateExpenseParams[]): Promise<{ count: number }> {
    return this._prisma.expense.createMany({
      data: expenses,
      skipDuplicates: true,
    })
  }

  public async findUserExpenses(userAddress: string): Promise<Expense[]> {
    return await this._prisma.expense.findMany({
      where: {
        userAddress
      }
    })
  }

  public async delete(id: number, userAddress: string): Promise<{ count: number }> {
    return await this._prisma.expense.deleteMany({
      where: {
        id,
        userAddress,
      }
    })
  }
}
