'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var callbacks = require('./src/callbacks');

function maybeCall() {
    if (arguments[0]) {
        arguments[0].apply(null, Array.prototype.slice.call(arguments, 1));
    }
}

module.exports = function () {
    function Store(state, reducers, options) {
        _classCallCheck(this, Store);

        this.state = state;
        this.reducers = reducers || [];
        this.options = Object.assign({
            inPlace: true
        }, options);
        this.dispatch = this.dispatch.bind(this);
    }

    _createClass(Store, [{
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
