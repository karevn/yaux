import callbacks from './src/callbacks'

function isThenable(object) {
    if (!object) {
        return false
    }
    return !!object.then && typeof object.then == 'function'
}

export default function dispatch(factories, stores, state, action, params, options) {
    var defaults = {
        debug: false
    }
    Object.assign(defaults, options)
    options = defaults
    if (options.debug) {
        /* eslint-disable no-console */
        console.info('Dispatching action: ' + action)
        if (params) {
            /* eslint-disable no-console */
            console.info('Params:')
            console.info(params)
        }
    }
    return callbacks(factories, action).reduce((function(promise, callback) {
        return promise.then(callback)
    }), Promise.resolve(params)).then(function(params) {
        return callbacks(stores, action).reduce((function(promise, callback) {
            return promise.then(function(state) {
                let newState = callback(state, params)
                if (newState === undefined || options.inPlace && !isThenable(newState)) {
                    newState = state
                }
                return newState
            })
        }), Promise.resolve(state))
    })['catch'](function(e) {
        /* eslint-disable no-console */
        return console.error(e)
    })
}
