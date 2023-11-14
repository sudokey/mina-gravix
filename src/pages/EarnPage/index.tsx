import * as React from 'react'
import classNames from 'classnames'

import styles from './index.module.scss'

import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'

export const EarnPage = () => (
    <div className={styles.root}>
        <Text size="xl">
            Earn on staking your USDT tokens
        </Text>
        <form className={styles.form}>
            <div className={classNames(styles.type, styles.long)}>
                <button className={styles.long} type="button">
                    Deposit
                </button>
                <button className={styles.short} type="button">
                    Withdraw
                </button>
            </div>

            <Input
                label="USDT"
            />

            <Button disabled>
                Deposit
            </Button>
        </form>
    </div>
)
