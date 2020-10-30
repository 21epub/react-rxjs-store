import RxjsStore, { RxjsStoreReducerParams } from '.'
import { render } from '@testing-library/react'
import * as React from 'react'
import { act } from 'react-dom/test-utils'

interface State {
  count: number
}

interface Reducers<S> extends RxjsStoreReducerParams<S> {
  // Specify the types of reducer can help for coding
  increment: (state: S, payload?: number) => S
  decrement: (state: S, payload?: number) => S
}

const initState: State = {
  // We'll test if the count can correctly update after reducer or action
  count: 0
}

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
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

const actions = {
  async asyncIncrement() {
    await delay(1000)
    store.reducers.increment(111)
  },
  async asyncDecrement() {
    await delay(1000)
    store.reducers.decrement(111)
  }
}

const store = new RxjsStore<State, Reducers<State>>(initState, reducers)

describe('test rxjsStore Reducers function', () => {
  it('store can initialize its state', () => {
    store.reducers.increment(1)
    let value = store.getState().count
    expect(value).toBe(1)
    store.reducers.decrement()
    value = store.getState().count
    expect(value).toBe(0)
  })
})

describe('test rxjsStore async function', () => {
  it('store can initialize its state', async () => {
    await actions.asyncIncrement()
    let value = store.getState().count
    expect(value).toBe(111)
    await actions.asyncDecrement()
    value = store.getState().count
    expect(value).toBe(0)
  })
})

const Comp1 = () => {
  const [state] = store.useRxjsStore()
  return (
    <>
      <div>The current state count is : {state.count}</div>
    </>
  )
}

const Comp2 = () => {
  const [state] = store.useRxjsStore()
  return (
    <>
      <div>The current state count is : {state.count}</div>
    </>
  )
}

describe('test rxjs store components hooks function', () => {
  it('component can get correct store state', () => {
    const comp1 = render(<Comp1 />)
    const comp2 = render(<Comp2 />)
    act(() => {
      store.reducers.increment(3)
    })
    expect(comp1.container.innerHTML).toContain(
      'The current state count is : 3'
    )
    expect(comp2.container.innerHTML).toContain(
      'The current state count is : 3'
    )
  })
})
