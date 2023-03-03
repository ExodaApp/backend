import BigNumber from 'bignumber.js'
import { TokenService } from '../../src/services/TokenService'
import { Chains } from '../../src/types/chain'

describe('TokenService', () => {
    it('should return the price in USD of BUSD on BNB Chain', async () => {
        const tokenAddress = '0xe9e7cea3dedca5984780bafc599bd69add087d56'
        const chain = Chains.BSC

        const tokenPrice = await TokenService.getPrice(tokenAddress, chain)

        console.log({ tokenPrice: tokenPrice.toNumber() })

        expect(tokenPrice).toBeInstanceOf(BigNumber)
        expect(tokenPrice.toNumber()).toBeLessThan(1.10)
        expect(tokenPrice.toNumber()).toBeGreaterThan(0.98)
    })
})
