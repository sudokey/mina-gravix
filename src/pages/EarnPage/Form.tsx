import * as React from 'react'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'

import styles from './index.module.scss'

import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { useStore } from '@/hooks/useStore'
import { EarnAction, EarnStore } from '@/stores/EarnStore'

export const Form = observer(() => {
    const form = useStore(EarnStore)

    return (
        <div className={styles.root}>
            <Text size="xl">
                Earn on staking your USDT tokens
            </Text>
            <form className={styles.form}>
                <div
                    className={classNames(styles.type, {
                        [styles.long]: form.action === EarnAction.Deposit,
                        [styles.short]: form.action === EarnAction.Withdraw,
                    })}
                >
                    <button className={styles.long} type="button" onClick={() => form.setAction(EarnAction.Deposit)}>
                        Deposit
                    </button>
                    <button className={styles.short} type="button" onClick={() => form.setAction(EarnAction.Withdraw)}>
                        Withdraw
                    </button>
                </div>

                <Input
                    label="USDT"
                    value={form.amount}
                    onChange={form.setAmount}
                    disabled={form.loading}
                />

                <Button disabled={form.loading || !form.amountIsValid}>
                    {form.action === EarnAction.Deposit ? 'Deposit' : 'Withdraw'}
                </Button>
            </form>
        </div>
    )
})
