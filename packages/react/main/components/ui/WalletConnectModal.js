"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalletConnectModal = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _browserUtils = require("@walletconnect/browser-utils");

var _qrcode = _interopRequireDefault(require("qrcode.react"));

var _react = _interopRequireWildcard(require("react"));

var _BaseModal = require("./BaseModal");

var _excluded = ["isOpen", "uri", "classNames", "reset", "deeplinkFormats"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var IOS_KEPLR_MOBILE_URL = 'itms-apps://itunes.apple.com/app/1567851089';

var WalletConnectModal = function WalletConnectModal(_ref) {
  var isOpen = _ref.isOpen,
      uri = _ref.uri,
      classNames = _ref.classNames,
      reset = _ref.reset,
      deeplinkFormats = _ref.deeplinkFormats,
      props = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
  var isMobile = (0, _react.useMemo)(function () {
    return (0, _browserUtils.isMobile)();
  }, []);
  var isAndroid = (0, _react.useMemo)(function () {
    return (0, _browserUtils.isAndroid)();
  }, []); // Defined if isMobile is true.

  var deeplinkUrl = (0, _react.useMemo)(function () {
    return isMobile && deeplinkFormats ? isAndroid ? deeplinkFormats.android.replace('{{uri}}', uri) : deeplinkFormats.ios.replace('{{uri}}', uri) : undefined;
  }, [isMobile, deeplinkFormats, isAndroid, uri]); // Open app if mobile URL is available.

  (0, _react.useEffect)(function () {
    if (!isOpen || !deeplinkUrl) return;
    var timeout = setTimeout(function () {
      window.location.href = deeplinkUrl;
    }, 100);
    return function () {
      return clearTimeout(timeout);
    };
  }, [deeplinkUrl, isOpen]);

  var _useState = (0, _react.useState)(!isMobile),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      qrShowing = _useState2[0],
      setQrShowing = _useState2[1]; // Show mobile help if timeout is reached.


  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      showMobileHelp = _useState4[0],
      setShowMobileHelp = _useState4[1];

  (0, _react.useEffect)(function () {
    if (!isMobile || !isOpen) {
      setShowMobileHelp(false);
      return;
    }

    var timeout = setTimeout(function () {
      return setShowMobileHelp(true);
    }, 5000);
    return function () {
      return clearTimeout(timeout);
    };
  }, [isOpen, isMobile, setShowMobileHelp]);
  return /*#__PURE__*/_react["default"].createElement(_BaseModal.BaseModal, (0, _extends2["default"])({
    classNames: classNames,
    isOpen: isOpen,
    maxWidth: "24rem",
    title: isMobile ? 'Connect to Mobile Wallet' : 'Scan QR Code'
  }, props), !!deeplinkUrl && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("p", {
    className: classNames === null || classNames === void 0 ? void 0 : classNames.textContent,
    style: {
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/_react["default"].createElement("a", {
    href: deeplinkUrl,
    style: {
      textDecoration: 'underline'
    }
  }, "Open your mobile wallet"), ' ', "and accept the connection request."), /*#__PURE__*/_react["default"].createElement("p", {
    className: classNames === null || classNames === void 0 ? void 0 : classNames.textContent,
    style: {
      marginBottom: showMobileHelp ? '1rem' : '1.5rem'
    }
  }, "If you don't have Keplr Mobile installed,", ' ', /*#__PURE__*/_react["default"].createElement("a", {
    href: isAndroid ? deeplinkUrl : IOS_KEPLR_MOBILE_URL,
    style: {
      textDecoration: 'underline'
    }
  }, "click here to install it"), ". You can also scan the QR code at the bottom from another device with Keplr Mobile installed."), showMobileHelp && /*#__PURE__*/_react["default"].createElement("p", {
    className: classNames === null || classNames === void 0 ? void 0 : classNames.textContent,
    style: {
      marginBottom: '1.5rem'
    }
  }, "If nothing shows up in your mobile wallet, or nothing happened once you accepted,", ' ', /*#__PURE__*/_react["default"].createElement("button", {
    onClick: reset,
    style: {
      textDecoration: 'underline',
      display: 'inline'
    }
  }, "click here to reset"), ' ', "and try connecting again. Refresh the page if the problem persists."), /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setQrShowing(function (s) {
        return !s;
      });
    },
    style: {
      textAlign: 'left'
    }
  }, /*#__PURE__*/_react["default"].createElement(_BaseModal.ModalSubheader, {
    className: classNames === null || classNames === void 0 ? void 0 : classNames.modalSubheader,
    style: {
      marginBottom: qrShowing ? '1rem' : 0,
      textDecoration: 'underline'
    }
  }, qrShowing ? 'Hide' : 'Show', " QR Code"))), !!uri && qrShowing && /*#__PURE__*/_react["default"].createElement(_qrcode["default"], {
    size: 500,
    style: {
      width: '100%',
      height: '100%'
    },
    value: uri
  }));
};

exports.WalletConnectModal = WalletConnectModal;