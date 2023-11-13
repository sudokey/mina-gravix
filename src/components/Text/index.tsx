import cc from 'classnames'
import React from 'react'

import styles from './index.module.scss'

interface ComponentProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType,
  className?: string,
  size?: 's' | 'm' | 'l',
}

export const Text: React.FC<ComponentProps & React.PropsWithChildren> = ({
    as: Tag = 'span',
    className,
    size = 'm',
    children,
    ...otherProps
}) => (
    <Tag
        className={cc(styles.root, className, styles[size])}
        {...otherProps}
    >
        {children}
    </Tag>
)
