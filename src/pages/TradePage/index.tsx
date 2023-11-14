import * as React from 'react'

import styles from './index.module.scss'

import { Form } from '@/pages/TradePage/components/Form'
import { Toolbar } from '@/pages/TradePage/components/Toolbar'
import { Positions } from '@/pages/TradePage/components/Positions'
import { TradingView } from '@/components/TradingView'

export const TradePage = () => (
    <div className={styles.root}>
        <Form />

        <div className={styles.main}>
            <Toolbar />
            <TradingView />
            <Positions />
        </div>
    </div>
)
