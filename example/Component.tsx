import React from 'react'
import store from './store'

const Component = () => {
  const [state] = store.useRxjsStore()
  const increment = () => {
    store.reducers.increment(100)
  }
  const decrement = () => {
    store.reducers.decrement(100)
  }
  return (
    <>
      <div>Create React TS Parcel Library Example 😄</div>
      <div>Count: {state.count}</div>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </>
  )
}

export default Component
