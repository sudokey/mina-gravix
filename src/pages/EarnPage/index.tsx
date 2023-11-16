import * as React from 'react'

import styles from './index.module.scss'

import { Text } from '@/components/Text'
import { Form } from '@/pages/EarnPage/Form'
import { useProvider, useStore } from '@/hooks/useStore'
import { EarnStore } from '@/stores/EarnStore'
import { WalletStore } from '@/stores/WalletStore'

export const EarnPage = () => {
    const wallet = useStore(WalletStore)
    const EarnProvider = useProvider(EarnStore, wallet)

    return (
        <EarnProvider>
            <div className={styles.root}>
                <Text size="xl">
                    Earn on staking your USDT tokens
                </Text>

                <Form />
            </div>
        </EarnProvider>
    )
}
