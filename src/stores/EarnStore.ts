import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { BigNumber } from 'bignumber.js'

import { Reactions } from '@/utils/reactions'
import { WalletStore } from '@/stores/WalletStore'
import { normalizeAmount } from '@/utils/normalize-amount'

export enum EarnAction {
    Deposit = 'deposit',
    Withdraw = 'withdraw',
}

type State = {
    amount?: string
    action: EarnAction
    usdtBalance?: string
    stgUsdtBalance?: string
    loading?: boolean
    poolBalance?: string
}

const initialState: State = {
    action: EarnAction.Deposit,
}

export class EarnStore {
    protected state = initialState

    protected reactions = new Reactions()

    constructor(
        protected wallet: WalletStore,
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
            reaction(() => this.wallet.account, this.syncBalance, {
                fireImmediately: true,
            }),
        )
    }

    dispose() {
        this.reactions.destroy()
    }

    get loading(): boolean {
        return !!this.state.loading
    }

    setAction(val: EarnAction): void {
        this.state.action = val
    }

    get action(): EarnAction {
        return this.state.action
    }

    setAmount(val: string): void {
        this.state.amount = val
    }

    get amount(): string | undefined {
        return this.state.amount
    }

    get amountNormalized(): string | undefined {
        return this.amount ? normalizeAmount(this.amount, 6) : undefined
    }

    get usdtBalance(): string | undefined {
        return this.state.usdtBalance
    }

    get stgUsdtBalance(): string | undefined {
        return this.state.stgUsdtBalance
    }

    get poolBalance(): string | undefined {
        return this.state.poolBalance
    }

    get depositAmountValid(): boolean {
        if (this.usdtBalance && this.amountNormalized) {
            return new BigNumber(this.usdtBalance).gte(this.amountNormalized)
        }

        return false
    }

    get withdrawAmountValid(): boolean {
        if (this.stgUsdtBalance && this.amountNormalized) {
            return new BigNumber(this.stgUsdtBalance).gte(this.amountNormalized)
        }

        return false
    }

    get amountIsValid(): boolean {
        if (this.action === EarnAction.Deposit) {
            return this.depositAmountValid
        }
        if (this.action === EarnAction.Withdraw) {
            return this.withdrawAmountValid
        }
        return false
    }

    syncBalance(): void {
        this.syncUsdtBalance().catch(console.error)
        this.syncStgUsdtBalance().catch(console.error)
        this.syncPoolBalance().catch(console.error)
    }

    async syncUsdtBalance(): Promise<void> {
        let usdtBalance: string

        try {
            // TODO: Sync
        }
        catch (e) {
            console.error(e)
        }

        runInAction(() => {
            this.state.usdtBalance = usdtBalance
        })
    }

    async syncStgUsdtBalance(): Promise<void> {
        let stgUsdtBalance: string

        try {
            // TODO: Sync
        }
        catch (e) {
            console.error(e)
        }

        runInAction(() => {
            this.state.stgUsdtBalance = stgUsdtBalance
        })
    }

    async syncPoolBalance(): Promise<void> {
        let poolBalance: string
        try {
            // TODO: Sync
        }
        catch (e) {
            console.error(e)
        }

        runInAction(() => {
            this.state.poolBalance = poolBalance
        })
    }

    submit() {
        if (this.action === EarnAction.Deposit) {
            this.deposit().catch(console.error)
        }
        else if (this.action === EarnAction.Withdraw) {
            this.withdraw().catch(console.error)
        }
    }

    async deposit(): Promise<void> {
        const success = false

        runInAction(() => {
            this.state.loading = true
        })

        try {
            if (!this.wallet) {
                throw new Error('wallet.provider must be defined')
            }

            if (!this.amount) {
                throw new Error('amount must be defined')
            }

            if (!this.wallet) {
                throw new Error('wallet.address must be defined')
            }

            // TODO: Deposit
        }
        catch (e) {
            console.error(e)
            // notification.error({
            //     message: 'Liquidity deposit failed',
            //     placement: 'bottomRight',
            // })
        }

        this.syncBalance()

        runInAction(() => {
            this.state.amount = success ? '' : this.amount
            this.state.loading = false
        })
    }

    async withdraw(): Promise<boolean> {
        const success = false

        runInAction(() => {
            this.state.loading = true
        })

        try {
            if (!this.wallet) {
                throw new Error('wallet.provider must be defined')
            }

            if (!this.amount) {
                throw new Error('amount must be defined')
            }

            if (!this.wallet) {
                throw new Error('wallet.address must be defined')
            }

            // TODO: Withdraw
        }
        catch (e) {
            console.error(e)
        }

        this.syncBalance()

        runInAction(() => {
            this.state.amount = success ? '' : this.amount
            this.state.loading = false
        })

        return success
    }
}
