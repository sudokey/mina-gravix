import * as React from 'react'

import styles from './index.module.scss'

import { Select } from '@/pages/TradePage/components/Toolbar/Select'
import { Text } from '@/components/Text'

export const Toolbar = () => (
    <div className={styles.root}>
        <Select />

        <div className={styles.item}>
            <Text size="s" color="gray">
                Price
            </Text>
            <Text size="l">
                $36725
            </Text>
        </div>

        <div className={styles.item}>
            <Text size="s" color="gray">
                Open Interest, l
            </Text>
            <Text size="l">
                $2k / 100k
            </Text>
        </div>

        <div className={styles.item}>
            <Text size="s" color="gray">
                Open Interest, s
            </Text>
            <Text size="l">
                $300 / 100k
            </Text>
        </div>
    </div>
)
