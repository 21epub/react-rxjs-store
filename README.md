# @21epub/react-rxjs-store

> Rxjs store for react state management

[![NPM](https://img.shields.io/npm/v/@21epub/react-rxjs-store.svg)](https://www.npmjs.com/package/@21epub/react-rxjs-store) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) ![Travis (.com)](https://img.shields.io/travis/com/21epub/react-rxjs-store) ![Codecov](https://img.shields.io/codecov/c/github/21epub/react-rxjs-store)

## Intro

> This package only provide an opt for tiny or medium react state management . Not replace the `redux` or `context reducer` ecosystem.

For react > 16.8.0

A solution for react state management .

Store state can be acquired anywhere through `store.getState()` synchronously.

Provide useRxjsStore Hooks for Components State Usage.

## Features

- [x] Easy-to-use
- [x] Fully TypeScript
- [x] No `context`or `reducer` required
- [x] Immutable by `immer`
- [x] Async state flow by `rxjs`

## Install

```bash
npm install --save @21epub/react-rxjs-store
```

## Usage

```ts
// store.ts : Store Definition

import RxjsStore, { RxjsStoreReducerParams } from '@21epub/react-rxjs-store'

interface State {
  count: number
}

//Reducers Types definition (Recommanded)
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
```

```ts
// Component.ts : Component Hooks Usage

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
```

For Details: See Example

## Developing and running on localhost

First install dependencies and then install peerDeps for parcel dev:

```sh
npm install
npm run install-peers
```

To run Example in hot module reloading mode:

```sh
npm start
```

To create a parcel production build:

```sh
npm run build-prod
```

To create a bundle library module build:

```sh
npm run build
```

## Running

Open the file `dist/index.html` in your browser

## Testing

To run unit tests:

```sh
npm test
```

## License

MIT © [garryguzy](https://github.com/garryguzy)
