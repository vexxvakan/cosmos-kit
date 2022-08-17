"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWalletManager = exports.useWallet = exports.WalletManagerContext = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _core = require("@cosmos-kit/core");

var _types = require("@cosmos-kit/types");

var _react = require("react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var WalletManagerContext = /*#__PURE__*/(0, _react.createContext)(null);
exports.WalletManagerContext = WalletManagerContext;

var useWalletManager = function useWalletManager() {
  var context = (0, _react.useContext)(WalletManagerContext);

  if (!context) {
    throw new Error('You forgot to use WalletManagerProvider.');
  }

  return context;
};

exports.useWalletManager = useWalletManager;

var useWallet = function useWallet(chainId) {
  var _useWalletManager = useWalletManager(),
      managerStatus = _useWalletManager.status,
      managerError = _useWalletManager.error,
      managerConnectedWallet = _useWalletManager.connectedWallet,
      chainInfoOverrides = _useWalletManager.chainInfoOverrides,
      getSigningCosmWasmClientOptions = _useWalletManager.getSigningCosmWasmClientOptions,
      getSigningStargateClientOptions = _useWalletManager.getSigningStargateClientOptions;

  var _useState = (0, _react.useState)(_types.CosmosWalletStatus.Uninitialized),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      chainIdStatus = _useState2[0],
      setChainIdStatus = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      chainIdError = _useState4[0],
      setChainIdError = _useState4[1];

  var _useState5 = (0, _react.useState)(),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      chainIdConnectedWallet = _useState6[0],
      setChainIdConnectedWallet = _useState6[1];

  (0, _react.useEffect)(function () {
    if (managerStatus !== _types.CosmosWalletStatus.Connected || !managerConnectedWallet || !chainId) {
      // If the initial wallet client is not yet connected, this chainId
      // cannot be connected to yet and is thus still initializing.
      setChainIdStatus(_types.CosmosWalletStatus.Uninitialized);
      setChainIdConnectedWallet(undefined);
      setChainIdError(undefined);
      return;
    }

    var connect = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var chainInfo;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setChainIdStatus(_types.CosmosWalletStatus.Connecting);
                setChainIdError(undefined);
                _context.next = 4;
                return (0, _core.getChainInfo)(chainId, chainInfoOverrides);

              case 4:
                chainInfo = _context.sent;
                _context.t0 = setChainIdConnectedWallet;
                _context.t1 = _core.getConnectedWalletInfo;
                _context.t2 = managerConnectedWallet.wallet;
                _context.t3 = managerConnectedWallet.walletClient;
                _context.t4 = chainInfo;
                _context.next = 12;
                return getSigningCosmWasmClientOptions === null || getSigningCosmWasmClientOptions === void 0 ? void 0 : getSigningCosmWasmClientOptions(chainInfo);

              case 12:
                _context.t5 = _context.sent;
                _context.next = 15;
                return getSigningStargateClientOptions === null || getSigningStargateClientOptions === void 0 ? void 0 : getSigningStargateClientOptions(chainInfo);

              case 15:
                _context.t6 = _context.sent;
                _context.next = 18;
                return (0, _context.t1)(_context.t2, _context.t3, _context.t4, _context.t5, _context.t6);

              case 18:
                _context.t7 = _context.sent;
                (0, _context.t0)(_context.t7);
                setChainIdStatus(_types.CosmosWalletStatus.Connected);

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function connect() {
        return _ref.apply(this, arguments);
      };
    }();

    connect()["catch"](function (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setChainIdError(error);
      setChainIdStatus(_types.CosmosWalletStatus.Errored);
    });
  }, [managerStatus, managerConnectedWallet, chainId, getSigningCosmWasmClientOptions, getSigningStargateClientOptions, chainInfoOverrides]);
  var status = chainId ? chainIdStatus : managerStatus;
  var connected = status === _types.CosmosWalletStatus.Connected;
  var error = chainId ? chainIdError : managerError;
  var connectedWallet = chainId ? chainIdConnectedWallet : managerConnectedWallet;
  return _objectSpread({
    status: status,
    connected: connected,
    error: error
  }, connectedWallet);
};

exports.useWallet = useWallet;