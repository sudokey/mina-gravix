import * as React from 'react'
import { observer } from 'mobx-react-lite'
import BigNumber from 'bignumber.js'

import styles from './index.module.scss'

import { Select } from '@/pages/TradePage/components/Toolbar/Select'
import { Text } from '@/components/Text'
import { useStore } from '@/hooks/useStore'
import { MarketStatsStore } from '@/stores/MarketStatsStore'
import { abbrNumber } from '@/utils/abbr-number'
import { decimalAmount } from '@/utils/decimal-amount'
import { PriceStore } from '@/stores/PriceStore'
import { MarketStore } from '@/stores/MarketStore'
import { usdSign } from '@/utils/sign'

export const Toolbar = observer(() => {
    const stats = useStore(MarketStatsStore)
    const price = useStore(PriceStore)
    const market = useStore(MarketStore)

    const openInterestS = React.useMemo(
        () => (stats.openInterestS ? abbrNumber(stats.openInterestS) : undefined),
        [stats.openInterestS],
    )

    const maxTotalShortsUSD = React.useMemo(
        () => (stats.maxTotalShortsUSD
            ? abbrNumber(decimalAmount(stats.maxTotalShortsUSD, 6))
            : undefined),
        [stats.maxTotalShortsUSD],
    )

    const openInterestL = React.useMemo(
        () => (stats.openInterestL ? abbrNumber(stats.openInterestL) : undefined),
        [stats.openInterestL],
    )

    const maxTotalLongsUSD = React.useMemo(
        () => (stats.maxTotalLongsUSD
            ? abbrNumber(decimalAmount(stats.maxTotalLongsUSD, 6))
            : undefined),
        [stats.maxTotalLongsUSD],
    )

    const marketPrice = price.price[market.idx]

    return (
        <div className={styles.root}>
            <Select />

            <div className={styles.item}>
                <Text size="s" color="gray">
                    Price
                </Text>
                <Text size="l">
                    {marketPrice ? (
                        `${usdSign(new BigNumber(marketPrice).toFixed(2))}`
                    ) : '\u200B'}
                </Text>
            </div>

            <div className={styles.item}>
                <Text size="s" color="gray">
                    Open Interest, l
                </Text>
                <Text size="l">
                    {openInterestL && maxTotalLongsUSD ? (
                        <>
                            {usdSign(openInterestL)}
                            {' / '}
                            {maxTotalLongsUSD}
                        </>
                    ) : (
                        '\u200B'
                    )}
                </Text>
            </div>

            <div className={styles.item}>
                <Text size="s" color="gray">
                    Open Interest, s
                </Text>
                <Text size="l">
                    {openInterestS && maxTotalShortsUSD ? (
                        <>
                            {usdSign(openInterestS)}
                            {' / '}
                            {maxTotalShortsUSD}
                        </>
                    ) : (
                        '\u200B'
                    )}
                </Text>
            </div>
        </div>
    )
})
