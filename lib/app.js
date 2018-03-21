import ReactDOM from 'react-dom';
import React from 'react';

function direct(objects, action) {
    return objects.filter(function (obj) {
        return !!obj[action] && typeof obj[action] === 'function';
    }).map(function (obj) {
        return obj[action];
    });
}

function nested(objects, action) {
    var index = action.indexOf('.');
    if (index === -1) {
        return [];
    }
    var current = action.substr(0, index);
    var next = objects.filter(function (object) {
        return object[current] && typeof object[current] !== 'function';
    }).map(function (object) {
        return object[current];
    });
    return callbacks(next, action.substr(index + 1));
}

function callbacks(objects, action) {
    return direct(objects, action).concat(nested(objects, action));
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

function maybeCall() {
    if (arguments[0]) {
        arguments[0].apply(null, Array.prototype.slice.call(arguments, 1));
    }
}

var Store = function () {
    function Store(state, reducers, options) {
        classCallCheck(this, Store);

        this.state = state;
        this.reducers = reducers || [];
        this.options = _extends({ inPlace: true }, options);
        this.dispatch = this.dispatch.bind(this);
    }

    createClass(Store, [{
        key: 'dispatch',
        value: function dispatch(action, params, options) {
            var _this = this;

            maybeCall(this.onDispatch, action, params);
            if (typeof action === 'function') {
                return Promise.resolve(action(this.dispatch, this.state, params, options));
            } else {
                this.state = callbacks(this.reducers, action).reduce(function (state, callback) {
                    var result = callback.call(_this, state, params);
                    if (_this.options.inPlace) {
                        return state;
                    } else {
                        return result;
                    }
                }, this.state);
                maybeCall(this.onChange, this.state);
                return Promise.resolve(this.state);
            }
        }
    }]);
    return Store;
}();

var App = function () {
    function App(state, reducers, element, component) {
        classCallCheck(this, App);

        this.store = new Store(state, reducers);
        this.component = component;
        this.element = element;
        this.store.onChange = this._onChange.bind(this);
        this._onChange(this.store.state);
    }

    createClass(App, [{
        key: '_onChange',
        value: function _onChange(state) {
            var _this = this;

            var props = Object.assign({
                dispatch: function dispatch(action, param) {
                    return _this.store.dispatch(action, param);
                }
            }, state);
            ReactDOM.render(React.createElement(this.component, props), this.element);
        }
    }]);
    return App;
}();

export default App;
