import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import { getChainInfo, getConnectedWalletInfo } from '@cosmos-kit/core';
import { CosmosWalletStatus } from '@cosmos-kit/types';
import { createContext, useContext, useEffect, useState } from 'react';
export const WalletManagerContext = /*#__PURE__*/createContext(null);
export const useWalletManager = () => {
  const context = useContext(WalletManagerContext);

  if (!context) {
    throw new Error('You forgot to use WalletManagerProvider.');
  }

  return context;
};
export const useWallet = chainId => {
  const {
    status: managerStatus,
    error: managerError,
    connectedWallet: managerConnectedWallet,
    chainInfoOverrides,
    getSigningCosmWasmClientOptions,
    getSigningStargateClientOptions
  } = useWalletManager();
  const [chainIdStatus, setChainIdStatus] = useState(CosmosWalletStatus.Uninitialized);
  const [chainIdError, setChainIdError] = useState();
  const [chainIdConnectedWallet, setChainIdConnectedWallet] = useState();
  useEffect(() => {
    if (managerStatus !== CosmosWalletStatus.Connected || !managerConnectedWallet || !chainId) {
      // If the initial wallet client is not yet connected, this chainId
      // cannot be connected to yet and is thus still initializing.
      setChainIdStatus(CosmosWalletStatus.Uninitialized);
      setChainIdConnectedWallet(undefined);
      setChainIdError(undefined);
      return;
    }

    const connect = async () => {
      setChainIdStatus(CosmosWalletStatus.Connecting);
      setChainIdError(undefined);
      const chainInfo = await getChainInfo(chainId, chainInfoOverrides);
      setChainIdConnectedWallet( // TODO: Cache
      await getConnectedWalletInfo(managerConnectedWallet.wallet, managerConnectedWallet.walletClient, chainInfo, await getSigningCosmWasmClientOptions?.(chainInfo), await getSigningStargateClientOptions?.(chainInfo)));
      setChainIdStatus(CosmosWalletStatus.Connected);
    };

    connect().catch(error => {
      // eslint-disable-next-line no-console
      console.error(error);
      setChainIdError(error);
      setChainIdStatus(CosmosWalletStatus.Errored);
    });
  }, [managerStatus, managerConnectedWallet, chainId, getSigningCosmWasmClientOptions, getSigningStargateClientOptions, chainInfoOverrides]);
  const status = chainId ? chainIdStatus : managerStatus;
  const connected = status === CosmosWalletStatus.Connected;
  const error = chainId ? chainIdError : managerError;
  const connectedWallet = chainId ? chainIdConnectedWallet : managerConnectedWallet;
  return _objectSpread({
    status,
    connected,
    error
  }, connectedWallet);
};