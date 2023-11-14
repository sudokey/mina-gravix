/* eslint-disable jsx-a11y/control-has-associated-label */
import { Popover } from 'react-tiny-popover'
import * as React from 'react'

import styles from './index.module.scss'

import { Text } from '@/components/Text'
import { useToggler } from '@/hooks/useToggler'

export const Item = () => {
    const netDesc = useToggler()
    const collateralDesc = useToggler()

    return (
        <div className={styles.row}>
            <div className={styles.cell}>
                <Text as="div">
                    Jun 30, 2023, 12:59
                </Text>
            </div>
            <div className={styles.cell}>
                <Text as="div">
                    BTC
                </Text>
                <div className={styles.line}>
                    <Text size="s" color="gray">
                        x7
                    </Text>
                    <Text size="s" color="green">
                        Long
                    </Text>
                </div>
            </div>
            <div className={styles.cell}>
                <Popover
                    isOpen={netDesc.active}
                    align="start"
                    positions={['bottom']}
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
                                <dd>
                                    $1
                                </dd>

                                <dt>
                                    PnL
                                </dt>
                                <dd>
                                    $1
                                </dd>

                                <dt>
                                    Borrow-fee
                                </dt>
                                <dd>
                                    $1
                                </dd>

                                <dt>
                                    Funding-fee
                                </dt>
                                <dd>
                                    $1
                                </dd>

                                <dt>
                                    Open fee
                                </dt>
                                <dd>
                                    $1
                                </dd>

                                <dt>
                                    Close fee
                                </dt>
                                <dd>
                                    $1
                                </dd>

                                <dt>
                                    PnL after fees
                                </dt>
                                <dd>
                                    $1
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
                            $0.468827
                        </Text>
                    </span>
                </Popover>
                <div className={styles.line}>
                    <Text size="s" color="red">
                        -$4.513
                    </Text>
                    <Text size="s" color="red">
                        -90.59%
                    </Text>
                </div>
            </div>
            <div className={styles.cell}>
                <Text as="div">
                    $34.8775
                </Text>
            </div>
            <div className={styles.cell}>
                <Popover
                    isOpen={collateralDesc.active}
                    align="start"
                    positions={['bottom']}
                    padding={4}
                    content={(
                        <div className={styles.tooltip}>
                            <Text size="s" className={styles.title}>
                                Collateral = Initial Collateral - Open Fee
                            </Text>

                            <dl>
                                <dt>
                                    Initial Collateral
                                </dt>
                                <dd>
                                    $1
                                </dd>

                                <dt>
                                    Open fee
                                </dt>
                                <dd>
                                    $1
                                </dd>
                            </dl>
                        </div>
                    )}
                >
                    <span
                        className={styles.dashed}
                        onMouseEnter={collateralDesc.toggle}
                        onMouseLeave={collateralDesc.toggle}
                    >
                        <Text>
                            $34.8775
                        </Text>
                    </span>
                </Popover>
            </div>
            <div className={styles.cell}>
                <Text as="div">
                    $34.8775
                </Text>
            </div>
            <div className={styles.cell}>
                <Text as="div">
                    $34.8775
                </Text>
            </div>
            <div className={styles.cell}>
                <Text as="div">
                    $34.8775
                </Text>
            </div>
            <div className={styles.cell}>
                <button type="button" className={styles.close}>
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
}
