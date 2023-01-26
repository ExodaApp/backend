import express from 'express'
import cors from 'cors'

import routes from './routes'
import { errorHandler } from '../middlewares/error-handlers'

export class App {
    public express: express.Application

    constructor() {
        this.express = express()

        this.middlewares()
        this.routes()
    }

    private middlewares() {
        this.express.use(cors())
        this.express.use(errorHandler)
        this.express.use(express.json())
    }

    private routes() {
        this.express.use(routes)
    }
}
