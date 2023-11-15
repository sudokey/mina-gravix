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
import { useProvider, useStore } from '@/hooks/useStore'
import { WalletStore } from '@/stores/WalletStore'
import { CounterStore } from '@/stores/CounterStore'
import { MarketStore } from '@/stores/MarketStore'
import { PriceStore } from '@/stores/PriceStore'
import { MarketStatsStore } from '@/stores/MarketStatsStore'
import { EventsStore } from '@/stores/EventsStore'
import { DepositStore } from '@/stores/DepositStore'

export const App = () => {
    const CounterProvider = useProvider(CounterStore)
    const WalletProvider = useProvider(WalletStore)
    const EventsProvider = useProvider(EventsStore)

    return (
        <EventsProvider>
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
                                                    const events = useStore(EventsStore)
                                                    const MarketStatsProvider = useProvider(MarketStatsStore, price, market)
                                                    const DepositProvider = useProvider(DepositStore, wallet, price, market, events)
                                                    return (
                                                        <DepositProvider>
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
                                                        </DepositProvider>
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
        </EventsProvider>
    )
}
