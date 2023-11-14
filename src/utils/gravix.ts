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
