import { Request, Response, Router } from 'express'
import * as z from 'zod'
import { UserController } from '../controllers/UserController'
import { ExpenseController } from '../controllers/ExpensesController'
import { ExchangeWalletController } from '../controllers/ExchangeWalletController'
import { validateRequest } from '../middlewares/validate-request'
import { isAuthenticated } from '../middlewares/is-authenticated'
import { TokenController } from '../controllers/TokenController'

const routes = Router()

const tokenController = new TokenController()
const userController = new UserController()
const expenseController = new ExpenseController()
const exchangeWalletController = new ExchangeWalletController()

// HEALTH-CHECK
routes.get('/health-check', (_: Request, res: Response) => res.status(200).send())

// USER
routes.post(
    '/user',
    validateRequest({
        body: z.object({
            userAddress: z.string().length(42, 'Address is not a valid ethereum userAddress'),
        })
    }),
    userController.createUser,
)
routes.get('/user/:userAddress', userController.getUser)
routes.get('/user/membership', userController.isMembershipActive)

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
                    currency: z.enum(["USD", "BRL", "EUR", "ARS", "CAD"]),
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
                currency: z.enum(["USD", "BRL", "EUR", "ARS", "CAD"]),
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

// TOKENS
// TODO: supported chain middleware
routes.get(
    '/token/:tokenAddress/price',
    [
        validateRequest({
            params: z.object({
                tokenAddress: z.string().length(42, 'Token addresss is not a valid ethereum address'),
            }),
            query: z.object({
                chain: z.coerce.number()
            })
        })
    ],
    tokenController.getPrice
)

// routes.get('/token/:id/price', (req, res) => res.json({ hello: req.params }))

export default routes
