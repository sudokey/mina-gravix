import { makeAutoObservable, reaction, runInAction } from 'mobx'

import { WalletStore } from '@/stores/WalletStore'
import { Market } from '@/types'
import { Reactions } from '@/utils/reactions'
import { decimalLeverage, decimalPercent } from '@/utils/gravix'
import { CounterStore } from '@/stores/CounterStore'

type State = {
    marketIdx: number
    market?: Market
}

const initialState: State = {
    marketIdx: 1,
}

export class MarketStore {
    protected state = initialState

    protected reactions = new Reactions()

    constructor(
        protected wallet: WalletStore,
        protected counter: CounterStore,
    ) {
        makeAutoObservable(
            this,
            {},
            {
                autoBind: true,
            },
        )
    }

    init() {
        this.reactions.create(
            reaction(() => [this.wallet.account, this.marketIdx], this.syncData),
            reaction(() => this.counter.counter, this.syncData),
        )
    }

    dispose() {
        this.reactions.destroy()
    }

    setMarketIdx(val: number): void {
        this.state.marketIdx = val
    }

    async syncData(): Promise<void> {
        let market: Market

        if (this.wallet.account) {
            try {
                // TODO: Sync market data
            }
            catch (e) {
                console.error(e)
            }
        }

        runInAction(() => {
            this.state.market = market
        })
    }

    get idx(): string {
        return this.state.marketIdx.toString()
    }

    get marketIdx(): number {
        return this.state.marketIdx
    }

    get market(): Market | undefined {
        return this.state.market
    }

    get maxLeverage(): string | undefined {
        return this.state.market
            ? decimalLeverage(this.state.market?.maxLeverage.toString())
            : undefined
    }

    get openFeeRate(): string | undefined {
        return this.state.market
            ? decimalPercent(this.state.market.openFeeRate.toString())
            : undefined
    }

    get baseSpreadRate(): string | undefined {
        return this.state.market
            ? decimalPercent(this.state.market?.baseSpreadRate.toString())
            : undefined
    }

    get totalLongs(): string | undefined {
        return this.state.market?.totalLongs.toString()
    }

    get totalShorts(): string | undefined {
        return this.state.market?.totalShorts.toString()
    }

    get maxTotalLongsUSD(): string | undefined {
        return this.state.market?.maxTotalLongs.toString()
    }

    get maxTotalShortsUSD(): string | undefined {
        return this.state.market?.maxTotalShorts.toString()
    }
}
