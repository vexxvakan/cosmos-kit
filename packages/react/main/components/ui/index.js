"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BaseModal = require("./BaseModal");

Object.keys(_BaseModal).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BaseModal[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BaseModal[key];
    }
  });
});

var _CloseIcon = require("./CloseIcon");

Object.keys(_CloseIcon).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CloseIcon[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CloseIcon[key];
    }
  });
});

var _EnablingWalletModal = require("./EnablingWalletModal");

Object.keys(_EnablingWalletModal).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EnablingWalletModal[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _EnablingWalletModal[key];
    }
  });
});

var _SelectWalletModal = require("./SelectWalletModal");

Object.keys(_SelectWalletModal).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SelectWalletModal[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SelectWalletModal[key];
    }
  });
});

var _WalletConnectModal = require("./WalletConnectModal");

Object.keys(_WalletConnectModal).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _WalletConnectModal[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _WalletConnectModal[key];
    }
  });
});