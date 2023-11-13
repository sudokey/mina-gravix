/* eslint-disable react/button-has-type */
import classNames from 'classnames'
import * as React from 'react'

import styles from './index.module.scss'

type Props = {
    block?: boolean,
    htmlType?: 'submit' | 'button',
    type?: 'primary' | 'secondary' | 'ghost',
    disabled?: boolean,
    href?: string,
    children: React.ReactNode,
    className?: string,
    size?: 'xs' | 's' | 'm' | 'l',
    onClick?: () => void,
}

export const Button = React.forwardRef<HTMLAnchorElement & HTMLButtonElement, Props>(({
    block,
    htmlType = 'button',
    children,
    disabled,
    href,
    type = 'primary',
    size = 'm',
    onClick,
    ...props
}, ref) => {
    const className = classNames(styles.button, props.className, [styles[type]], [styles[size]], {
        [styles.block]: block,
    })

    if (href) {
        return (
            <a
                ref={ref}
                target="_blank"
                rel="nofollow noopener noreferrer"
                href={href}
                onClick={onClick}
                className={className}
            >
                {children}
            </a>
        )
    }

    return (
        <button
            ref={ref}
            type={htmlType}
            disabled={disabled}
            className={className}
            onClick={onClick}
        >
            {children}
        </button>
    )
})
