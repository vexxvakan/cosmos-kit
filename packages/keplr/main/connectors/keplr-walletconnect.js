"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeplrWalletConnectV1 = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _common = require("@keplr-wallet/common");

var _provider = require("@keplr-wallet/provider");

var _browserUtils = require("@walletconnect/browser-utils");

var _utils = require("@walletconnect/utils");

var _axios = _interopRequireDefault(require("axios"));

var _buffer = require("buffer");

var _deepmerge = _interopRequireDefault(require("deepmerge"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// VersionFormatRegExp checks if a chainID is in the format required for parsing versions
// The chainID should be in the form: `{identifier}-{version}`
var ChainVersionFormatRegExp = /(.+)-([\d]+)/;

function parseChainId(chainId) {
  var split = chainId.split(ChainVersionFormatRegExp).filter(Boolean);

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

var KeplrWalletConnectV1 = /*#__PURE__*/function () {
  function KeplrWalletConnectV1(connector, chainInfos) {
    var _this = this,
        _options$kvStore;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _classCallCheck2["default"])(this, KeplrWalletConnectV1);
    (0, _defineProperty2["default"])(this, "kvStore", void 0);
    (0, _defineProperty2["default"])(this, "onBeforeSendRequest", void 0);
    (0, _defineProperty2["default"])(this, "onAfterSendRequest", void 0);
    (0, _defineProperty2["default"])(this, "dontOpenAppOnEnable", false);
    (0, _defineProperty2["default"])(this, "connector", void 0);
    (0, _defineProperty2["default"])(this, "chainInfos", void 0);
    (0, _defineProperty2["default"])(this, "version", '0.9.0');
    (0, _defineProperty2["default"])(this, "mode", 'walletconnect');
    (0, _defineProperty2["default"])(this, "defaultOptions", {});
    (0, _defineProperty2["default"])(this, "onCallReqeust", /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(error, payload) {
        var param, lastSeenKeys, mayChangedKeyMap, _iterator, _step, _mayChangedKey, hasChanged, _i, _Object$keys, _chainId2, savedKey, _parseChainId, identifier, mayChangedKey;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!error) {
                  _context.next = 3;
                  break;
                }

                // eslint-disable-next-line no-console
                console.log(error);
                return _context.abrupt("return");

              case 3:
                if (!(!payload || (0, _typeof2["default"])(payload) !== 'object' || !('method' in payload && 'params' in payload))) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return");

              case 5:
                if (!(payload.method === 'keplr_keystore_may_changed_event_wallet_connect_v1')) {
                  _context.next = 23;
                  break;
                }

                param = payload.params[0];

                if (param) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return");

              case 9:
                _context.next = 11;
                return _this.getAllLastSeenKey();

              case 11:
                lastSeenKeys = _context.sent;

                if (lastSeenKeys) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt("return");

              case 14:
                mayChangedKeyMap = {};
                _iterator = _createForOfIteratorHelper(param.keys);

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    _mayChangedKey = _step.value;
                    mayChangedKeyMap[_mayChangedKey.chainIdentifier] = {
                      address: _mayChangedKey.address,
                      algo: param.algo,
                      bech32Address: _mayChangedKey.bech32Address,
                      isNanoLedger: param.isNanoLedger,
                      name: param.name,
                      pubKey: _mayChangedKey.pubKey
                    };
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

                hasChanged = false;

                for (_i = 0, _Object$keys = Object.keys(lastSeenKeys); _i < _Object$keys.length; _i++) {
                  _chainId2 = _Object$keys[_i];
                  savedKey = lastSeenKeys[_chainId2];

                  if (savedKey) {
                    _parseChainId = parseChainId(_chainId2), identifier = _parseChainId.identifier;
                    mayChangedKey = mayChangedKeyMap[identifier];

                    if (mayChangedKey) {
                      if (mayChangedKey.algo !== savedKey.algo || mayChangedKey.name !== savedKey.name || mayChangedKey.isNanoLedger !== savedKey.isNanoLedger || mayChangedKey.address !== savedKey.address || mayChangedKey.bech32Address !== savedKey.bech32Address || mayChangedKey.pubKey !== savedKey.pubKey) {
                        hasChanged = true;
                        lastSeenKeys[_chainId2] = mayChangedKey;
                      }
                    }
                  }
                }

                if (!hasChanged) {
                  _context.next = 23;
                  break;
                }

                _context.next = 22;
                return _this.saveAllLastSeenKey(lastSeenKeys);

              case 22:
                window.dispatchEvent(new Event('keplr_keystorechange'));

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
    this.connector = connector;
    this.chainInfos = chainInfos;
    this.kvStore = (_options$kvStore = options.kvStore) !== null && _options$kvStore !== void 0 ? _options$kvStore : new _common.IndexedDBKVStore('keplr_wallet_connect');
    this.onBeforeSendRequest = options.onBeforeSendRequest;
    this.onAfterSendRequest = options.onAfterSendRequest;
    connector.on('disconnect', function () {
      _this.clearSaved();
    });
    connector.on('call_request', this.onCallReqeust);
  }

  (0, _createClass2["default"])(KeplrWalletConnectV1, [{
    key: "signEthereum",
    value: function signEthereum(chainId, signer, data, type) {
      // noop
      return null;
    }
  }, {
    key: "clearSaved",
    value: function () {
      var _clearSaved = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Promise.all([this.kvStore.set(this.getKeyHasEnabled(), null), this.kvStore.set(this.getKeyLastSeenKey(), null)]);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function clearSaved() {
        return _clearSaved.apply(this, arguments);
      }

      return clearSaved;
    }()
  }, {
    key: "sendCustomRequest",
    value: function () {
      var _sendCustomRequest = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(request, options) {
        var res;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(0, _browserUtils.isMobile)()) {
                  _context3.next = 7;
                  break;
                }

                _context3.t0 = request.method;
                _context3.next = _context3.t0 === 'keplr_enable_wallet_connect_v1' ? 4 : _context3.t0 === 'keplr_sign_amino_wallet_connect_v1' ? 6 : 7;
                break;

              case 4:
                if (!this.dontOpenAppOnEnable) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("break", 7);

              case 6:
                // Prompt to open the app.
                window.location.href = (0, _browserUtils.isAndroid)() ? 'intent://wcV1#Intent;package=com.chainapsis.keplr;scheme=keplrwallet;end;' : 'keplrwallet://wcV1';

              case 7:
                if (!this.onBeforeSendRequest) {
                  _context3.next = 10;
                  break;
                }

                _context3.next = 10;
                return this.onBeforeSendRequest(request, options);

              case 10:
                _context3.next = 12;
                return this.connector.sendCustomRequest(request, options);

              case 12:
                res = _context3.sent;

                if (!this.onAfterSendRequest) {
                  _context3.next = 16;
                  break;
                }

                _context3.next = 16;
                return this.onAfterSendRequest(res, request, options);

              case 16:
                return _context3.abrupt("return", res);

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function sendCustomRequest(_x3, _x4) {
        return _sendCustomRequest.apply(this, arguments);
      }

      return sendCustomRequest;
    }()
  }, {
    key: "enable",
    value: function () {
      var _enable = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(chainIds) {
        var hasEnabledChainIds, allEnabled, _iterator2, _step2, _chainId3;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (typeof chainIds === 'string') {
                  chainIds = [chainIds];
                }

                _context4.next = 3;
                return this.getHasEnabledChainIds();

              case 3:
                hasEnabledChainIds = _context4.sent;
                allEnabled = true;
                _iterator2 = _createForOfIteratorHelper(chainIds);
                _context4.prev = 6;

                _iterator2.s();

              case 8:
                if ((_step2 = _iterator2.n()).done) {
                  _context4.next = 15;
                  break;
                }

                _chainId3 = _step2.value;

                if (!(hasEnabledChainIds.indexOf(_chainId3) < 0)) {
                  _context4.next = 13;
                  break;
                }

                allEnabled = false;
                return _context4.abrupt("break", 15);

              case 13:
                _context4.next = 8;
                break;

              case 15:
                _context4.next = 20;
                break;

              case 17:
                _context4.prev = 17;
                _context4.t0 = _context4["catch"](6);

                _iterator2.e(_context4.t0);

              case 20:
                _context4.prev = 20;

                _iterator2.f();

                return _context4.finish(20);

              case 23:
                if (!allEnabled) {
                  _context4.next = 25;
                  break;
                }

                return _context4.abrupt("return");

              case 25:
                _context4.next = 27;
                return this.sendCustomRequest({
                  id: (0, _utils.payloadId)(),
                  jsonrpc: '2.0',
                  method: 'keplr_enable_wallet_connect_v1',
                  params: chainIds
                });

              case 27:
                _context4.next = 29;
                return this.saveHasEnabledChainIds(chainIds);

              case 29:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[6, 17, 20, 23]]);
      }));

      function enable(_x5) {
        return _enable.apply(this, arguments);
      }

      return enable;
    }()
  }, {
    key: "getKeyHasEnabled",
    value: function getKeyHasEnabled() {
      return "".concat(this.connector.session.key, "-enabled");
    }
  }, {
    key: "getHasEnabledChainIds",
    value: function () {
      var _getHasEnabledChainIds = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        var _yield$this$kvStore$g;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.kvStore.get(this.getKeyHasEnabled());

              case 2:
                _context5.t1 = _yield$this$kvStore$g = _context5.sent;
                _context5.t0 = _context5.t1 !== null;

                if (!_context5.t0) {
                  _context5.next = 6;
                  break;
                }

                _context5.t0 = _yield$this$kvStore$g !== void 0;

              case 6:
                if (!_context5.t0) {
                  _context5.next = 10;
                  break;
                }

                _context5.t2 = _yield$this$kvStore$g;
                _context5.next = 11;
                break;

              case 10:
                _context5.t2 = [];

              case 11:
                return _context5.abrupt("return", _context5.t2);

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getHasEnabledChainIds() {
        return _getHasEnabledChainIds.apply(this, arguments);
      }

      return getHasEnabledChainIds;
    }()
  }, {
    key: "saveHasEnabledChainIds",
    value: function () {
      var _saveHasEnabledChainIds = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(chainIds) {
        var hasEnabledChainIds, _iterator3, _step3, _chainId4;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.getHasEnabledChainIds();

              case 2:
                hasEnabledChainIds = _context6.sent;
                _iterator3 = _createForOfIteratorHelper(chainIds);

                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    _chainId4 = _step3.value;

                    if (hasEnabledChainIds.indexOf(_chainId4) < 0) {
                      hasEnabledChainIds.push(_chainId4);
                    }
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }

                _context6.next = 7;
                return this.kvStore.set(this.getKeyHasEnabled(), hasEnabledChainIds);

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function saveHasEnabledChainIds(_x6) {
        return _saveHasEnabledChainIds.apply(this, arguments);
      }

      return saveHasEnabledChainIds;
    }()
  }, {
    key: "enigmaDecrypt",
    value: function enigmaDecrypt(_chainId, _ciphertext, _nonce) {
      throw new Error('Not yet implemented');
    }
  }, {
    key: "enigmaEncrypt",
    value: function enigmaEncrypt(_chainId, _contractCodeHash, // eslint-disable-next-line @typescript-eslint/ban-types
    _msg) {
      throw new Error('Not yet implemented');
    }
  }, {
    key: "experimentalSuggestChain",
    value: function experimentalSuggestChain(_chainInfo) {
      throw new Error('Not yet implemented');
    }
  }, {
    key: "getEnigmaPubKey",
    value: function getEnigmaPubKey(_chainId) {
      throw new Error('Not yet implemented');
    }
  }, {
    key: "getEnigmaTxEncryptionKey",
    value: function getEnigmaTxEncryptionKey(_chainId, _nonce) {
      throw new Error('Not yet implemented');
    }
  }, {
    key: "getEnigmaUtils",
    value: function getEnigmaUtils(_chainId) {
      throw new Error('Not yet implemented');
    }
  }, {
    key: "getKey",
    value: function () {
      var _getKey = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(chainId) {
        var lastSeenKey, response;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.getLastSeenKey(chainId);

              case 2:
                lastSeenKey = _context7.sent;

                if (!lastSeenKey) {
                  _context7.next = 5;
                  break;
                }

                return _context7.abrupt("return", {
                  address: _buffer.Buffer.from(lastSeenKey.address, 'hex'),
                  algo: lastSeenKey.algo,
                  bech32Address: lastSeenKey.bech32Address,
                  isNanoLedger: lastSeenKey.isNanoLedger,
                  name: lastSeenKey.name,
                  pubKey: _buffer.Buffer.from(lastSeenKey.pubKey, 'hex')
                });

              case 5:
                _context7.next = 7;
                return this.sendCustomRequest({
                  id: (0, _utils.payloadId)(),
                  jsonrpc: '2.0',
                  method: 'keplr_get_key_wallet_connect_v1',
                  params: [chainId]
                });

              case 7:
                response = _context7.sent[0];
                _context7.next = 10;
                return this.saveLastSeenKey(chainId, response);

              case 10:
                return _context7.abrupt("return", {
                  address: _buffer.Buffer.from(response.address, 'hex'),
                  algo: response.algo,
                  bech32Address: response.bech32Address,
                  isNanoLedger: response.isNanoLedger,
                  name: response.name,
                  pubKey: _buffer.Buffer.from(response.pubKey, 'hex')
                });

              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getKey(_x7) {
        return _getKey.apply(this, arguments);
      }

      return getKey;
    }()
  }, {
    key: "getKeyLastSeenKey",
    value: function getKeyLastSeenKey() {
      return "".concat(this.connector.session.key, "-key");
    }
  }, {
    key: "getLastSeenKey",
    value: function () {
      var _getLastSeenKey = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(chainId) {
        var saved;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.getAllLastSeenKey();

              case 2:
                saved = _context8.sent;
                return _context8.abrupt("return", saved ? saved[chainId] : undefined);

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getLastSeenKey(_x8) {
        return _getLastSeenKey.apply(this, arguments);
      }

      return getLastSeenKey;
    }()
  }, {
    key: "getAllLastSeenKey",
    value: function () {
      var _getAllLastSeenKey = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.kvStore.get(this.getKeyLastSeenKey());

              case 2:
                return _context9.abrupt("return", _context9.sent);

              case 3:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getAllLastSeenKey() {
        return _getAllLastSeenKey.apply(this, arguments);
      }

      return getAllLastSeenKey;
    }()
  }, {
    key: "saveAllLastSeenKey",
    value: function () {
      var _saveAllLastSeenKey = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(data) {
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this.kvStore.set(this.getKeyLastSeenKey(), data);

              case 2:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function saveAllLastSeenKey(_x9) {
        return _saveAllLastSeenKey.apply(this, arguments);
      }

      return saveAllLastSeenKey;
    }()
  }, {
    key: "saveLastSeenKey",
    value: function () {
      var _saveLastSeenKey = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(chainId, response) {
        var _yield$this$getAllLas;

        var saved;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return this.getAllLastSeenKey();

              case 2:
                _context11.t1 = _yield$this$getAllLas = _context11.sent;
                _context11.t0 = _context11.t1 !== null;

                if (!_context11.t0) {
                  _context11.next = 6;
                  break;
                }

                _context11.t0 = _yield$this$getAllLas !== void 0;

              case 6:
                if (!_context11.t0) {
                  _context11.next = 10;
                  break;
                }

                _context11.t2 = _yield$this$getAllLas;
                _context11.next = 11;
                break;

              case 10:
                _context11.t2 = {};

              case 11:
                saved = _context11.t2;
                saved[chainId] = response;
                _context11.next = 15;
                return this.saveAllLastSeenKey(saved);

              case 15:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function saveLastSeenKey(_x10, _x11) {
        return _saveLastSeenKey.apply(this, arguments);
      }

      return saveLastSeenKey;
    }()
  }, {
    key: "signArbitrary",
    value: function signArbitrary(_chainId, _signer, _data) {
      throw new Error('Not yet implemented');
    }
  }, {
    key: "verifyArbitrary",
    value: function verifyArbitrary(_chainId, _signer, _data, _signature) {
      throw new Error('Not yet implemented');
    }
  }, {
    key: "getOfflineSigner",
    value: function getOfflineSigner(chainId) {
      return new _provider.CosmJSOfflineSigner(chainId, this);
    }
  }, {
    key: "getOfflineSignerAuto",
    value: function () {
      var _getOfflineSignerAuto = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(chainId) {
        var key;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this.getKey(chainId);

              case 2:
                key = _context12.sent;
                return _context12.abrupt("return", key.isNanoLedger ? new _provider.CosmJSOfflineSignerOnlyAmino(chainId, this) : new _provider.CosmJSOfflineSigner(chainId, this));

              case 4:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function getOfflineSignerAuto(_x12) {
        return _getOfflineSignerAuto.apply(this, arguments);
      }

      return getOfflineSignerAuto;
    }()
  }, {
    key: "getOfflineSignerOnlyAmino",
    value: function getOfflineSignerOnlyAmino(chainId) {
      return new _provider.CosmJSOfflineSignerOnlyAmino(chainId, this);
    }
  }, {
    key: "getSecret20ViewingKey",
    value: function getSecret20ViewingKey(_chainId, _contractAddress) {
      throw new Error('Not yet implemented');
    }
  }, {
    key: "sendTx",
    value: function () {
      var _sendTx = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(chainId, tx, mode) {
        var chainInfo, restInstance, isProtoTx, params, result, txResponse;
        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                chainInfo = this.chainInfos.find(function (chainInfo) {
                  return chainInfo.chainId === chainId;
                });

                if (chainInfo) {
                  _context13.next = 3;
                  break;
                }

                throw new Error('No chain info found.');

              case 3:
                restInstance = _axios["default"].create({
                  baseURL: chainInfo.rest
                });
                isProtoTx = _buffer.Buffer.isBuffer(tx) || tx instanceof Uint8Array;
                params = isProtoTx ? {
                  tx_bytes: _buffer.Buffer.from(tx).toString('base64'),
                  mode: function () {
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
                  }()
                } : {
                  tx: tx,
                  mode: mode
                };
                _context13.next = 8;
                return restInstance.post(isProtoTx ? '/cosmos/tx/v1beta1/txs' : '/txs', params);

              case 8:
                result = _context13.sent;
                txResponse = isProtoTx ? result.data['tx_response'] : result.data;

                if (!(txResponse.code != null && txResponse.code !== 0)) {
                  _context13.next = 12;
                  break;
                }

                throw new Error(txResponse['raw_log']);

              case 12:
                return _context13.abrupt("return", _buffer.Buffer.from(txResponse.txhash, 'hex'));

              case 13:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function sendTx(_x13, _x14, _x15) {
        return _sendTx.apply(this, arguments);
      }

      return sendTx;
    }()
  }, {
    key: "signAmino",
    value: function () {
      var _signAmino = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(chainId, signer, signDoc) {
        var _this$defaultOptions$;

        var signOptions,
            _args14 = arguments;
        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                signOptions = _args14.length > 3 && _args14[3] !== undefined ? _args14[3] : {};
                _context14.next = 3;
                return this.sendCustomRequest({
                  id: (0, _utils.payloadId)(),
                  jsonrpc: '2.0',
                  method: 'keplr_sign_amino_wallet_connect_v1',
                  params: [chainId, signer, signDoc, (0, _deepmerge["default"])((_this$defaultOptions$ = this.defaultOptions.sign) !== null && _this$defaultOptions$ !== void 0 ? _this$defaultOptions$ : {}, signOptions)]
                });

              case 3:
                return _context14.abrupt("return", _context14.sent[0]);

              case 4:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function signAmino(_x16, _x17, _x18) {
        return _signAmino.apply(this, arguments);
      }

      return signAmino;
    }()
  }, {
    key: "signDirect",
    value: function signDirect(_chainId, _signer, _signDoc) {
      var _signOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      throw new Error('Not yet implemented');
    }
  }, {
    key: "suggestToken",
    value: function suggestToken(_chainId, _contractAddress, _viewingKey) {
      throw new Error('Not yet implemented');
    }
  }]);
  return KeplrWalletConnectV1;
}();

exports.KeplrWalletConnectV1 = KeplrWalletConnectV1;