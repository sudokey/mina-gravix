/* eslint-disable no-plusplus */
import * as React from 'react'
import classNames from 'classnames'
import Slider from 'rc-slider'
import { observer } from 'mobx-react-lite'
import BigNumber from 'bignumber.js'

import styles from './index.module.scss'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Text } from '@/components/Text'
import { useStore } from '@/hooks/useStore'
import { DepositStore, DepositType } from '@/stores/DepositStore'
import { useAmountField } from '@/hooks/useAmountField'
import { MarketStore } from '@/stores/MarketStore'
import { PriceStore } from '@/stores/PriceStore'
import { usdSign } from '@/utils/sign'
import { mapIdxToTicker } from '@/utils/gravix'
import { onSubmitFn } from '@/utils/input'

export const Form = observer(() => {
    const deposit = useStore(DepositStore)
    const market = useStore(MarketStore)
    const price = useStore(PriceStore)

    const marks = React.useMemo(
        () => {
            const maxLeverage = market.maxLeverage ?? '100'
            const int = parseInt(maxLeverage, 10)
            let count = 5
            while (int % count !== 0) {
                count += 1
            }
            const step = int / count
            const result = [1]
            for (let i = 1; i <= count; i++) {
                result.push(step * i)
            }
            return Object.fromEntries(result.map(n => [n, `x${n}`]))
        },
        [market.maxLeverage],
    )

    const onChangeSlider = (value: number | number[]) => {
        deposit.setLeverage(value.toString())
    }

    const leverageField = useAmountField({
        decimals: 2,
        defaultValue: '1',
        max: market.maxLeverage,
        min: '1',
        onBlur: value => {
            if (value !== deposit.leverage) {
                deposit.setLeverage(value)
            }
        },
        onChange: deposit.setLeverage,
    })

    const collateralField = useAmountField({
        decimals: 6,
        onBlur: value => {
            if (value !== deposit.collateral) {
                deposit.setCollateral(value)
            }
        },
        onChange: deposit.setCollateral,
    })

    const positionField = useAmountField({
        decimals: 6,
        onBlur: value => {
            if (value !== deposit.position) {
                deposit.setPosition(value)
            }
        },
        onChange: deposit.setPosition,
    })

    const slippageField = useAmountField({
        decimals: 4,
        defaultValue: '1',
        onBlur: deposit.setSlippage,
        onChange: deposit.setSlippage,
    })

    const marketPrice = price.price[market.idx]

    return (
        <div>
            <form onSubmit={onSubmitFn(deposit.submit)} className={styles.root}>
                <div
                    className={classNames(styles.type, {
                        [styles.long]: deposit.depositType === DepositType.Long,
                        [styles.short]: deposit.depositType === DepositType.Short,
                    })}
                >
                    <button
                        type="button"
                        onClick={() => deposit.setType(DepositType.Long)}
                    >
                        Long
                    </button>
                    <button
                        type="button"
                        onClick={() => deposit.setType(DepositType.Short)}
                    >
                        Short
                    </button>
                </div>

                <Input
                    // hint="0.00000001 BTC"
                    label="USDT"
                    value={deposit.collateral}
                    onChangeInput={collateralField.onChange}
                    onBlur={collateralField.onBlur}
                    disabled={deposit.loading}
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
                        value={deposit.leverage}
                        onChangeInput={leverageField.onChange}
                        onBlur={leverageField.onBlur}
                        disabled={deposit.loading}
                    />
                </div>

                <div className={styles.slider}>
                    <Slider
                        tabIndex={-1}
                        marks={marks}
                        min={1}
                        max={market.maxLeverage ? parseFloat(market.maxLeverage) : undefined}
                        onChange={onChangeSlider}
                        value={Number(deposit.leverage)}
                        disabled={deposit.loading || !market.maxLeverage}
                    />
                </div>

                <Input
                    // hint="Long 0.00000001 BTC"
                    // label="USDT"
                    value={deposit.position}
                    onChangeInput={positionField.onChange}
                    onBlur={positionField.onBlur}
                    disabled={deposit.loading}
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
                        value={deposit.slippage}
                        onChangeInput={slippageField.onChange}
                        onBlur={slippageField.onBlur}
                        disabled={deposit.loading}
                    />
                </div>

                <div className={styles.vField}>
                    <Text size="s" color="gray">
                        Open Price
                    </Text>
                    <div className={styles.line}>
                        <Text size="xl">
                            {marketPrice ? `${usdSign(new BigNumber(marketPrice).toFixed(2))}` : '\u200B'}
                        </Text>
                        {/* <Text size="s">
                            Spread 0.1038%
                        </Text> */}
                    </div>
                </div>

                <Button
                    disabled={deposit.loading || !deposit.isEnabled}
                    htmlType="submit"
                >
                    {deposit.depositType === DepositType.Long ? 'Long' : 'Short'}
                    {' '}
                    {mapIdxToTicker(market.marketIdx).split('/')[0]}
                </Button>
            </form>

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
})
