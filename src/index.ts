import { useEffect, useState } from 'react'
import { Observable, Subject } from 'rxjs'
import produce from 'immer'

export type RxjsStoreReducerParam<S> = (state: S, ...args: any) => S

export type RxjsStoreReducerParams<S> = {
  [k: string]: RxjsStoreReducerParam<S>
}

// Parse Reduce Params for reducers Argument
type ParameterFromReducer<S, T> = T extends (state: S, ...args: infer P) => any
  ? P
  : never

type RxjsStoreReducers<S, R extends RxjsStoreReducerParams<S>> = {
  // eslint-disable-next-line
  [k in keyof R]: (...args: ParameterFromReducer<S, R[k]>) => void
}

class RxjsStore<S, R extends RxjsStoreReducerParams<S>> {
  private state: S
  private stateSubject$: Subject<S>
  public reducers: RxjsStoreReducers<S, R>
  public observable$: Observable<S>

  constructor(state: S, reducers: R) {
    this.state = state
    this.stateSubject$ = new Subject<S>()
    this.observable$ = this.stateSubject$.asObservable()
    this.reducers = this.generateReducers(reducers)
  }

  private generateReducers(r: R) {
    const results: RxjsStoreReducers<S, R> = {} as RxjsStoreReducers<S, R>
    Object.keys(r).forEach((key: keyof R) => {
      results[key] = (
        ...args: ParameterFromReducer<S, RxjsStoreReducerParam<S>>
      ) => {
        const nextState = produce<S, S>(this.state, (draft) => {
          return r[key](draft, ...args)
        })
        this.state = nextState
        this.stateSubject$.next(this.state)
      }
    })
    return results
  }

  getState(): S {
    return this.state
  }

  useRxjsStore(): [S] {
    const [state, setState] = useState<S>(this.state)
    useEffect(() => {
      const subscription = this.stateSubject$.subscribe((v: S) => setState(v))
      return () => {
        subscription.unsubscribe()
      }
    })
    return [state]
  }
}

export default RxjsStore
