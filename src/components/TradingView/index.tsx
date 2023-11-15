/* eslint-disable new-cap */
/* eslint-disable no-new */
import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import styles from './index.module.scss'

import { mapChartSymbol } from '@/utils/gravix'
import { useStore } from '@/hooks/useStore'
import { MarketStore } from '@/stores/MarketStore'

let tvScriptLoadingPromise: Promise<void>

export const TradingView: React.FC = observer(() => {
    const market = useStore(MarketStore)

    useEffect(() => {
        if (!tvScriptLoadingPromise) {
            tvScriptLoadingPromise = new Promise(resolve => {
                const script = document.createElement('script')
                script.id = 'tradingview-widget-loading-script'
                script.src = 'https://s3.tradingview.com/tv.js'
                script.type = 'text/javascript'
                script.onload = () => {
                    resolve()
                }

                document.head.appendChild(script)
            })
        }

        tvScriptLoadingPromise
            .then(async () => {
                new (window as any).TradingView.widget({
                    autosize: true,
                    symbol: mapChartSymbol(market.marketIdx),
                    interval: 'D',
                    timezone: 'Etc/UTC',
                    theme: 'dark',
                    style: '1',
                    locale: 'en',
                    enable_publishing: false,
                    allow_symbol_change: true,
                    container_id: 'tradingview_06042',
                })
            })
            .catch(console.error)
    }, [market.marketIdx])

    return (
        <div
            className={styles.container}
            id="tradingview_06042"
        />
    )
})
