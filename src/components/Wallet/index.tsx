/* eslint-disable no-nested-ternary */
import * as React from 'react'
import { observer } from 'mobx-react-lite'

import styles from './index.module.scss'

import { Button } from '@/components/Button'
import { useStore } from '@/hooks/useStore'
import { WalletStore } from '@/stores/WalletStore'
import { sliceAddress } from '@/utils/slice-address'
import { Text } from '@/components/Text'

export const Wallet = observer(() => {
    const wallet = useStore(WalletStore)

    if (!wallet.initialized) {
        return null
    }

    return (
        <div className={styles.root}>
            {WalletStore.installed ? (
                wallet.account ? (
                    <Text>
                        {sliceAddress(wallet.account)}
                    </Text>
                ) : (
                    <Button onClick={wallet.connect}>
                        Connect
                    </Button>
                )
            ) : (
                <Button href="https://aurowallet.com/">
                    Install wallet
                </Button>
            )}
        </div>
    )
})
