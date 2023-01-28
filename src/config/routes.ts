import { Router } from 'express'
import * as z from 'zod'
import { UserController } from '../controllers/UserController'
import { ExpenseController } from '../controllers/ExpensesController'
import { validateRequest } from '../middlewares/validate-request'
import { isAuthenticated } from '../middlewares/is-authenticated'
import { Currency } from '../types'

const routes = Router()

const userController = new UserController()
const expenseController = new ExpenseController()

// USER
routes.post(
    '/user/authenticate',
    validateRequest({
        body: z.object({
            userAddress: z.string().length(42, 'Address is not a valid ethereum userAddress'),
            signature: z.string(),
        })
    }),
    userController.authenticate,
)

routes.post(
    '/user',
    validateRequest({
        body: z.object({
            userAddress: z.string().length(42, 'Address is not a valid ethereum userAddress'),
        })
    }),
    userController.createUser,
)

routes.get(
    '/user/:userAddress/nonce',
    validateRequest({
        params: z.object({
            userAddress: z.string().length(42, 'Address is not a valid ethereum userAddress'),
        })
    }),
    userController.nonce
)

routes.get('/user/membership', new UserController().isMembershipActive)

// EXPENSES
routes.post(
    '/expense',
    [
        validateRequest({
            body: z.object({
                expenses: z.object({
                    name: z.string(),
                    dueDay: z.number(),
                    value: z.number(),
                    currency: z.enum(["USD", "BRL", "EUR"]),
                }).array()
            })
        }),
        isAuthenticated,
    ],
    expenseController.batchCreateExpenses,
)

routes.get('/expense', isAuthenticated, expenseController.getExpenses)

routes.delete(
    '/expense/:id',
    [
        validateRequest({
            params: z.object({
                id: z.coerce.number(),
            }),
        }),
        isAuthenticated,
    ],
    expenseController.deleteExpense,
)

// TRANSACTIONS

// EXCHANGE WALLETS
//
export default routes
