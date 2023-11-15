/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react'
import { Popover } from 'react-tiny-popover'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'

import styles from './index.module.scss'

import { useToggler } from '@/hooks/useToggler'
import { MarketStore } from '@/stores/MarketStore'
import { useStore } from '@/hooks/useStore'
import { MarketIdx, mapIdxToTicker } from '@/utils/gravix'

export const Select = observer(() => {
    const visible = useToggler()
    const market = useStore(MarketStore)

    const setMarketFn = (idx: number) => () => {
        market.setMarketIdx(idx)
        visible.toggle()
    }

    return (
        <Popover
            isOpen={visible.active}
            onClickOutside={visible.toggle}
            align="start"
            positions={['bottom']}
            padding={4}
            content={(
                <div className={styles.list}>
                    <button
                        className={styles.item}
                        type="button"
                        onClick={setMarketFn(MarketIdx.Btc)}
                    >
                        {mapIdxToTicker(MarketIdx.Btc)}
                    </button>
                    <button
                        className={styles.item}
                        type="button"
                        onClick={setMarketFn(MarketIdx.Eth)}
                    >
                        {mapIdxToTicker(MarketIdx.Eth)}
                    </button>
                    <button
                        className={styles.item}
                        type="button"
                        onClick={setMarketFn(MarketIdx.Bnb)}
                    >
                        {mapIdxToTicker(MarketIdx.Bnb)}
                    </button>
                </div>
            )}
        >
            <button
                type="button"
                className={classNames(styles.root, {
                    [styles.active]: visible.active,
                })}
                onClick={visible.toggle}
            >
                {mapIdxToTicker(market.marketIdx)}

                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" className={styles.icon}>
                    <path stroke="#fff" strokeLinejoin="round" d="m4 9 8 8 8-8" />
                </svg>
            </button>
        </Popover>
    )
})
