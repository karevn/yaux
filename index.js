import callbacks from './src/callbacks'

export default class Store {
    constructor (state, reducers, options) {
        this.state = state
        this.reducers = reducers || []
        this.options = Object.assign({
            inPlace: true
        }, options)
    }

    dispatch(action, params, options) {
        if (this.onDispatch) {
            this.onDispatch(action, params)
        }
        this.state = callbacks(this.reducers, action).reduce( (state, callback) => {
            const result = callback.call(this, state, params)
            if (this.options.inPlace) {
                return state
            } else {
                return result
            }
        }, this.state)
        if (this.onChange) {
            this.onChange(this.state)
        }
        return {
            then: (callback) => {
                if (callback) {
                    callback(this.state)
                }
            }
        }
    }
}
