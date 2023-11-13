import * as React from 'react'

import styles from './index.module.scss'

import { Form } from '@/pages/TradePage/components/Form'
import { Toolbar } from '@/pages/TradePage/components/Toolbar'
import { Chart } from '@/pages/TradePage/components/Chart'
import { Positions } from '@/pages/TradePage/components/Positions'

export const TradePage = () => (
    <div className={styles.root}>
        <div className={styles.form}>
            <Form />
        </div>
        <div className={styles.toolbar}>
            <Toolbar />
        </div>
        <div className={styles.chart}>
            <Chart />
        </div>
        <div className={styles.positions}>
            <Positions />
        </div>
    </div>
)
