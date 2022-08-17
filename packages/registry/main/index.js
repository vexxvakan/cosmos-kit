"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
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