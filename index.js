import callbacks from './src/callbacks'

function maybeCall() {
    if (arguments[0]) {
        arguments[0].apply(null, Array.prototype.slice.call(arguments, 1))
    }
}

export default class Store {
    constructor(state, reducers, options) {
        this.state = state
        this.reducers = reducers || []
        this.options = { inPlace: true, ...options }
        this.dispatch = ::this.dispatch
    }

    dispatch(action, params, options) {
        maybeCall(this.onDispatch, action, params)
        if (typeof action === 'function') {
            return Promise.resolve(
                action(this.dispatch, this.state, params, options))
        } else {
            this.state = callbacks(this.reducers, action).reduce( (state, callback) => {
                const result = callback.call(this, state, params)
                if (this.options.inPlace) {
                    return state
                } else {
                    return result
                }
            }, this.state)
            maybeCall(this.onChange, this.state)
            return Promise.resolve(this.state)
        }
    }
}
