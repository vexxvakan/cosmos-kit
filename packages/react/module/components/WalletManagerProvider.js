import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
const _excluded = ["children", "classNames", "closeIcon", "renderLoader"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import { beginConnection, cleanupAfterConnection, connectToWallet, disconnect, initialize, reset, stopConnecting } from '@cosmos-kit/core';
import { CosmosWalletStatus } from '@cosmos-kit/types';
import React, { useEffect, useMemo, useState } from 'react';
import { EnablingWalletModal, SelectWalletModal, WalletConnectModal } from './ui';
import { WalletManagerContext } from './WalletManagerContext';
export const WalletManagerProvider = _ref => {
  let {
    children,
    classNames,
    closeIcon,
    renderLoader
  } = _ref,
      config = _objectWithoutProperties(_ref, _excluded);

  const [coreState, setCoreState] = useState(); // Initialize on mount.

  useEffect(() => {
    initialize(config, [setCoreState]); // Only initialize once, on mount. Not everytime the config props change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Memoize context data.

  const value = useMemo(() => coreState && _objectSpread(_objectSpread({}, coreState), {}, {
    connect: beginConnection,
    disconnect,
    connected: coreState.status === CosmosWalletStatus.Connected
  }), [coreState]); // TODO: Improve initialization step/loader.

  if (!value) {
    return null;
  }

  return /*#__PURE__*/React.createElement(WalletManagerContext.Provider, {
    value: value
  }, children, coreState.status === CosmosWalletStatus.ChoosingWallet && /*#__PURE__*/React.createElement(SelectWalletModal, {
    classNames: classNames,
    closeIcon: closeIcon,
    isOpen: true,
    onClose: stopConnecting,
    selectWallet: connectToWallet,
    wallets: coreState.enabledWallets
  }), coreState.status === CosmosWalletStatus.PendingWalletConnect && coreState.walletConnectQrUri && /*#__PURE__*/React.createElement(WalletConnectModal, {
    classNames: classNames,
    closeIcon: closeIcon,
    isOpen: true,
    onClose: () => disconnect().finally(cleanupAfterConnection),
    reset: reset,
    uri: coreState.walletConnectQrUri,
    deeplinkFormats: coreState.connectingWallet?.walletConnectDeeplinkFormats
  }), coreState.status === CosmosWalletStatus.EnablingWallet && /*#__PURE__*/React.createElement(EnablingWalletModal, {
    classNames: classNames,
    closeIcon: closeIcon,
    isOpen: true,
    onClose: stopConnecting,
    renderLoader: renderLoader,
    reset: reset
  }));
};