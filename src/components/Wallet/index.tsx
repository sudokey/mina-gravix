import * as React from 'react'

import styles from './index.module.scss'

import { Button } from '@/components/Button'

export const Wallet = () => (
    <div className={styles.root}>
        <Button>
            Connect
        </Button>
    </div>
)
