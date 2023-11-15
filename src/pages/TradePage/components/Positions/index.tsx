/* eslint-disable max-len */
import * as React from 'react'
import { observer } from 'mobx-react-lite'

import styles from './index.module.scss'

import { Text } from '@/components/Text'
import { useProvider, useStore } from '@/hooks/useStore'
import { PositionsListStore } from '@/stores/PositionsListStore'
import { MarketStore } from '@/stores/MarketStore'
import { WalletStore } from '@/stores/WalletStore'
import { PriceStore } from '@/stores/PriceStore'
import { EventsStore } from '@/stores/EventsStore'
import { CounterStore } from '@/stores/CounterStore'

export const Positions = observer(() => {
    const market = useStore(MarketStore)
    const wallet = useStore(WalletStore)
    const price = useStore(PriceStore)
    const events = useStore(EventsStore)
    const counter = useStore(CounterStore)
    const PositionsProvider = useProvider(PositionsListStore, wallet, market, price, events, counter)

    return (
        <PositionsProvider>
            <div className={styles.root}>
                <div className={styles.head}>
                    <div className={styles.row}>
                        <div className={styles.cell}>
                            <Text color="gray" size="s" as="div">
                                ID
                            </Text>
                        </div>
                        <div className={styles.cell}>
                            <Text color="gray" size="s" as="div">
                                Type
                            </Text>
                        </div>
                        <div className={styles.cell}>
                            <Text color="gray" size="s" as="div">
                                Net value
                            </Text>
                        </div>
                        <div className={styles.cell}>
                            <Text color="gray" size="s" as="div">
                                Size
                            </Text>
                        </div>
                        <div className={styles.cell}>
                            <Text color="gray" size="s" as="div">
                                Collateral
                            </Text>
                        </div>
                        <div className={styles.cell}>
                            <Text color="gray" size="s" as="div">
                                Market price
                            </Text>
                        </div>
                        <div className={styles.cell}>
                            <Text color="gray" size="s" as="div">
                                Open price
                            </Text>
                        </div>
                        <div className={styles.cell}>
                            <Text color="gray" size="s" as="div">
                                Liq. price
                            </Text>
                        </div>
                        <div className={styles.cell}>
                            <span className={styles.close} />
                        </div>
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles.message}>
                        <Text color="gray">
                            No data
                        </Text>
                    </div>
                    {/* <Item /> */}
                </div>
            </div>
        </PositionsProvider>
    )
})
