'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReactDOM = require('react-dom');
var React = require('react');
var Store = require('./index');

module.exports = function () {
    function App(state, reducers, element, component) {
        _classCallCheck(this, App);

        this.store = new Store(state, reducers);
        this.component = component;
        this.element = element;
        this.store.onChange = this._onChange.bind(this);
        this._onChange(this.store.state);
    }

    _createClass(App, [{
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
