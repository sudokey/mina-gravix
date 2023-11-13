import * as React from 'react'
import classNames from 'classnames'

import styles from './index.module.scss'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Text } from '@/components/Text'

export const Form = () => (
    <div>
        <div className={styles.root}>
            <div className={classNames(styles.type, styles.long)}>
                <button type="button">
                    Long
                </button>
                <button type="button">
                    Short
                </button>
            </div>

            <Input
                hint="0.00000001 BTC"
                label="USDT"
            />

            <div className={styles.hField}>
                <Text size="s" color="gray">
                    Leverage
                </Text>
                <Input
                    prefix="x"
                    size="s"
                    className={styles.sInput}
                    align="right"
                />
            </div>

            <Input
                hint="Long 0.00000001 BTC"
                label="USDT"
            />

            <div className={styles.hField}>
                <Text size="s" color="gray">
                    Slippage
                </Text>
                <Input
                    prefix="%"
                    size="s"
                    className={styles.sInput}
                    align="right"
                />
            </div>

            <div className={styles.vField}>
                <Text size="s" color="gray">
                    Open Price
                </Text>
                <div className={styles.line}>
                    <Text size="xl">
                        $36 859
                    </Text>
                    <Text size="s">
                        Spread 0.1038%
                    </Text>
                </div>
            </div>

            <Button block>
                Long BTC
            </Button>
        </div>

        <dl className={styles.info}>
            <dt>Position size</dt>
            <dd>$11.994</dd>
            <dt>Fees</dt>
            <dd>$0.006</dd>
            <dt>Liq. price</dt>
            <dd>$3 706</dd>
            <dt>Borrow fee</dt>
            <dd>0.002%/h</dd>
            <dt>Max pnl</dt>
            <dd>300%</dd>
        </dl>
    </div>
)
