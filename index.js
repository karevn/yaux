import callbacks from './src/callbacks'
import thenable from './src/thenable'

export default function dispatch(factories, stores, state, action, params, options) {
    return callbacks(factories, action).reduce((function(promise, callback) {
        return promise.then(callback)
    }), Promise.resolve(params)).then(function(params) {
        return callbacks(stores, action).reduce((function(promise, callback) {
            return promise.then(function(state) {
                let newState = callback(state, params)
                if (newState === undefined || options.inPlace && !thenable(newState)) {
                    newState = state
                }
                return newState
            })
        }), Promise.resolve(state))
    })
}
