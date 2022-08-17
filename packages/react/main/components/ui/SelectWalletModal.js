"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectWalletModal = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _BaseModal = require("./BaseModal");

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;

var _excluded = ["wallets", "selectWallet", "classNames"];

var SelectWalletModal = function SelectWalletModal(_ref) {
  var wallets = _ref.wallets,
      selectWallet = _ref.selectWallet,
      classNames = _ref.classNames,
      props = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement(_BaseModal.BaseModal, (0, _extends2["default"])({
    classNames: classNames,
    title: "Select a wallet"
  }, props), /*#__PURE__*/_react["default"].createElement(WalletList, {
    className: classNames === null || classNames === void 0 ? void 0 : classNames.walletList
  }, wallets.map(function (wallet) {
    return /*#__PURE__*/_react["default"].createElement(WalletRow, {
      key: wallet.id,
      className: classNames === null || classNames === void 0 ? void 0 : classNames.wallet,
      onClick: function onClick(e) {
        e.preventDefault();
        selectWallet(wallet);
      }
    }, /*#__PURE__*/_react["default"].createElement(WalletIconImg, {
      alt: "keplr logo",
      className: classNames === null || classNames === void 0 ? void 0 : classNames.walletImage,
      src: wallet.imageUrl
    }), /*#__PURE__*/_react["default"].createElement(WalletInfo, {
      className: classNames === null || classNames === void 0 ? void 0 : classNames.walletInfo
    }, /*#__PURE__*/_react["default"].createElement(WalletName, {
      className: classNames === null || classNames === void 0 ? void 0 : classNames.walletName
    }, wallet.name), /*#__PURE__*/_react["default"].createElement(WalletDescription, {
      className: classNames === null || classNames === void 0 ? void 0 : classNames.walletDescription
    }, wallet.description)));
  })));
};

exports.SelectWalletModal = SelectWalletModal;

var WalletList = _styledComponents["default"].div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n"])));

var WalletRow = _styledComponents["default"].div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n  border-radius: 1rem;\n  padding: 1.25rem;\n  display: flex;\n  align-items: center;\n  background-color: rgb(229 231 235);\n  box-shadow: inset 0 0 0 1px rgb(156 163 175);\n\n  &:hover {\n    cursor: pointer;\n  }\n"])));

var WalletIconImg = _styledComponents["default"].img(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2["default"])(["\n  width: 4rem;\n  height: 4rem;\n"])));

var WalletInfo = _styledComponents["default"].div(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  flex-direction: column;\n  margin-left: 1.25rem;\n"])));

var WalletName = _styledComponents["default"].div(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2["default"])(["\n  color: black;\n  font-size: 1.125rem;\n  font-weight: 600;\n  line-height: 1.75rem;\n"])));

var WalletDescription = _styledComponents["default"].div(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2["default"])(["\n  margin-top: 0.25rem;\n  color: rgb(75 85 99);\n"])));