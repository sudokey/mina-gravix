import React from 'react'

export const useToggler = () => {
    const [active, setActive] = React.useState(false)

    return React.useMemo(() => ({
        active,
        toggle: () => {
            setActive(!active)
        },
        set: (value: boolean) => {
            setActive(value)
        },
        setFn: (value: boolean) => () => {
            setActive(value)
        },
    }), [active])
}
