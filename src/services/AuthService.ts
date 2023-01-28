import { utils as ethersUtils } from 'ethers'
import jwt from 'jsonwebtoken'
import { User } from '../types'

interface TokenData {
    userAddress: string
}

export class AuthService {
    constructor(
       public readonly signer: string,
       public readonly signature: string,
       public readonly nonce: number
    ) {}

    public authenticate(): string {
        if(this._isSignatureValid()) 
            return this._generateJWT()
        else
            throw new Error('Invalid signature')
    }

    public static getDataFromToken(token: string): string {
        if (!process.env.JWT_SECRET)
            throw Error('JWT secret key not set')

        const { userAddress } = jwt.verify(token, process.env.JWT_SECRET) as TokenData

        return userAddress
    }

    public static isTokenValid(userAddress: string, token: string): boolean {
        if (!process.env.JWT_SECRET)
            throw Error('JWT secret key not set')

        const signer = jwt.verify(token, process.env.JWT_SECRET)

        return signer === userAddress
    }

    private _generateJWT(): string {
        console.log('genrating jwt')

        if (!process.env.JWT_SECRET)
            throw Error('JWT secret key not set')

        return jwt.sign({ userAddress: this.signer }, process.env.JWT_SECRET)
    }

    private _isSignatureValid(): boolean {
        const originalSigner = ethersUtils.verifyMessage(
            this.nonce.toString(),
            this.signature,
        )

        return originalSigner.toLowerCase() === this.signer.toLowerCase()
    }
}
