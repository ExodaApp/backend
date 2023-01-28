import { Response } from 'express'

export class Http {
    constructor(private readonly _res: Response) {}

    unauthorized(message: string) {
        this._res.status(403).json({ message })
    }
}
