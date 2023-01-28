import { Router } from 'express'
import * as z from 'zod'
import { UserController } from '../controllers/UserController'
import { ExpenseController } from '../controllers/ExpensesController'
import { ExchangeWalletController } from '../controllers/ExchangeWalletController'
import { validateRequest } from '../middlewares/validate-request'
import { isAuthenticated } from '../middlewares/is-authenticated'
import { Currency } from '../types'

const routes = Router()

const userController = new UserController()
const expenseController = new ExpenseController()
const exchangeWalletController = new ExchangeWalletController()

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
routes.get('/expense', isAuthenticated, expenseController.getExpenses)
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
routes.put(
    '/expense/:id',
    [
        validateRequest({
            params: z.object({
                id: z.coerce.number(),
            }),
            body: z.object({
                name: z.string(),
                dueDay: z.number(),
                value: z.number(),
                currency: z.enum(["USD", "BRL", "EUR"]),
            })
        }),
        isAuthenticated,
    ],
    expenseController.updateExpense,
)

// EXCHANGE WALLETS
routes.get('/exchange-wallet', isAuthenticated, exchangeWalletController.getExchangeWallets)
routes.post(
    '/exchange-wallet',
    [
        validateRequest({
            body: z.object({
                name: z.string(),
                address: z.string().length(42, 'Address is not a valid ethereum userAddress'),
            })
        }),
        isAuthenticated,
    ],
    exchangeWalletController.createExchangeWallet,
)
routes.put(
    '/exchange-wallet/:id',
    [
        validateRequest({
            params: z.object({
                id: z.coerce.number(),
            }),
            body: z.object({
                name: z.string(),
                address: z.string().length(42, 'Address is not a valid ethereum userAddress'),
            })
        }),
        isAuthenticated,
    ],
    exchangeWalletController.updateExchangeWallet,
)
routes.delete(
    '/exchange-wallet/:id',
    [
        validateRequest({
            params: z.object({
                id: z.coerce.number(),
            }),
        }),
        isAuthenticated,
    ],
    exchangeWalletController.deleteExchangeWallet,
)

// TRANSACTIONS

export default routes
