"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopConnecting = exports.reset = exports.initialize = exports.disconnect = exports.connectToWallet = exports.cleanupAfterConnection = exports.beginConnection = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _registry = require("@cosmos-kit/registry");

var _types = require("@cosmos-kit/types");

var _chainInfo = require("../chainInfo");

var _walletInfo = require("../walletInfo");

var _state = require("./state");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var refreshListener = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var _state$connectedWalle, _state$connectedWalle2;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Reconnect to wallet, since name/address may have changed.
            if (_state.state.status === _types.CosmosWalletStatus.Connected && _state.state.connectedWallet) {
              // Remove refresh listener because it will be readded after connection.
              (_state$connectedWalle = (_state$connectedWalle2 = _state.state.connectedWallet.wallet).removeRefreshListener) === null || _state$connectedWalle === void 0 ? void 0 : _state$connectedWalle.call(_state$connectedWalle2, refreshListener);
              connectToWallet(_state.state.connectedWallet.wallet);
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function refreshListener() {
    return _ref.apply(this, arguments);
  };
}(); //! API


var initialize = function initialize(initialConfig, observers) {
  var _initialConfig$enable;

  // Setup internal state.
  (0, _state.setConfig)(_objectSpread(_objectSpread({}, initialConfig), {}, {
    // Fallback to all wallets.
    enabledWallets: (_initialConfig$enable = initialConfig.enabledWallets) !== null && _initialConfig$enable !== void 0 ? _initialConfig$enable : _registry.Wallets
  }));

  if (observers !== null && observers !== void 0 && observers.length) {
    _state.addStateObservers.apply(void 0, (0, _toConsumableArray2["default"])(observers));
  } // Initialize state.


  (0, _state.updateState)({
    status: _types.CosmosWalletStatus.Disconnected,
    // Pass through from initialization config.
    chainInfoOverrides: _state.config.chainInfoOverrides,
    getSigningCosmWasmClientOptions: _state.config.getSigningCosmWasmClientOptions,
    getSigningStargateClientOptions: _state.config.getSigningStargateClientOptions,
    enabledWallets: _state.config.enabledWallets
  });

  var maybeAutoConnect = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var autoconnectWalletIndex, localStorageValue, localStorageWallet;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return Promise.all(_state.config.enabledWallets.map(function (_ref3) {
                var _shouldAutoconnect;

                var shouldAutoconnect = _ref3.shouldAutoconnect;
                return (_shouldAutoconnect = shouldAutoconnect === null || shouldAutoconnect === void 0 ? void 0 : shouldAutoconnect()) !== null && _shouldAutoconnect !== void 0 ? _shouldAutoconnect : false;
              }));

            case 2:
              autoconnectWalletIndex = _context2.sent.findIndex(function (value) {
                return value;
              });

              if (!(autoconnectWalletIndex > -1)) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", beginConnection(_state.config.enabledWallets[autoconnectWalletIndex]));

            case 5:
              // Check local storage.
              localStorageValue = _state.config.localStorageKey ? localStorage.getItem(_state.config.localStorageKey) : null;
              localStorageWallet = localStorageValue && _state.config.enabledWallets.find(function (_ref4) {
                var id = _ref4.id;
                return id === localStorageValue;
              }); // If wallet found from localStorage value, auto connect.

              if (!localStorageWallet) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", beginConnection(localStorageWallet));

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function maybeAutoConnect() {
      return _ref2.apply(this, arguments);
    };
  }();

  maybeAutoConnect();
}; // Closes modals and clears connection state.


exports.initialize = initialize;

var cleanupAfterConnection = function cleanupAfterConnection() {
  (0, _state.updateState)({
    walletConnectQrUri: undefined,
    connectingWallet: undefined
  }); // Cleanup WalletConnect QR if necessary.

  _state.onQrCloseCallback === null || _state.onQrCloseCallback === void 0 ? void 0 : (0, _state.onQrCloseCallback)();
  (0, _state.setOnQrCloseCallback)(undefined);
}; // Connect WalletConnect client if necessary, and then connect to the wallet.


exports.cleanupAfterConnection = cleanupAfterConnection;

var connectToWallet = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(wallet) {
    var walletClient, finalizeWalletConnection, currConnectionAttempt;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            (0, _state.updateState)({
              status: _types.CosmosWalletStatus.Connecting,
              error: undefined,
              connectingWallet: wallet
            });

            // The actual meat of enabling and getting the wallet clients.
            finalizeWalletConnection = /*#__PURE__*/function () {
              var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(newWcSession) {
                var _config$getSigningCos, _config$getSigningSta, _wallet$addRefreshLis;

                var chainInfo, connectedWallet, _wallet$cleanupClient;

                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        (0, _state.updateState)({
                          status: _types.CosmosWalletStatus.EnablingWallet
                        });
                        _context3.next = 3;
                        return (0, _chainInfo.getChainInfo)(_state.config.defaultChainId, _state.config.chainInfoOverrides);

                      case 3:
                        chainInfo = _context3.sent;
                        _context3.next = 6;
                        return wallet.getClient(chainInfo, _state.walletConnect, newWcSession);

                      case 6:
                        walletClient = _context3.sent;

                        if (walletClient) {
                          _context3.next = 9;
                          break;
                        }

                        throw new Error('Failed to retrieve wallet client.');

                      case 9:
                        _context3.t0 = _walletInfo.getConnectedWalletInfo;
                        _context3.t1 = wallet;
                        _context3.t2 = walletClient;
                        _context3.t3 = chainInfo;
                        _context3.next = 15;
                        return (_config$getSigningCos = _state.config.getSigningCosmWasmClientOptions) === null || _config$getSigningCos === void 0 ? void 0 : _config$getSigningCos.call(_state.config, chainInfo);

                      case 15:
                        _context3.t4 = _context3.sent;
                        _context3.next = 18;
                        return (_config$getSigningSta = _state.config.getSigningStargateClientOptions) === null || _config$getSigningSta === void 0 ? void 0 : _config$getSigningSta.call(_state.config, chainInfo);

                      case 18:
                        _context3.t5 = _context3.sent;
                        _context3.next = 21;
                        return (0, _context3.t0)(_context3.t1, _context3.t2, _context3.t3, _context3.t4, _context3.t5);

                      case 21:
                        connectedWallet = _context3.sent;
                        // Add refresh listener to update connected wallet info.
                        (_wallet$addRefreshLis = wallet.addRefreshListener) === null || _wallet$addRefreshLis === void 0 ? void 0 : _wallet$addRefreshLis.call(wallet, refreshListener); // Allow to fail silently.

                        _context3.prev = 23;
                        _context3.next = 26;
                        return (_wallet$cleanupClient = wallet.cleanupClient) === null || _wallet$cleanupClient === void 0 ? void 0 : _wallet$cleanupClient.call(wallet, walletClient);

                      case 26:
                        // Save localStorage value for future autoconnection.
                        if (_state.config.localStorageKey) {
                          localStorage.setItem(_state.config.localStorageKey, wallet.id);
                        }

                        _context3.next = 32;
                        break;

                      case 29:
                        _context3.prev = 29;
                        _context3.t6 = _context3["catch"](23);
                        // eslint-disable-next-line no-console
                        console.error(_context3.t6);

                      case 32:
                        (0, _state.updateState)({
                          status: _types.CosmosWalletStatus.Connected,
                          connectedWallet: connectedWallet
                        });

                      case 33:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, null, [[23, 29]]);
              }));

              return function finalizeWalletConnection(_x2) {
                return _ref6.apply(this, arguments);
              };
            }();

            _context4.prev = 2;

            if (!wallet.isWalletConnect) {
              _context4.next = 30;
              break;
            }

            if (wallet.walletConnectSigningMethods) {
              _context4.next = 6;
              break;
            }

            throw new Error('Wallet definition missing WalletConnect signing methods.');

          case 6:
            if (_state.walletConnect) {
              _context4.next = 16;
              break;
            }

            _context4.t0 = _state.setWalletConnect;
            _context4.next = 10;
            return Promise.resolve().then(function () {
              return _interopRequireWildcard(require('@walletconnect/client'));
            });

          case 10:
            _context4.t1 = _context4.sent["default"];
            _context4.t2 = {
              bridge: 'https://bridge.walletconnect.org',
              signingMethods: wallet.walletConnectSigningMethods,
              qrcodeModal: {
                open: function open(walletConnectQrUri, closeCallback) {
                  (0, _state.setOnQrCloseCallback)(closeCallback);
                  (0, _state.updateState)({
                    status: _types.CosmosWalletStatus.PendingWalletConnect,
                    walletConnectQrUri: walletConnectQrUri
                  });
                },
                // Occurs on disconnect, which is handled elsewhere.
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                close: function close() {}
              } // clientMeta,

            };
            _context4.t3 = new _context4.t1(_context4.t2);
            (0, _context4.t0)(_context4.t3);
            // clientMeta in constructor is ignored for some reason, so
            // let's set it directly :)))))))))))))
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            _state.walletConnect._clientMeta = _state.config.walletConnectClientMeta; // Detect disconnected WalletConnect session and clear wallet state.

            _state.walletConnect.on('disconnect', function () {
              // eslint-disable-next-line no-console
              console.log('WalletConnect disconnected.');
              disconnect(true);
              cleanupAfterConnection();
            });

          case 16:
            if (!_state.walletConnect.connected) {
              _context4.next = 21;
              break;
            }

            _context4.next = 19;
            return finalizeWalletConnection(false);

          case 19:
            _context4.next = 28;
            break;

          case 21:
            // Prevent double requests by checking which connection attempt
            // we're on before and after starting the connection attempt.
            currConnectionAttempt = (0, _state.nextWalletConnectConnectionAttempt)(); // Executes walletConnect's qrcodeModal.open.

            _context4.next = 24;
            return _state.walletConnect.connect();

          case 24:
            if (!(_state.walletConnectConnectionAttempt !== currConnectionAttempt)) {
              _context4.next = 26;
              break;
            }

            return _context4.abrupt("return");

          case 26:
            _context4.next = 28;
            return finalizeWalletConnection(true);

          case 28:
            _context4.next = 32;
            break;

          case 30:
            _context4.next = 32;
            return finalizeWalletConnection();

          case 32:
            _context4.next = 38;
            break;

          case 34:
            _context4.prev = 34;
            _context4.t4 = _context4["catch"](2);
            // eslint-disable-next-line no-console
            console.error(_context4.t4);
            (0, _state.updateState)({
              status: _types.CosmosWalletStatus.Errored,
              error: _context4.t4
            });

          case 38:
            _context4.prev = 38;
            cleanupAfterConnection();
            return _context4.finish(38);

          case 41:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 34, 38, 41]]);
  }));

  return function connectToWallet(_x) {
    return _ref5.apply(this, arguments);
  };
}(); // Begin connection process, either auto-selecting a wallet or opening
// the selection modal.


exports.connectToWallet = connectToWallet;

var beginConnection = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(wallet) {
    var preselectedWallet;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!(_state.state.status === _types.CosmosWalletStatus.Uninitialized)) {
              _context5.next = 2;
              break;
            }

            throw new Error('Cannot connect before initialization.');

          case 2:
            (0, _state.updateState)({
              status: _types.CosmosWalletStatus.Connecting,
              error: undefined
            }); // If wallet passed, connect to it.

            if (!wallet) {
              _context5.next = 6;
              break;
            }

            connectToWallet(wallet);
            return _context5.abrupt("return");

          case 6:
            // Check if modal should be displayed or skipped with a wallet preselected.
            preselectedWallet = // If only one wallet is available, preselect it, no need to show modal.
            _state.config.enabledWallets.length === 1 ? _state.config.enabledWallets[0] : // Connect to preselected wallet if present.
            _state.config.preselectedWalletId ? _state.config.enabledWallets.find(function (_ref8) {
              var id = _ref8.id;
              return id === _state.config.preselectedWalletId;
            }) : undefined;

            if (!preselectedWallet) {
              _context5.next = 10;
              break;
            }

            connectToWallet(preselectedWallet);
            return _context5.abrupt("return");

          case 10:
            // If no preselected wallet, set status to choosing wallet to inform UI that a
            // wallet needs to be chosen and `connectToWallet` needs to be called
            // manually.
            (0, _state.updateState)({
              status: _types.CosmosWalletStatus.ChoosingWallet
            });

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function beginConnection(_x3) {
    return _ref7.apply(this, arguments);
  };
}(); // Disconnect from connected wallet.


exports.beginConnection = beginConnection;

var disconnect = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(dontKillWalletConnect) {
    var _state$connectedWalle3, _state$connectedWalle4;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            // Remove refresh listener.
            if (_state.state.connectedWallet) {
              (_state$connectedWalle3 = (_state$connectedWalle4 = _state.state.connectedWallet.wallet).removeRefreshListener) === null || _state$connectedWalle3 === void 0 ? void 0 : _state$connectedWalle3.call(_state$connectedWalle4, refreshListener);
            } // Disconnect wallet.


            (0, _state.updateState)({
              status: _types.CosmosWalletStatus.Disconnected,
              connectedWallet: undefined
            }); // Remove localStorage value.

            if (_state.config.localStorageKey) {
              localStorage.removeItem(_state.config.localStorageKey);
            } // Disconnect WalletConnect.


            if (!(_state.walletConnect !== null && _state.walletConnect !== void 0 && _state.walletConnect.connected && !dontKillWalletConnect)) {
              _context6.next = 6;
              break;
            }

            _context6.next = 6;
            return _state.walletConnect.killSession();

          case 6:
            (0, _state.setWalletConnect)(undefined);

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function disconnect(_x4) {
    return _ref9.apply(this, arguments);
  };
}(); // Reset.


exports.disconnect = disconnect;

var reset = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return disconnect()["catch"](console.error);

          case 2:
            // Try resetting all wallet state and reconnecting.
            if (_state.state.connectingWallet) {
              cleanupAfterConnection();
              connectToWallet(_state.state.connectingWallet);
            } else {
              // If no wallet to reconnect to, just reload.
              window.location.reload();
            }

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function reset() {
    return _ref10.apply(this, arguments);
  };
}(); // Interrupt connection process, such as if the user closes a connection modal.


exports.reset = reset;

var stopConnecting = function stopConnecting() {
  (0, _state.updateState)({
    status: _types.CosmosWalletStatus.Disconnected,
    walletConnectQrUri: undefined,
    connectedWallet: undefined,
    connectingWallet: undefined
  });
};

exports.stopConnecting = stopConnecting;