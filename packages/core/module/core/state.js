import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import { CosmosWalletStatus } from '@cosmos-kit/types';
//! INTERNAL
export let config;
export const setConfig = value => {
  config = value;
};
export let walletConnectConnectionAttempt = 0;
export const nextWalletConnectConnectionAttempt = () => ++walletConnectConnectionAttempt;
export let walletConnect;
export const setWalletConnect = value => {
  walletConnect = value;
}; // Call when closing QR code modal manually.

export let onQrCloseCallback;
export const setOnQrCloseCallback = value => {
  onQrCloseCallback = value;
}; //! EXTERNAL

export let state = {
  walletConnectQrUri: undefined,
  connectedWallet: undefined,
  connectingWallet: undefined,
  status: CosmosWalletStatus.Uninitialized,
  error: undefined,
  chainInfoOverrides: undefined,
  getSigningCosmWasmClientOptions: undefined,
  getSigningStargateClientOptions: undefined,
  enabledWallets: []
};
const stateObservers = [];
export const addStateObservers = (...observers) => stateObservers.push( // Filter out duplicates.
...observers.filter(observer => !stateObservers.includes(observer)));
export const removeStateObserver = observer => {
  if (!stateObservers.includes(observer)) {
    return;
  } // Remove observer at index.


  stateObservers.splice(stateObservers.findIndex(existing => existing === observer), 1);
};
export const updateState = newState => {
  state = _objectSpread(_objectSpread({}, state), newState); // Notify observers.

  stateObservers.forEach(observer => observer(state));
};