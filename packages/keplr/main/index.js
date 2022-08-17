"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});

var _wallets = require("./wallets");

Object.keys(_wallets).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _wallets[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _wallets[key];
    }
  });
});

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