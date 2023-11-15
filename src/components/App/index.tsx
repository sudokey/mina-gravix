/* eslint-disable max-len */
/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import {
    Route,
    BrowserRouter,
    Switch,
    Redirect,
    generatePath,
} from 'react-router-dom'

import { Header } from '@/components/Header'
import { routes } from '@/routes'
import { TradePage } from '@/pages/TradePage'
import { EarnPage } from '@/pages/EarnPage'
import { useProvider } from '@/hooks/useStore'
import { WalletStore } from '@/stores/WalletStore'
import { CounterStore } from '@/stores/CounterStore'
import { MarketStore } from '@/stores/MarketStore'
import { PriceStore } from '@/stores/PriceStore'
import { MarketStatsStore } from '@/stores/MarketStatsStore'

export const App = () => {
    const CounterProvider = useProvider(CounterStore)
    const WalletProvider = useProvider(WalletStore)

    return (
        <CounterProvider>
            {counter => (
                <WalletProvider>
                    {wallet => {
                        const MarketProvider = useProvider(MarketStore, wallet, counter)
                        return (
                            <MarketProvider>
                                {market => {
                                    const PriceProvider = useProvider(PriceStore, market, counter)
                                    return (
                                        <PriceProvider>
                                            {price => {
                                                const MarketStatsProvider = useProvider(MarketStatsStore, price, market)
                                                return (
                                                    <MarketStatsProvider>
                                                        <BrowserRouter>
                                                            <Header />
                                                            <Switch>
                                                                <Route exact path={routes.root}>
                                                                    <Redirect to={generatePath(routes.trade)} />
                                                                </Route>
                                                                <Route exact path={routes.trade}>
                                                                    <TradePage />
                                                                </Route>
                                                                <Route exact path={routes.earn}>
                                                                    <EarnPage />
                                                                </Route>
                                                            </Switch>
                                                        </BrowserRouter>
                                                    </MarketStatsProvider>
                                                )
                                            }}
                                        </PriceProvider>
                                    )
                                }}
                            </MarketProvider>
                        )
                    }}
                </WalletProvider>
            )}
        </CounterProvider>
    )
}
