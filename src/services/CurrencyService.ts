import axios from 'axios'
import BigNumber from 'bignumber.js'
import NodeCache from 'node-cache'
import { Currency } from '../types'

// TODO: remove this
import dotenv from 'dotenv'
dotenv.config()

type CurrenciesToUsdExchangeRate = Omit<Record<Currency, BigNumber>, Currency.USD>

export class CurrencyService {
    public static _cache = new NodeCache({ stdTTL: 60 * 5 })
    private static _awesomeApiUrl = process.env.AWESOME_API_URL

    public static async getUsdExchangeRate(currency: Currency): Promise<BigNumber> {
        if (currency === Currency.USD)
            return new BigNumber('1')

        const cache = CurrencyService._cache.get<BigNumber>(currency)

        if (cache)
            return cache

        const exchangeRates = await Promise.any([
            CurrencyService._fetchAwesomeApiRates(),
        ])

        CurrencyService._setCache(exchangeRates)

        return exchangeRates[currency]
    }

    // TODO: consider add a mock for localhost and not abuse the api
    private static async _fetchAwesomeApiRates(): Promise<CurrenciesToUsdExchangeRate> {
        const usdPairs = Object.keys(Currency).filter(key => key !== Currency.USD)
        const requestParams = usdPairs.reduce<string | null>(
            (acc, curr) => `${ acc ? acc + ',' : '' }${curr}-USD`,
            null,
        ) 

        const { data } = await axios(`${ CurrencyService._awesomeApiUrl }/${ requestParams }`)

        return {
            BRL: new BigNumber(data['BRLUSD'].high),
            ARS: new BigNumber(data['ARSUSD'].high),
            EUR: new BigNumber(data['EURUSD'].high),
            CAD: new BigNumber(data['CADUSD'].high),
        }
    }

    private static _setCache(exchangeRates: CurrenciesToUsdExchangeRate) {
        CurrencyService._cache.mset(
            Object.entries(exchangeRates).map(([ key, val ]) => ({
                key,
                val
            }))
        )
    }
}
