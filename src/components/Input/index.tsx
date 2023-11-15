/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react'
import classNames from 'classnames'

import styles from './index.module.scss'

import { Text } from '@/components/Text'

export const Input: React.FC<{
    value?: string
    disabled?: boolean
    onChange?: (value: string) => void
    onChangeInput?: React.ChangeEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>
    postfix?: string
    prefix?: string
    size?: 's' | 'm'
    className?: string
    align?: 'left' | 'center' | 'right'
    hint?: string
    label?: string
}> = ({
    value,
    postfix,
    prefix,
    size = 'm',
    align,
    className,
    hint,
    label,
    ...props
}) => {
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        props.onChangeInput?.(e)
        props.onChange?.(e.target.value)
    }

    return (
        <label
            className={classNames(styles.root, [styles[size]], className, {
                [styles.withHint]: !!hint,
            })}
        >
            {hint && (
                <Text
                    className={styles.hint}
                    size="s"
                    color="gray"
                >
                    {hint}
                </Text>
            )}

            <div className={styles.main}>
                {prefix && (
                    <div className={classNames(styles.fix, styles.pre)}>
                        {prefix}
                    </div>
                )}

                <input
                    type="text"
                    className={styles.input}
                    onChange={onChange}
                    value={value}
                    disabled={props.disabled}
                    style={{
                        textAlign: align,
                    }}
                    onBlur={props.onBlur}
                />

                {label ? (
                    <div className={styles.label}>
                        {label}
                    </div>
                ) : postfix ? (
                    <div className={classNames(styles.fix, styles.post)}>
                        {postfix}
                    </div>
                ) : null}
            </div>
        </label>
    )
}
