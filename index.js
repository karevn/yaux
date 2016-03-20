function callbacks(objects, action) {
  return objects.filter(function(obj) {return !!obj[action];})
  .map(function(obj) {return obj[action];});
};

function isThenable(object) {
  if (!object) {
    return false
  }
  return !!object.then && typeof object.then == 'function';
}

function dispatch(factories, stores, state, action, params, options) {
  var defaults = {
    debug: false
  }
  Object.assign(defaults, options)
  options = defaults
  if (options.debug) {
    console.info("Dispatching action: " + action);
    if (params) {
      console.info("Params:");
      console.info(params);
    }
  }
  return callbacks(factories, action).reduce((function(promise, callback) {
    return promise.then(callback);
  }), Promise.resolve(params)).then(function(params) {
    return callbacks(stores, action).reduce((function(promise, callback) {
      return promise.then(function(state) {
        var newState = callback(state, params);
        if (newState === undefined || options.inPlace && !isThenable(newState)) {
          newState = state
        }
        return newState
      });
    }), Promise.resolve(state));
  })["catch"](function(e) {
    return console.error(e);
  });
};

module.exports = dispatch;
