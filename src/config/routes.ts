import { Router } from 'express'
import * as z from 'zod'
import { UserController } from '../controllers/UserController'
import { validateRequest } from '../middlewares/validate-request'

const routes = Router()

// USER
routes.post(
    '/user/authenticate',
    validateRequest({
        body: z.object({
            address: z.string().length(42, 'Address is not a valid ethereum address'),
            signedMessage: z.string(),
        })
    }),
    UserController.authenticate,
)

routes.post(
    '/user',
    validateRequest({
        body: z.object({
            address: z.string().length(42, 'Address is not a valid ethereum address'),
        })
    })
)

routes.get(
    '/user/:address/nonce',
    validateRequest({
        params: z.object({
            address: z.string().length(42, 'Address is not a valid ethereum address'),
        })
    }),
    UserController.nonce,
)

routes.get('/user/membership', UserController.isMembershipActive)

// EXPENSES

// TRANSACTIONS

// EXCHANGE WALLETS
//
export default routes
