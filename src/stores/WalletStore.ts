import { makeAutoObservable, runInAction } from 'mobx'
import MinaProvider from '@aurowallet/mina-provider'

type State = {
    accounts: string[]
    loading?: boolean
    initialized?: boolean
}

const state: State = {
    accounts: [],
}

export class WalletStore {
    static mina = window.mina as MinaProvider | undefined

    protected state = state

    constructor() {
        makeAutoObservable(this, {}, {
            autoBind: true,
        })
    }

    init() {
        this.restore()
        this.listener()
    }

    async listener() {
        if (WalletStore.mina) {
            WalletStore.mina.on('accountsChanged', (accounts: string[]) => {
                runInAction(() => {
                    this.state.accounts = accounts
                })
            })
        }
    }

    async restore() {
        let accounts: string[] = []

        if (WalletStore.mina) {
            try {
                accounts = await WalletStore.mina.getAccounts()
            }
            catch (e) {
                console.error(e)
            }
        }

        runInAction(() => {
            this.state.accounts = accounts
            this.state.initialized = true
        })
    }

    async connect() {
        runInAction(() => {
            this.state.loading = true
        })

        let account: string[] = []

        if (WalletStore.mina) {
            try {
                const result = await WalletStore.mina.requestAccounts()

                if (result instanceof Error) {
                    throw result
                }
                else {
                    account = result
                }
            }
            catch (e) {
                console.error(e)
            }
        }

        runInAction(() => {
            this.state.loading = false
            this.state.accounts = account
        })
    }

    get account(): string | undefined {
        return this.state.accounts?.[0]
    }

    get loading(): boolean {
        return !!this.state.loading
    }

    get initialized(): boolean {
        return !!this.state.initialized
    }
}
