// import { BigNumber as EthersBigNumber } from 'ethers'
import BigNumber from 'bignumber.js';
import { oracles, connectors } from '../constants/oracles';
import { providers } from '../constants/providers';
import { notEmpty } from '../helpers';
import { Chain } from '../types/chain';
import { Oracle__factory } from '../types/contracts';

export class TokenService {
    public static async getPrice(token: string, chain: Chain): Promise<BigNumber> {
        const oracle = Oracle__factory.connect(
            oracles[chain],
            providers[chain],
        )

        const rates = (await Promise.all(connectors[chain].map(async (connector) => {
            try {
                const rate = await oracle.getRate(
                    token,
                    connector,
                    false
                )

                return rate
            } catch (error) {
                return null
            }
            
        }))).filter(notEmpty)

        return rates
            .reduce((acc, curr) => acc.plus(curr.toString()), new BigNumber(0))
            .div(rates.length)
            .div(1e18)
    }
}
