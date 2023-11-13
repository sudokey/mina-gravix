import * as React from 'react'
import { Link, NavLink, generatePath } from 'react-router-dom'

import styles from './index.module.scss'

import { routes } from '@/routes'
import { Text } from '@/components/Text'
import { Wallet } from '@/components/Wallet'

export const Header = () => (
    <div className={styles.root}>
        <div className={styles.main}>
            <div className={styles.logo}>
                <Link to={generatePath(routes.trade)}>
                    Gravix
                </Link>
            </div>

            <div className={styles.menu}>
                <NavLink to={generatePath(routes.trade)} activeClassName={styles.active}>
                    <Text as="span" className={styles.link}>
                        Trade
                    </Text>
                </NavLink>

                <NavLink to={generatePath(routes.earn)} activeClassName={styles.active}>
                    <Text as="span" className={styles.link}>
                        Earn
                    </Text>
                </NavLink>
            </div>
        </div>
        <div>
            <Wallet />
        </div>
    </div>
)
