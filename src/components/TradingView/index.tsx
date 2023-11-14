/* eslint-disable no-new */
import React, { useEffect } from 'react'

import styles from './index.module.scss'

import { mapChartSymbol } from '@/utils/gravix'

let tvScriptLoadingPromise: Promise<void>

export const TradingView: React.FC = () => {
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
                    symbol: mapChartSymbol(1), // TODO: Change 1
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
    }, [])

    return (
        <div
            className={styles.container}
            id="tradingview_06042"
        />
    )
}
