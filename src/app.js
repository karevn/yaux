import ReactDOM from 'react-dom'
import React from 'react'
import Store from '../index'

export default class App {
  constructor (state, reducers, element, component) {
      this.store = new Store(state, reducers)
      this.component = component
      this.element = element
      this.store.onChange = ::this._onChange
      this._onChange(this.store.state)
  }

  _onChange (state) {
      const props = {
        dispatch: (action, param)=> this.store.dispatch(action, param),
        ...state
      }
      ReactDOM.render(
          React.createElement(this.component, props), this.element)
  }
}
