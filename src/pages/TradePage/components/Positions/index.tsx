import * as React from 'react'

import styles from './index.module.scss'

import { Text } from '@/components/Text'
import { Item } from '@/pages/TradePage/components/Positions/Item'

export const Positions = () => (
    <div className={styles.root}>
        <div className={styles.head}>
            <div className={styles.row}>
                <div className={styles.cell}>
                    <Text color="gray" size="s" as="div">
                        ID
                    </Text>
                </div>
                <div className={styles.cell}>
                    <Text color="gray" size="s" as="div">
                        Type
                    </Text>
                </div>
                <div className={styles.cell}>
                    <Text color="gray" size="s" as="div">
                        Net value
                    </Text>
                </div>
                <div className={styles.cell}>
                    <Text color="gray" size="s" as="div">
                        Size
                    </Text>
                </div>
                <div className={styles.cell}>
                    <Text color="gray" size="s" as="div">
                        Collateral
                    </Text>
                </div>
                <div className={styles.cell}>
                    <Text color="gray" size="s" as="div">
                        Mark price
                    </Text>
                </div>
                <div className={styles.cell}>
                    <Text color="gray" size="s" as="div">
                        Open price
                    </Text>
                </div>
                <div className={styles.cell}>
                    <Text color="gray" size="s" as="div">
                        Liq. price
                    </Text>
                </div>
                <div className={styles.cell}>
                    <span className={styles.close} />
                </div>
            </div>
        </div>
        <div className={styles.body}>
            {/* <div className={styles.message}>
                <Text color="gray">
                    No data
                </Text>
            </div> */}
            <Item />
            <Item />
        </div>
    </div>
)
