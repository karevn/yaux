const ReactDOM = require('react-dom')
const React = require('react')
const Store = require('./index')

module.exports = class App {
    constructor (state, reducers, element, component) {
        this.store = new Store(state, reducers)
        this.component = component
        this.element = element
        this.store.onChange = ::this._onChange
        this._onChange(this.store.state)
    }

    _onChange (state) {
        const props = Object.assign({
            dispatch: (action, param)=> this.store.dispatch(action, param)
        }, state)
        ReactDOM.render(
            React.createElement(this.component, props), this.element)
    }
}
