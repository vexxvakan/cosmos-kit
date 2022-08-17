import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { IndexedDBKVStore } from '@keplr-wallet/common';
import { CosmJSOfflineSigner, CosmJSOfflineSignerOnlyAmino } from '@keplr-wallet/provider';
import { isAndroid, isMobile } from '@walletconnect/browser-utils';
import { payloadId } from '@walletconnect/utils';
import Axios from 'axios';
import { Buffer } from 'buffer';
import deepmerge from 'deepmerge';
// VersionFormatRegExp checks if a chainID is in the format required for parsing versions
// The chainID should be in the form: `{identifier}-{version}`
const ChainVersionFormatRegExp = /(.+)-([\d]+)/;

function parseChainId(chainId) {
  const split = chainId.split(ChainVersionFormatRegExp).filter(Boolean);

  if (split.length !== 2) {
    return {
      identifier: chainId,
      version: 0
    };
  } else {
    return {
      identifier: split[0],
      version: parseInt(split[1])
    };
  }
}

export class KeplrWalletConnectV1 {
  signEthereum(chainId, signer, data, type) {
    // noop
    return null;
  }

  constructor(connector, chainInfos, options = {}) {
    _defineProperty(this, "kvStore", void 0);

    _defineProperty(this, "onBeforeSendRequest", void 0);

    _defineProperty(this, "onAfterSendRequest", void 0);

    _defineProperty(this, "dontOpenAppOnEnable", false);

    _defineProperty(this, "connector", void 0);

    _defineProperty(this, "chainInfos", void 0);

    _defineProperty(this, "version", '0.9.0');

    _defineProperty(this, "mode", 'walletconnect');

    _defineProperty(this, "defaultOptions", {});

    _defineProperty(this, "onCallReqeust", async (error, payload) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return;
      }

      if (!payload || typeof payload !== 'object' || !('method' in payload && 'params' in payload)) {
        return;
      }

      if (payload.method === 'keplr_keystore_may_changed_event_wallet_connect_v1') {
        const param = payload.params[0];

        if (!param) {
          return;
        }

        const lastSeenKeys = await this.getAllLastSeenKey();

        if (!lastSeenKeys) {
          return;
        }

        const mayChangedKeyMap = {};

        for (const mayChangedKey of param.keys) {
          mayChangedKeyMap[mayChangedKey.chainIdentifier] = {
            address: mayChangedKey.address,
            algo: param.algo,
            bech32Address: mayChangedKey.bech32Address,
            isNanoLedger: param.isNanoLedger,
            name: param.name,
            pubKey: mayChangedKey.pubKey
          };
        }

        let hasChanged = false;

        for (const chainId of Object.keys(lastSeenKeys)) {
          const savedKey = lastSeenKeys[chainId];

          if (savedKey) {
            const {
              identifier
            } = parseChainId(chainId);
            const mayChangedKey = mayChangedKeyMap[identifier];

            if (mayChangedKey) {
              if (mayChangedKey.algo !== savedKey.algo || mayChangedKey.name !== savedKey.name || mayChangedKey.isNanoLedger !== savedKey.isNanoLedger || mayChangedKey.address !== savedKey.address || mayChangedKey.bech32Address !== savedKey.bech32Address || mayChangedKey.pubKey !== savedKey.pubKey) {
                hasChanged = true;
                lastSeenKeys[chainId] = mayChangedKey;
              }
            }
          }
        }

        if (hasChanged) {
          await this.saveAllLastSeenKey(lastSeenKeys);
          window.dispatchEvent(new Event('keplr_keystorechange'));
        }
      }
    });

    this.connector = connector;
    this.chainInfos = chainInfos;
    this.kvStore = options.kvStore ?? new IndexedDBKVStore('keplr_wallet_connect');
    this.onBeforeSendRequest = options.onBeforeSendRequest;
    this.onAfterSendRequest = options.onAfterSendRequest;
    connector.on('disconnect', () => {
      this.clearSaved();
    });
    connector.on('call_request', this.onCallReqeust);
  }

  async clearSaved() {
    await Promise.all([this.kvStore.set(this.getKeyHasEnabled(), null), this.kvStore.set(this.getKeyLastSeenKey(), null)]);
  }

  async sendCustomRequest(request, options) {
    // If mobile, attempt to open app to approve request.
    if (isMobile()) {
      switch (request.method) {
        case 'keplr_enable_wallet_connect_v1':
          {
            if (this.dontOpenAppOnEnable) break; // Fall through to open the app.
          }
        // eslint-disable-next-line no-fallthrough

        case 'keplr_sign_amino_wallet_connect_v1':
          // Prompt to open the app.
          window.location.href = isAndroid() ? 'intent://wcV1#Intent;package=com.chainapsis.keplr;scheme=keplrwallet;end;' : 'keplrwallet://wcV1';
      }
    }

    if (this.onBeforeSendRequest) {
      await this.onBeforeSendRequest(request, options);
    }

    const res = await this.connector.sendCustomRequest(request, options);

    if (this.onAfterSendRequest) {
      await this.onAfterSendRequest(res, request, options);
    }

    return res;
  }

  async enable(chainIds) {
    if (typeof chainIds === 'string') {
      chainIds = [chainIds];
    }

    const hasEnabledChainIds = await this.getHasEnabledChainIds();
    let allEnabled = true;

    for (const chainId of chainIds) {
      if (hasEnabledChainIds.indexOf(chainId) < 0) {
        allEnabled = false;
        break;
      }
    }

    if (allEnabled) {
      return;
    }

    await this.sendCustomRequest({
      id: payloadId(),
      jsonrpc: '2.0',
      method: 'keplr_enable_wallet_connect_v1',
      params: chainIds
    });
    await this.saveHasEnabledChainIds(chainIds);
  }

  getKeyHasEnabled() {
    return `${this.connector.session.key}-enabled`;
  }

  async getHasEnabledChainIds() {
    return (await this.kvStore.get(this.getKeyHasEnabled())) ?? [];
  }

  async saveHasEnabledChainIds(chainIds) {
    const hasEnabledChainIds = await this.getHasEnabledChainIds();

    for (const chainId of chainIds) {
      if (hasEnabledChainIds.indexOf(chainId) < 0) {
        hasEnabledChainIds.push(chainId);
      }
    }

    await this.kvStore.set(this.getKeyHasEnabled(), hasEnabledChainIds);
  }

  enigmaDecrypt(_chainId, _ciphertext, _nonce) {
    throw new Error('Not yet implemented');
  }

  enigmaEncrypt(_chainId, _contractCodeHash, // eslint-disable-next-line @typescript-eslint/ban-types
  _msg) {
    throw new Error('Not yet implemented');
  }

  experimentalSuggestChain(_chainInfo) {
    throw new Error('Not yet implemented');
  }

  getEnigmaPubKey(_chainId) {
    throw new Error('Not yet implemented');
  }

  getEnigmaTxEncryptionKey(_chainId, _nonce) {
    throw new Error('Not yet implemented');
  }

  getEnigmaUtils(_chainId) {
    throw new Error('Not yet implemented');
  }

  async getKey(chainId) {
    const lastSeenKey = await this.getLastSeenKey(chainId);

    if (lastSeenKey) {
      return {
        address: Buffer.from(lastSeenKey.address, 'hex'),
        algo: lastSeenKey.algo,
        bech32Address: lastSeenKey.bech32Address,
        isNanoLedger: lastSeenKey.isNanoLedger,
        name: lastSeenKey.name,
        pubKey: Buffer.from(lastSeenKey.pubKey, 'hex')
      };
    }

    const response = (await this.sendCustomRequest({
      id: payloadId(),
      jsonrpc: '2.0',
      method: 'keplr_get_key_wallet_connect_v1',
      params: [chainId]
    }))[0];
    await this.saveLastSeenKey(chainId, response);
    return {
      address: Buffer.from(response.address, 'hex'),
      algo: response.algo,
      bech32Address: response.bech32Address,
      isNanoLedger: response.isNanoLedger,
      name: response.name,
      pubKey: Buffer.from(response.pubKey, 'hex')
    };
  }

  getKeyLastSeenKey() {
    return `${this.connector.session.key}-key`;
  }

  async getLastSeenKey(chainId) {
    const saved = await this.getAllLastSeenKey();
    return saved ? saved[chainId] : undefined;
  }

  async getAllLastSeenKey() {
    return await this.kvStore.get(this.getKeyLastSeenKey());
  }

  async saveAllLastSeenKey(data) {
    await this.kvStore.set(this.getKeyLastSeenKey(), data);
  }

  async saveLastSeenKey(chainId, response) {
    const saved = (await this.getAllLastSeenKey()) ?? {};
    saved[chainId] = response;
    await this.saveAllLastSeenKey(saved);
  }

  signArbitrary(_chainId, _signer, _data) {
    throw new Error('Not yet implemented');
  }

  verifyArbitrary(_chainId, _signer, _data, _signature) {
    throw new Error('Not yet implemented');
  }

  getOfflineSigner(chainId) {
    return new CosmJSOfflineSigner(chainId, this);
  }

  async getOfflineSignerAuto(chainId) {
    const key = await this.getKey(chainId);
    return key.isNanoLedger ? new CosmJSOfflineSignerOnlyAmino(chainId, this) : new CosmJSOfflineSigner(chainId, this);
  }

  getOfflineSignerOnlyAmino(chainId) {
    return new CosmJSOfflineSignerOnlyAmino(chainId, this);
  }

  getSecret20ViewingKey(_chainId, _contractAddress) {
    throw new Error('Not yet implemented');
  }

  async sendTx(chainId, tx, mode) {
    const chainInfo = this.chainInfos.find(chainInfo => chainInfo.chainId === chainId);
    if (!chainInfo) throw new Error('No chain info found.');
    const restInstance = Axios.create({
      baseURL: chainInfo.rest
    });
    const isProtoTx = Buffer.isBuffer(tx) || tx instanceof Uint8Array;
    const params = isProtoTx ? {
      tx_bytes: Buffer.from(tx).toString('base64'),
      mode: (() => {
        switch (mode) {
          case 'async':
            return 'BROADCAST_MODE_ASYNC';

          case 'block':
            return 'BROADCAST_MODE_BLOCK';

          case 'sync':
            return 'BROADCAST_MODE_SYNC';

          default:
            return 'BROADCAST_MODE_UNSPECIFIED';
        }
      })()
    } : {
      tx,
      mode: mode
    };
    const result = await restInstance.post(isProtoTx ? '/cosmos/tx/v1beta1/txs' : '/txs', params);
    const txResponse = isProtoTx ? result.data['tx_response'] : result.data;

    if (txResponse.code != null && txResponse.code !== 0) {
      throw new Error(txResponse['raw_log']);
    }

    return Buffer.from(txResponse.txhash, 'hex');
  }

  async signAmino(chainId, signer, signDoc, signOptions = {}) {
    return (await this.sendCustomRequest({
      id: payloadId(),
      jsonrpc: '2.0',
      method: 'keplr_sign_amino_wallet_connect_v1',
      params: [chainId, signer, signDoc, deepmerge(this.defaultOptions.sign ?? {}, signOptions)]
    }))[0];
  }

  signDirect(_chainId, _signer, _signDoc, _signOptions = {}) {
    throw new Error('Not yet implemented');
  }

  suggestToken(_chainId, _contractAddress, _viewingKey) {
    throw new Error('Not yet implemented');
  }

}