import { utils as ethersUtils } from 'ethers'

export class AuthService {
    constructor(
       public readonly signer: string,
       public readonly signature: string,
       public readonly nonce: number
    ) {}

    public authenticate() {
        console.log('authenticating')

        if(this._isSignatureValid())
            console.log('ready to go')
        else
            console.log('not ready to go')

    }

    private _isSignatureValid(): boolean {
        const originalSigner = ethersUtils.verifyMessage(
            this.nonce.toString(),
            this.signature,
        )

        console.log({
            originalSigner: originalSigner.toLowerCase(),
            currentSigner: this.signer.toLowerCase(),
        })

        return originalSigner.toLowerCase() === this.signer.toLowerCase()
    }
}
