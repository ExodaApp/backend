import express from 'express'
import cors from 'cors'
import { SSXServer, SSXExpressMiddleware } from "@spruceid/ssx-server"

import routes from './routes'
import { errorHandler } from '../middlewares/error-handlers'

export class App {
    public express: express.Application

    constructor() {
        this.express = express()

        this.middlewares()
        this.ssx()
        this.routes()
    }

    private middlewares() {
        this.express.use(cors({
            credentials: true,
            origin: 'http://localhost:5173' 
        }))
        this.express.use(errorHandler)
        this.express.use(express.json())
    }

    private routes() {
        this.express.use(routes)
    }

    private ssx() {
        console.log({
            signingKey: process.env.SIGNING_KEY,
            apiKey: process.env.SSX_KEY,
        })

        const ssx = new SSXServer({
            signingKey: process.env.SIGNING_KEY,
            providers: {
                metrics: {
                    service: 'ssx',
                    apiKey: process.env.SSX_KEY || ''
                },
            },
        })
        
        this.express.use(
            SSXExpressMiddleware(
                ssx,
                {
                    nonce: '/nonce',
                    login: '/login',
                    logout: '/logout',
                }
            )
        )
    }
}
