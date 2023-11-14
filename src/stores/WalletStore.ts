import { makeAutoObservable, runInAction } from 'mobx'

type State = {
    accounts: string[]
    loading?: boolean
    initialized?: boolean
}

const state: State = {
    accounts: [],
}

export class WalletStore {
    static installed = typeof window.mina !== 'undefined'

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
        if (WalletStore.installed) {
            window.mina.on('accountsChanged', (accounts: string[]) => {
                runInAction(() => {
                    this.state.accounts = accounts
                })
            })
        }
    }

    async restore() {
        let accounts: string[] = []

        if (WalletStore.installed) {
            try {
                accounts = await window.mina?.getAccounts()
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

        try {
            account = await window.mina.requestAccounts()
        }
        catch (e) {
            console.error(e)
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
