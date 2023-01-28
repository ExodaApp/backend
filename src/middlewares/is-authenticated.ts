import { Request, Response, NextFunction } from 'express' 
import { AuthService } from '../services/AuthService'
import { Http } from '../utils/Http'

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const http = new Http(res)
    const { address } = req.params
    const token = req.headers.authorization?.split(' ')[1]

    if (!token)
        http.unauthorized('JWT not provided')
    else {
        req.userAddress = AuthService.getDataFromToken(token)
        next()
    }
}

