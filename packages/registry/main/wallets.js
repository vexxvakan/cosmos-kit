"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wallets = void 0;

var _keplr = require("@cosmos-kit/keplr");

var Wallets = [_keplr.KeplrWallet, _keplr.KeplrWalletConnectWallet];
exports.Wallets = Wallets;