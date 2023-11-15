/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import * as React from 'react'
import { observer } from 'mobx-react-lite'

import { useProvider, useStore } from '@/hooks/useStore'
import { PositionsListStore } from '@/stores/PositionsListStore'
import { PriceStore } from '@/stores/PriceStore'
import { PositionStore } from '@/stores/PositionStore'
import { MarketStore } from '@/stores/MarketStore'
import { ItemInner } from '@/pages/TradePage/components/Positions/ItemInner'

type Props = {
    idx: number
}

export const Item: React.FC<Props> = observer(({
    idx,
}) => {
    const market = useStore(MarketStore)
    const price = useStore(PriceStore)
    const positions = useStore(PositionsListStore)
    const PositionProvider = useProvider(PositionStore, market, price, positions, idx.toString())

    return (
        <PositionProvider>
            <ItemInner />
        </PositionProvider>
    )
})
