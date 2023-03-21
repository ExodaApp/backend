import BigNumber from 'bignumber.js';
import { oracles, connectors } from '../constants/oracles';
import { providers } from '../constants/providers';
import { notEmpty } from '../helpers';
import { Chain } from '../types/chain';
import { Oracle__factory, Erc20__factory } from '../types/contracts';

const TEN = new BigNumber(10)

export class TokenService {
    public static async getPrice(tokenAddress: string, chain: Chain): Promise<BigNumber | null> {
        const token = Erc20__factory.connect(
            tokenAddress,
            providers[chain],
        )
        const oracle = Oracle__factory.connect(
            oracles[chain],
            providers[chain],
        )

        const rates = (await Promise.all(connectors[chain].map(async connectorAddress => {
            try {
                const connector = Erc20__factory.connect(
                    connectorAddress,
                    providers[chain],
                )

                const [rate, tokenBasisPoints, connectorBasisPoints] = await Promise.all([
                    oracle.getRate(token.address, connector.address, false).then(r => new BigNumber(r.toString())),
                    token.decimals().then(d => TEN.pow(d)),
                    connector.decimals().then(d => TEN.pow(d)),
                ])

                // Converting all rates to 1e18 base
                return rate
                    .times(tokenBasisPoints)
                    .div(connectorBasisPoints)
            } catch (error) {
                return null
            }
        }))).filter(notEmpty)

        if (!rates.length)
            return null

        return rates
            .reduce((acc, curr) => acc.plus(curr.toString()), new BigNumber(0))
            .div(rates.length)
            .div(1e18)
    }
}
