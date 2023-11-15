/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Popover } from 'react-tiny-popover'
import * as React from 'react'
import { observer } from 'mobx-react-lite'
import BigNumber from 'bignumber.js'

import styles from './index.module.scss'

import { Text } from '@/components/Text'
import { useToggler } from '@/hooks/useToggler'
import { useStore } from '@/hooks/useStore'
import { PriceStore } from '@/stores/PriceStore'
import { formattedAmount } from '@/utils/formatted-amount'
import { countSize, mapIdxToTicker } from '@/utils/gravix'
import { DepositType } from '@/stores/DepositStore'
import { formattedTokenAmount } from '@/utils/formatted-token-amount'
import { PositionStore } from '@/stores/PositionStore'
import { percentSign, usdSign } from '@/utils/sign'
import { Amount } from '@/components/Amount'
import { decimalAmount } from '@/utils/decimal-amount'
import { PositionsListStore } from '@/stores/PositionsListStore'

export const ItemInner: React.FC = observer(() => {
    const netDesc = useToggler()
    const positionList = useStore(PositionsListStore)
    const position = useStore(PositionStore)
    const price = useStore(PriceStore)

    const leverageFormatted = React.useMemo(
        () => (position.leverage ? formattedAmount(position.leverage.toString()) : undefined),
        [position.leverage],
    )

    const netValueFormatted = React.useMemo(
        () => (position.netValue ? formattedTokenAmount(position.netValue, 6) : undefined),
        [position.netValue],
    )

    const netValueChangeFormatted = React.useMemo(
        () => (position.netValueChange ? formattedTokenAmount(position.netValueChange, 6) : undefined),
        [position.netValueChange],
    )

    const netValueChangePercentFormatted = React.useMemo(
        () => (position.netValueChangePercent ? formattedAmount(position.netValueChangePercent) : undefined),
        [position.netValueChangePercent],
    )

    const initialCollateralFormatted = React.useMemo(
        () => (position.initialCollateral ? formattedTokenAmount(position.initialCollateral, 6) : undefined),
        [position.initialCollateral],
    )

    const pnlFormatted = React.useMemo(() => (position.pnl ? formattedTokenAmount(position.pnl, 6) : undefined), [position.pnl])

    const openFeeFormatted = React.useMemo(
        () => (position.openFee ? formattedTokenAmount(position.openFee, 6) : undefined),
        [position.openFee],
    )

    const pnlAfterFeesFormatted = React.useMemo(
        () => (position.pnlAfterFees ? formattedTokenAmount(position.pnlAfterFees, 6) : undefined),
        [position.pnlAfterFees],
    )

    const pnlAfterFeesPercentFormatted = React.useMemo(
        () => (position.pnlAfterFeesPercent ? formattedAmount(position.pnlAfterFeesPercent) : undefined),
        [position.pnlAfterFeesPercent],
    )

    const closeLoading = positionList.closeLoading[position.positionIdx]

    const handleClose = () => {
        if (position.marketIdx) {
            positionList.closePos(position.positionIdx, position.marketIdx).catch(console.error)
        }
    }

    return (
        <div className={styles.row}>
            <div className={styles.cell}>
                <Text as="div">
                    Jun 30, 2023, 12:59
                </Text>
            </div>
            <div className={styles.cell}>
                {position.marketIdx && (
                    <Text as="div">
                        {mapIdxToTicker(+position.marketIdx)}
                    </Text>
                )}
                <div className={styles.line}>
                    <Text size="s" color="gray">
                        {leverageFormatted && (
                            <span>
                                x
                                {leverageFormatted}
                            </span>
                        )}
                    </Text>
                    {position.type && (
                        <Text size="s" color={position.type === DepositType.Long ? 'green' : 'red'}>
                            {position.type === DepositType.Long ? 'Long' : 'Short'}
                        </Text>
                    )}
                </div>
            </div>
            <div className={styles.cell}>
                {netValueFormatted && (
                    <Popover
                        isOpen={netDesc.active}
                        align="start"
                        positions={['bottom', 'top']}
                        padding={4}
                        content={(
                            <div className={styles.tooltip}>
                                <Text size="s" className={styles.title}>
                                    Net Value = Collateral - Funding Fee - Borrow Fee + PnL
                                </Text>

                                <dl>
                                    <dt>
                                        Initial collateral
                                    </dt>
                                    <dd>{initialCollateralFormatted ? <Amount value={usdSign(initialCollateralFormatted)} /> : '\u200B'}</dd>

                                    <dt>
                                        PnL
                                    </dt>
                                    <dd>{pnlFormatted ? <Amount value={usdSign(pnlFormatted)} /> : '\u200B'}</dd>

                                    <dt>
                                        Open fee
                                    </dt>
                                    <dd>{openFeeFormatted ? <Amount value={usdSign(`-${openFeeFormatted}`)} /> : '\u200B'}</dd>

                                    <dt>
                                        PnL after fees
                                    </dt>
                                    <dd>
                                        {pnlAfterFeesFormatted && pnlAfterFeesPercentFormatted ? (
                                            <>
                                                <span className={styles.muted}>{percentSign(pnlAfterFeesPercentFormatted)}</span>
                                                {' '}
                                                {usdSign(pnlAfterFeesFormatted)}
                                            </>
                                        ) : (
                                            '\u200B'
                                        )}
                                    </dd>
                                </dl>
                            </div>
                        )}
                    >
                        <span className={styles.dashed}>
                            <Text
                                onMouseEnter={netDesc.toggle}
                                onMouseLeave={netDesc.toggle}
                            >
                                <Amount value={usdSign(netValueFormatted)} />
                            </Text>
                        </span>
                    </Popover>
                )}
                <div className={styles.line}>
                    {netValueChangeFormatted && (
                        <Amount colorize value={usdSign(netValueChangeFormatted)} />
                    )}
                    {netValueChangePercentFormatted && (
                        <Amount muted colorize value={percentSign(netValueChangePercentFormatted)} />
                    )}
                </div>
            </div>
            <div className={styles.cell}>
                {position.initialCollateral && position.leverage && (
                    <Amount value={usdSign(countSize(position.initialCollateral.toString(), position.leverage.toString()))} />
                )}
            </div>
            <div className={styles.cell}>
                {position.initialCollateral && (
                    <Amount value={usdSign(decimalAmount(position.initialCollateral.toString(), 6))} />
                )}
            </div>
            <div className={styles.cell}>
                {position.marketIdx && price.price[position.marketIdx.toString()] && (
                    <Text as="div">
                        {price.price[position.marketIdx.toString()]
                            ? (
                                <Amount value={usdSign(new BigNumber(price.price[position.marketIdx.toString()] as string).toFixed(2))} />
                            )
                            : '-'}
                    </Text>
                )}
            </div>
            <div className={styles.cell}>
                {position.openPrice && (
                    <Amount value={usdSign(decimalAmount(position.openPrice.toString(), 6, 2))} />
                )}
            </div>
            <div className={styles.cell}>
                {position.liquidationPrice && (
                    <Amount value={usdSign(decimalAmount(position.liquidationPrice.toString(), 6, 0))} />
                )}
            </div>
            <div className={styles.cell}>
                <button
                    type="button"
                    className={styles.close}
                    onClick={handleClose}
                    disabled={closeLoading}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke="white"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6 6L12 12M18 6L12 12M12 12L6 18M12 12L18 18"
                            stroke="currentColor"
                            strokeOpacity="0.48"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    )
})
