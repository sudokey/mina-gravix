/* eslint-disable max-len */
import { BigNumber } from 'bignumber.js'

import { decimalAmount } from '@/utils/decimal-amount'

export enum MarketIdx {
    Btc = 1,
    Eth = 2,
    Bnb = 3,
}

export const mapIdxToTicker = (marketIdx: number) => {
    switch (marketIdx) {
        case 1:
            return 'BTC/USD'
        case 2:
            return 'ETH/USD'
        case 3:
            return 'BNB/USD'
        default:
            throw new Error('Unknown idx')
    }
}

export const mapChartSymbol = (marketIdx: number) => {
    switch (marketIdx) {
        case 1:
            return 'BINANCE:BTCUSDT'
        case 2:
            return 'BINANCE:ETHUSDT'
        case 3:
            return 'BINANCE:BNBUSDT'
        default:
            throw new Error('Unknown market')
    }
}

export const mapApiSymbol = (marketIdx: number) => {
    switch (marketIdx) {
        case 1:
            return 'BTCUSDT'
        case 2:
            return 'ETHUSDT'
        case 3:
            return 'BNBUSDT'
        default:
            throw new Error('Unknown market')
    }
}

export const decimalPercent = (value: string): string => (
    new BigNumber(value)
        .dividedBy(10 ** 12)
        .times(100)
        .toFixed()
)

export const normalizePercent = (value: string): string => (
    new BigNumber(value)
        .dividedBy(100)
        .times(10 ** 12)
        .toFixed()
)

export const decimalLeverage = (value: string | number): string => (
    new BigNumber(value).dividedBy(1000000).toFixed()
)

export const normalizeLeverage = (value: string | number): string => (
    new BigNumber(value).times(1000000).decimalPlaces(0, BigNumber.ROUND_DOWN).toFixed()
)

export const countSize = (collateral: string, leverage: string) => {
    const normLeverage = decimalAmount(leverage, 6)
    return new BigNumber(collateral)
        .times(normLeverage)
        .div(10 ** 6)
        .toFixed(2)
}

export const calcNetValue = (initialCollateral: string, openFee: string, limitedPnl: string): string => (
    BigNumber.max(0, new BigNumber(initialCollateral).minus(openFee).plus(limitedPnl)).toFixed()
)

export const calcNetValueChange = (limitedPnl: string): string => new BigNumber(limitedPnl).toFixed()

export const calcNetValueChangePercent = (collateral: string, netValueChange: string): string => (
    new BigNumber(netValueChange).times(100).dividedBy(collateral).decimalPlaces(2)
        .toFixed()
)

export const calcCollateral = (initialCollateral: string, openFee: string): string => new BigNumber(initialCollateral).minus(openFee).toFixed()

export const calcPnlAfterFees = (limitedPnl: string, openFee: string, initialCollateral: string, closeFee = '0'): string => {
    const result = new BigNumber(limitedPnl).minus(openFee).minus(closeFee)

    if (result.lt(0)) {
        return BigNumber.min(initialCollateral, result.abs()).times(-1).toFixed()
    }

    return result.toFixed()
}

export const calcPnlAfterFeesPercent = (pnlAfterFees: string, initialCollateral: string): string => (
    new BigNumber(pnlAfterFees).times(100).dividedBy(initialCollateral).decimalPlaces(2)
        .toFixed()
)

export const calcLimitedPnl = (initialCollateral: string, openFee: string, pnl: string, maxPnlRate?: string | null): string => {
    const collateral = calcCollateral(initialCollateral, openFee)
    return maxPnlRate
        ? BigNumber.min(pnl, new BigNumber(collateral).times(maxPnlRate).dividedBy(10 ** 12)).toFixed()
        : pnl
}
