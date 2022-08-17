"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnablingWalletModal = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _BaseModal = require("./BaseModal");

var _excluded = ["isOpen", "classNames", "renderLoader", "reset"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var EnablingWalletModal = function EnablingWalletModal(_ref) {
  var isOpen = _ref.isOpen,
      classNames = _ref.classNames,
      renderLoader = _ref.renderLoader,
      reset = _ref.reset,
      props = (0, _objectWithoutProperties2["default"])(_ref, _excluded);

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      showHelp = _useState2[0],
      setShowHelp = _useState2[1]; // Show help if timeout is reached.


  (0, _react.useEffect)(function () {
    if (!isOpen) {
      setShowHelp(false);
      return;
    }

    var timeout = setTimeout(function () {
      return setShowHelp(true);
    }, 5000);
    return function () {
      return clearTimeout(timeout);
    };
  }, [isOpen, setShowHelp]);
  return /*#__PURE__*/_react["default"].createElement(_BaseModal.BaseModal, (0, _extends2["default"])({
    classNames: classNames,
    isOpen: isOpen,
    maxWidth: "24rem",
    title: "Enabling Wallet..."
  }, props), showHelp && /*#__PURE__*/_react["default"].createElement("p", {
    className: classNames === null || classNames === void 0 ? void 0 : classNames.textContent
  }, "If nothing shows up in your wallet,", ' ', /*#__PURE__*/_react["default"].createElement("button", {
    onClick: reset,
    style: {
      textDecoration: 'underline',
      display: 'inline'
    }
  }, "click here to reset"), ' ', "and try connecting again. Refresh the page if the problem persists."), renderLoader && /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-4"
  }, renderLoader()));
};

exports.EnablingWalletModal = EnablingWalletModal;