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
import { HomePage } from '@/pages/HomePage'

export const App = () => (
    <BrowserRouter>
        <Header />
        <Switch>
            <Route exact path={routes.root}>
                <Redirect to={generatePath(routes.trade)} />
            </Route>
            <Route exact path={routes.trade}>
                <HomePage />
            </Route>
        </Switch>
    </BrowserRouter>
)
