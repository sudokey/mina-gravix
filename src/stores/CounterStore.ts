import { makeAutoObservable, runInAction } from 'mobx'

type State = {
    counter: number;
    isLoading?: boolean;
}

const initialState = {
    counter: 1,
}

export class CounterStore {
    protected interval?: ReturnType<typeof setInterval>

    protected state: State = initialState

    constructor() {
        makeAutoObservable(this, {}, {
            autoBind: true,
        })

        this.start()
    }

    public start(): void {
        clearInterval(this.interval)

        this.interval = setInterval(() => {
            runInAction(() => {
                this.state.counter = this.state.counter < 1000
                    ? this.state.counter + 1
                    : 1
            })
        }, 5000)
    }

    public stop(): void {
        clearInterval(this.interval)
    }

    public loading(value: boolean): void {
        this.state.isLoading = value
    }

    public get isLoading(): boolean {
        return !!this.state.isLoading
    }

    public get counter(): number {
        return this.state.counter
    }
}
