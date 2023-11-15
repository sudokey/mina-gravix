/* eslint-disable class-methods-use-this */
/* eslint-disable no-nested-ternary */
import { makeAutoObservable, runInAction } from 'mobx'
import { BigNumber } from 'bignumber.js'

import { Reactions } from '@/utils/reactions'
import { WalletStore } from '@/stores/WalletStore'
import { PriceStore } from '@/stores/PriceStore'
import { MarketStore } from '@/stores/MarketStore'
import { EventName, EventsStore } from '@/stores/EventsStore'
import { normalizeAmount } from '@/utils/normalize-amount'
import { normalizeLeverage, normalizePercent } from '@/utils/gravix'

export enum DepositType {
    Long = '0',
    Short = '1',
}

type State = {
    loading?: boolean
    depositType: DepositType
    leverage: string
    collateral?: string
    slippage?: string
    position?: string
}

const initialState: State = {
    depositType: DepositType.Long,
    leverage: '1',
    slippage: '1',
}

export class DepositStore {
    protected reactions = new Reactions()

    protected state = initialState

    constructor(
        protected wallet: WalletStore,
        protected price: PriceStore,
        protected market: MarketStore,
        protected events: EventsStore,
    ) {
        makeAutoObservable(
            this,
            {},
            {
                autoBind: true,
            },
        )
    }

    setType(val: DepositType): void {
        this.state.depositType = val
    }

    setCollateral(value: string): void {
        this.state.collateral = value
        this.calcPosition()
    }

    setPosition(value: string): void {
        this.state.position = value
        this.calcCollateral()
    }

    setLeverage(value: string): void {
        this.state.leverage = value
        this.calcPosition()
    }

    setSlippage(value: string): void {
        this.state.slippage = value
    }

    calcCollateral(): void {
        this.state.collateral = this.position && this.leverage && this.market.openFeeRate
            ? new BigNumber(this.position)
                .dividedBy(
                    new BigNumber(1)
                        .minus(new BigNumber(this.leverage)
                            .times(this.market.openFeeRate)
                            .dividedBy(100))
                        .times(this.leverage),
                )
                .decimalPlaces(6)
                .toString()
            : undefined
    }

    calcPosition(): void {
        this.state.position = this.collateral && this.openFee && this.leverage
            ? new BigNumber(this.collateral)
                .minus(this.openFee)
                .times(this.leverage)
                .decimalPlaces(6)
                .toString()
            : undefined
    }

    async submit(): Promise<void> {
        let success = false

        runInAction(() => {
            this.state.loading = true
        })

        try {
            if (!this.wallet.account) {
                throw new Error('wallet.selectedAccount must be defined')
            }

            // TODO: Deposit
            this.events.add(EventsStore.create(EventName.DepositSuccess))

            success = true
        }
        catch (e) {
            console.error(e)
        }

        runInAction(() => {
            this.state.collateral = success ? '' : this.collateral
            this.state.leverage = success ? '1' : this.leverage
            this.state.position = success ? '' : this.position
            this.state.loading = false
        })
    }

    get loading(): boolean {
        return !!this.state.loading
    }

    get collateral(): string | undefined {
        return this.state.collateral
    }

    get collateralNormalized(): string | undefined {
        return this.state.collateral ? normalizeAmount(this.state.collateral, 6) : undefined
    }

    get amountIsValid(): boolean {
        // TODO: Validation
        return true
    }

    get depositType(): DepositType {
        return this.state.depositType
    }

    get slippage(): string | undefined {
        return this.state.slippage
    }

    get leverage(): string {
        return this.state.leverage
    }

    get leverageNormalized(): string | undefined {
        return this.leverage ? normalizeLeverage(this.leverage) : undefined
    }

    get openFee(): string | undefined {
        return this.collateral && this.leverage && this.market.openFeeRate
            ? new BigNumber(this.collateral)
                .times(this.leverage)
                .times(this.market.openFeeRate)
                .dividedBy(100)
                .toFixed()
            : undefined
    }

    get liquidationPrice(): string | undefined {
        if (
            this.collateral
            && this.openFee
            && this.openPrice
            && this.leverage
            && this.market.baseSpreadRate
            && new BigNumber(this.collateral).gt(0)
        ) {
            const isLong = this.depositType === DepositType.Long

            const collateral = new BigNumber(this.collateral).minus(this.openFee)

            const liqPriceDistance = new BigNumber(this.openPrice)
                .times(collateral)
                .times(0.9)
                .dividedBy(this.collateral)
                .dividedBy(this.leverage)

            return new BigNumber(this.openPrice)
                .plus(new BigNumber(liqPriceDistance).times(isLong ? -1 : 1))
                .dividedBy(
                    new BigNumber(1).plus(
                        new BigNumber(this.market.baseSpreadRate)
                            .dividedBy(100)
                            .times(isLong ? -1 : 1),
                    ),
                )
                .decimalPlaces(8, BigNumber.ROUND_DOWN)
                .toFixed()
        }
        return undefined
    }

    get position(): string | undefined {
        return this.state.position
    }

    get positionNormalized(): string | undefined {
        return this.position ? normalizeAmount(this.position, 6) : undefined
    }

    get spread(): string | undefined {
        return this.market.baseSpreadRate
    }

    get openPrice(): string | undefined {
        const isLong = this.depositType === DepositType.Long
        const price = this.price.price[this.market.idx]

        return price && this.spread
            ? new BigNumber(price)
                .plus(
                    new BigNumber(price)
                        .times(this.spread)
                        .dividedBy(100)
                        .times(isLong ? 1 : -1),
                )
                .decimalPlaces(8, BigNumber.ROUND_DOWN)
                .toString()
            : undefined
    }

    get openPriceNormalized(): string | undefined {
        return this.openPrice ? normalizeAmount(this.openPrice, 8) : undefined
    }

    get slippageNormalized(): string | undefined {
        return this.state.slippage ? normalizePercent(this.state.slippage) : undefined
    }

    get isValid(): boolean | undefined {
        // TODO: Validation
        return true
    }

    get isSpreadValid(): boolean | undefined {
        const price = this.price.price[this.market.idx]
        return price && this.liquidationPrice
            ? this.depositType === DepositType.Long
                ? new BigNumber(price).gt(this.liquidationPrice)
                : new BigNumber(price).lt(this.liquidationPrice)
            : undefined
    }

    get isEnabled(): boolean | undefined {
        return this.isValid && this.amountIsValid && this.isSpreadValid === true
    }
}
