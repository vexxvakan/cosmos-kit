"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.walletConnectConnectionAttempt = exports.walletConnect = exports.updateState = exports.state = exports.setWalletConnect = exports.setOnQrCloseCallback = exports.setConfig = exports.removeStateObserver = exports.onQrCloseCallback = exports.nextWalletConnectConnectionAttempt = exports.config = exports.addStateObservers = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _types = require("@cosmos-kit/types");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

//! INTERNAL
var config;
exports.config = config;

var setConfig = function setConfig(value) {
  exports.config = config = value;
};

exports.setConfig = setConfig;
var walletConnectConnectionAttempt = 0;
exports.walletConnectConnectionAttempt = walletConnectConnectionAttempt;

var nextWalletConnectConnectionAttempt = function nextWalletConnectConnectionAttempt() {
  return exports.walletConnectConnectionAttempt = ++walletConnectConnectionAttempt;
};

exports.nextWalletConnectConnectionAttempt = nextWalletConnectConnectionAttempt;
var walletConnect;
exports.walletConnect = walletConnect;

var setWalletConnect = function setWalletConnect(value) {
  exports.walletConnect = walletConnect = value;
}; // Call when closing QR code modal manually.


exports.setWalletConnect = setWalletConnect;
var onQrCloseCallback;
exports.onQrCloseCallback = onQrCloseCallback;

var setOnQrCloseCallback = function setOnQrCloseCallback(value) {
  exports.onQrCloseCallback = onQrCloseCallback = value;
}; //! EXTERNAL


exports.setOnQrCloseCallback = setOnQrCloseCallback;
var state = {
  walletConnectQrUri: undefined,
  connectedWallet: undefined,
  connectingWallet: undefined,
  status: _types.CosmosWalletStatus.Uninitialized,
  error: undefined,
  chainInfoOverrides: undefined,
  getSigningCosmWasmClientOptions: undefined,
  getSigningStargateClientOptions: undefined,
  enabledWallets: []
};
exports.state = state;
var stateObservers = [];

var addStateObservers = function addStateObservers() {
  for (var _len = arguments.length, observers = new Array(_len), _key = 0; _key < _len; _key++) {
    observers[_key] = arguments[_key];
  }

  return stateObservers.push.apply(stateObservers, (0, _toConsumableArray2["default"])(observers.filter(function (observer) {
    return !stateObservers.includes(observer);
  })));
};

exports.addStateObservers = addStateObservers;

var removeStateObserver = function removeStateObserver(observer) {
  if (!stateObservers.includes(observer)) {
    return;
  } // Remove observer at index.


  stateObservers.splice(stateObservers.findIndex(function (existing) {
    return existing === observer;
  }), 1);
};

exports.removeStateObserver = removeStateObserver;

var updateState = function updateState(newState) {
  exports.state = state = _objectSpread(_objectSpread({}, state), newState); // Notify observers.

  stateObservers.forEach(function (observer) {
    return observer(state);
  });
};

exports.updateState = updateState;