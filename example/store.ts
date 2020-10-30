import RxjsStore, { RxjsStoreReducerParams } from '../src'

interface State {
  count: number
}

interface Reducers<S> extends RxjsStoreReducerParams<S> {
  increment: (state: S, payload: number) => S
  decrement: (state: S, payload?: number) => S
}

const initState: State = {
  count: 0
}

const reducers: Reducers<State> = {
  // Sync state management
  increment(state, payload = 1) {
    return { ...state, count: state.count + payload }
  },
  decrement(state, payload = 1) {
    return { ...state, count: state.count - payload }
  }
}

export default new RxjsStore<State, Reducers<State>>(initState, reducers)
