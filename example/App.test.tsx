import React from 'react'
import { act, fireEvent, render } from '@testing-library/react'
import App from './App'

it('renders without crashing', () => {
  const wrap = render(<App />)
  act(() => {
    fireEvent.click(wrap.getByText('increment'))
  })
  expect(wrap.container.innerHTML).toContain(100)
  act(() => {
    fireEvent.click(wrap.getByText('decrement'))
    fireEvent.click(wrap.getByText('decrement'))
  })
  expect(wrap.container.innerHTML).toContain(-100)
})
