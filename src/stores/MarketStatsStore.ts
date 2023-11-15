import { makeAutoObservable } from 'mobx'
import { BigNumber } from 'bignumber.js'

import { Reactions } from '@/utils/reactions'
import { PriceStore } from '@/stores/PriceStore'
import { MarketStore } from '@/stores/MarketStore'

export class MarketStatsStore {
    protected reactions = new Reactions()

    constructor(
        protected price: PriceStore,
        protected market: MarketStore,
    ) {
        makeAutoObservable(
            this,
            {},
            {
                autoBind: true,
            },
        )
    }

    public get openInterestL(): string | undefined {
        return this.market.totalLongs
            ? new BigNumber(this.market.totalLongs)
                .dividedBy(10 ** 6)
                .toFixed(0)
            : undefined
    }

    public get maxTotalLongsUSD(): string | undefined {
        return this.market.maxTotalLongsUSD
    }

    public get openInterestS(): string | undefined {
        return this.market.totalShorts
            ? new BigNumber(this.market.totalShorts)
                .dividedBy(10 ** 6)
                .toFixed(0)
            : undefined
    }

    public get maxTotalShortsUSD(): string | undefined {
        return this.market.maxTotalShortsUSD
    }
}
