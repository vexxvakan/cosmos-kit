// Fix Safari's nonexistent browser.storage that is used in @keplr-wallet/common https://github.com/chainapsis/keplr-wallet/blob/4726a96b9663f17b91c5d6b0448bf85ebb4a678a/packages/common/src/kv-store/extension.ts
// eslint-disable-next-line @typescript-eslint/no-namespace
if (typeof window !== 'undefined' && typeof browser !== 'undefined' && typeof browser.storage === 'undefined') {
  browser.storage = {
    local: {
      get: undefined,
      set: undefined
    }
  };
}

export * from './types';
export * from './wallets';