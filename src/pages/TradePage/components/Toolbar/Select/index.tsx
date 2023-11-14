/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react'
import { Popover } from 'react-tiny-popover'
import classNames from 'classnames'

import styles from './index.module.scss'

import { useToggler } from '@/hooks/useToggler'

export const Select = () => {
    const visible = useToggler()

    return (
        <Popover
            isOpen={visible.active}
            onClickOutside={visible.toggle}
            align="start"
            positions={['bottom']}
            padding={4}
            content={(
                <div className={styles.list}>
                    <button className={styles.item} type="button">
                        btc/usdt
                    </button>
                    <button className={styles.item} type="button">
                        eth/usdt
                    </button>
                    <button className={styles.item} type="button">
                        bnb/usdt
                    </button>
                </div>
            )}
        >
            <button
                type="button"
                className={classNames(styles.root, {
                    [styles.active]: visible.active,
                })}
                onClick={visible.toggle}
            >
                btc/usdt

                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" className={styles.icon}>
                    <path stroke="#fff" strokeLinejoin="round" d="m4 9 8 8 8-8" />
                </svg>
            </button>
        </Popover>
    )
}
