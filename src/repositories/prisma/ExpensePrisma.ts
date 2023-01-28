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

  public findUserExpenses(userAddress: string): Promise<Expense[]> {
    return this._prisma.expense.findMany({
      where: {
        userAddress
      }
    })
  }

  public update(id: number, userAddress: string, fields: CreateExpenseParams): Promise<{ count: number }> {
    return this._prisma.expense.updateMany({
      where: {
        id,
        userAddress,
      },
      data: fields,
    })
  }

  public async delete(id: number, userAddress: string): Promise<{ count: number }> {
    return this._prisma.expense.deleteMany({
      where: {
        id,
        userAddress,
      }
    })
  }
}
