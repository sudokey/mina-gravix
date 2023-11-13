import cc from 'classnames'
import React from 'react'

import styles from './index.module.scss'

interface ComponentProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType,
  className?: string,
  size?: 's' | 'm' | 'l' | 'xl',
  color?: 'gray'
}

export const Text: React.FC<ComponentProps & React.PropsWithChildren> = ({
    as: Tag = 'span',
    className,
    size = 'm',
    children,
    color,
    ...otherProps
}) => (
    <Tag
        className={cc(styles.root, className, styles[size], color ? styles[color] : null)}
        {...otherProps}
    >
        {children}
    </Tag>
)
