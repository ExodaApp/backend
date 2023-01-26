import express from 'express'
import cors from 'cors'

import routes from './routes'
import { errorHandler, notFound } from '../middlewares/error-handlers'

export class App {
    public express: express.Application

    constructor() {
        this.express = express()

        this.routes()
        this.middlewares()
    }

    private middlewares() {
        this.express.use(express.json())
        this.express.use(cors())
        this.express.use(errorHandler)
        this.express.use(notFound)
    }

    private routes() {
        this.express.use(routes)
    }
}
