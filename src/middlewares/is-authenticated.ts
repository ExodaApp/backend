import { Request, Response, NextFunction } from 'express' 

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    console.log({ verified: req.ssx.verified, signingKey: process.env.SIGNING_KEY })

    if (!req.ssx.verified) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    next()
}

