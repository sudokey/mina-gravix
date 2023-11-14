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

export const App = () => {
    const WalletProvider = useProvider(WalletStore)

    return (
        <WalletProvider>
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
        </WalletProvider>
    )
}
