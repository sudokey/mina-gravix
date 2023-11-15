import { makeAutoObservable, reaction, runInAction } from 'mobx'

import { Position } from '@/types'
import { Reactions } from '@/utils/reactions'
import { CounterStore } from '@/stores/CounterStore'
import { WalletStore } from '@/stores/WalletStore'
import { MarketStore } from '@/stores/MarketStore'
import { PriceStore } from '@/stores/PriceStore'
import { EventsStore } from '@/stores/EventsStore'

type State = {
    marketOrders?: Position[]
    positionsLoading: boolean
    closeLoading: { [k: string]: boolean | undefined }
}

const initialState: State = {
    closeLoading: {},
    positionsLoading: false,
}

export class PositionsListStore {
    protected reactions = new Reactions()

    protected state = initialState

    constructor(
        protected wallet: WalletStore,
        protected market: MarketStore,
        protected price: PriceStore,
        protected events: EventsStore,
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
            reaction(() => [this.wallet.account], this.reload),
            reaction(() => this.events.last, this.sync.bind(this, false)),
            reaction(() => this.counter.counter, this.sync.bind(this, true)),
        )
    }

    reload() {
        this.state = initialState
        this.sync().catch(console.error)
    }

    dispose() {
        this.reactions.destroy()
        this.state = initialState
    }

    async sync(silence?: boolean) {
        if (!silence) {
            runInAction(() => {
                this.state.positionsLoading = true
            })
        }

        try {
            if (!this.wallet.account) {
                throw new Error('wallet.selectedAccount must be defined')
            }

            // TODO: Sync positions

            // runInAction(() => {
            //     this.state.marketOrders = positionWithPnl
            //     this.state.positionsLoading = false
            // })
        }
        catch (e) {
            console.error(e)
        }
    }

    async closePos(key: string, marketIdx: string) {
        runInAction(() => {
            this.state.closeLoading[key] = true
        })

        try {
            if (!this.wallet.account) {
                throw new Error('wallet.account must be defined')
            }

            // TODO: Close pos
            runInAction(() => {
                this.state.closeLoading[key] = false
            })
        }
        catch (e) {
            console.error(e)

            runInAction(() => {
                this.state.closeLoading[key] = false
            })
        }
    }

    public get allUserPositions(): Position[] {
        return this.state.marketOrders ?? []
    }

    public get posLoading(): boolean {
        return !!this.state.positionsLoading
    }

    public get closeLoading(): State['closeLoading'] {
        return this.state.closeLoading
    }
}
