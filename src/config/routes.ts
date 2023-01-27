import { Router } from 'express'
import * as z from 'zod'
import { UserController } from '../controllers/UserController'
import { validateRequest } from '../middlewares/validate-request'

const routes = Router()

const userController = new UserController()

// USER
routes.post(
    '/user/authenticate',
    validateRequest({
        body: z.object({
            address: z.string().length(42, 'Address is not a valid ethereum address'),
            signature: z.string(),
        })
    }),
    userController.authenticate,
)

routes.post(
    '/user',
    validateRequest({
        body: z.object({
            address: z.string().length(42, 'Address is not a valid ethereum address'),
        })
    }),
    userController.createUser,
)

routes.get(
    '/user/:address/nonce',
    validateRequest({
        params: z.object({
            address: z.string().length(42, 'Address is not a valid ethereum address'),
        })
    }),
    userController.nonce
)

routes.get('/user/membership', new UserController().isMembershipActive)

// EXPENSES
routes.post('/expenses',
)

// TRANSACTIONS

// EXCHANGE WALLETS
//
export default routes
