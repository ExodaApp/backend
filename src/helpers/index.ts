import { availableChains } from "../constants/chains";
import { Chain } from "../types/chain";

export const notEmpty = <TValue>(value: TValue | null | undefined): value is TValue => {
    return value !== null && value !== undefined;
}

export const toGenesisChain = (chainId: number | string | undefined): Chain => {
    if (!chainId)
        throw new Error('toGenesisChain: chain id not provided')

    chainId = +chainId

    for (const chain of availableChains) {
        if (chain === chainId)
            return chainId as Chain
    }

    throw new Error(`toGenesisChain: ${ chainId } is not available on Genesis SDK.`)
}


