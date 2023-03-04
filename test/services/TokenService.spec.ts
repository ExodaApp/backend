import BigNumber from 'bignumber.js'
import { TokenService } from '../../src/services/TokenService'
import { Chains } from '../../src/types/chain'

describe('TokenService', () => {
    it('should return the price in USD of BUSD on BNB Chain', async () => {
        const tokenAddress = '0xe9e7cea3dedca5984780bafc599bd69add087d56'
        const chain = Chains.BSC

        const tokenPrice = await TokenService.getPrice(tokenAddress, chain)

        expect(tokenPrice).toBeInstanceOf(BigNumber)
        expect(tokenPrice?.toNumber()).toBeLessThan(1.10)
        expect(tokenPrice?.toNumber()).toBeGreaterThan(0.98)
    })

    it('should calculate the price for token with less than 18 decimals', async () => {
        const tokenAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7' //  USDT (6 decimals)
        const chain = Chains.ETH

        const tokenPrice = await TokenService.getPrice(tokenAddress, chain)

        expect(tokenPrice).toBeInstanceOf(BigNumber)
        expect(tokenPrice?.toNumber()).toBeLessThan(1.10)
        expect(tokenPrice?.toNumber()).toBeGreaterThan(0.98)
    })

    it.only('should return the price for DAI on Optimism', async () => {
        const tokenAddress = '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1'
        const chain = Chains.OPTIMISM

        const tokenPrice = await TokenService.getPrice(tokenAddress, chain)

        expect(tokenPrice).toBeInstanceOf(BigNumber)
        expect(tokenPrice?.toNumber()).toBeLessThan(1.10)
        expect(tokenPrice?.toNumber()).toBeGreaterThan(0.98)
    })
})

