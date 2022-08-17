"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalletManagerProvider = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _core = require("@cosmos-kit/core");

var _types = require("@cosmos-kit/types");

var _react = _interopRequireWildcard(require("react"));

var _ui = require("./ui");

var _WalletManagerContext = require("./WalletManagerContext");

var _excluded = ["children", "classNames", "closeIcon", "renderLoader"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var WalletManagerProvider = function WalletManagerProvider(_ref) {
  var _coreState$connecting;

  var children = _ref.children,
      classNames = _ref.classNames,
      closeIcon = _ref.closeIcon,
      renderLoader = _ref.renderLoader,
      config = (0, _objectWithoutProperties2["default"])(_ref, _excluded);

  var _useState = (0, _react.useState)(),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      coreState = _useState2[0],
      setCoreState = _useState2[1]; // Initialize on mount.


  (0, _react.useEffect)(function () {
    (0, _core.initialize)(config, [setCoreState]); // Only initialize once, on mount. Not everytime the config props change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Memoize context data.

  var value = (0, _react.useMemo)(function () {
    return coreState && _objectSpread(_objectSpread({}, coreState), {}, {
      connect: _core.beginConnection,
      disconnect: _core.disconnect,
      connected: coreState.status === _types.CosmosWalletStatus.Connected
    });
  }, [coreState]); // TODO: Improve initialization step/loader.

  if (!value) {
    return null;
  }

  return /*#__PURE__*/_react["default"].createElement(_WalletManagerContext.WalletManagerContext.Provider, {
    value: value
  }, children, coreState.status === _types.CosmosWalletStatus.ChoosingWallet && /*#__PURE__*/_react["default"].createElement(_ui.SelectWalletModal, {
    classNames: classNames,
    closeIcon: closeIcon,
    isOpen: true,
    onClose: _core.stopConnecting,
    selectWallet: _core.connectToWallet,
    wallets: coreState.enabledWallets
  }), coreState.status === _types.CosmosWalletStatus.PendingWalletConnect && coreState.walletConnectQrUri && /*#__PURE__*/_react["default"].createElement(_ui.WalletConnectModal, {
    classNames: classNames,
    closeIcon: closeIcon,
    isOpen: true,
    onClose: function onClose() {
      return (0, _core.disconnect)()["finally"](_core.cleanupAfterConnection);
    },
    reset: _core.reset,
    uri: coreState.walletConnectQrUri,
    deeplinkFormats: (_coreState$connecting = coreState.connectingWallet) === null || _coreState$connecting === void 0 ? void 0 : _coreState$connecting.walletConnectDeeplinkFormats
  }), coreState.status === _types.CosmosWalletStatus.EnablingWallet && /*#__PURE__*/_react["default"].createElement(_ui.EnablingWalletModal, {
    classNames: classNames,
    closeIcon: closeIcon,
    isOpen: true,
    onClose: _core.stopConnecting,
    renderLoader: renderLoader,
    reset: _core.reset
  }));
};

exports.WalletManagerProvider = WalletManagerProvider;