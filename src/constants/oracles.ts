import { ChainMap, Chains } from "../types/chain"

export const oracles: ChainMap<string> = {
    [Chains.ETH]: '0x07D91f5fb9Bf7798734C3f606dB065549F6893bb',
    [Chains.BSC]: '0xfbD61B037C325b959c0F6A7e69D8f37770C2c550',
    [Chains.POLYGON]: '0x7F069df72b7A39bCE9806e3AfaF579E54D8CF2b9',
    [Chains.OPTIMISM]: '0x11DEE30E710B8d4a8630392781Cc3c0046365d4c',
    [Chains.ARBITRUIM]: '0x735247fb0a604c0adC6cab38ACE16D0DbA31295F',
    [Chains.AVAX]: '0xBd0c7AaF0bF082712EbE919a9dD94b2d978f79A9',
} 

export const connectors: ChainMap<string[]> = {
    [Chains.ETH]: [],
    [Chains.BSC]: [
        '0xe9e7cea3dedca5984780bafc599bd69add087d56', // BUSD
        '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3', // DAI
        '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d', // USDC
        '0x55d398326f99059ff775485246999027b3197955', // USDT
    ],
    [Chains.POLYGON]: [],
    [Chains.OPTIMISM]: [],
    [Chains.ARBITRUIM]: [],
    [Chains.AVAX]: [],
}
