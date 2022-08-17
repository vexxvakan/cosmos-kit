"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _types = require("@cosmos-kit/types");

var _react = require("@testing-library/react");

var _react2 = _interopRequireDefault(require("react"));

var _testUtils = require("react-dom/test-utils");

var _components = require("../components");

var DisplayStatus = function DisplayStatus() {
  var _useWalletManager = (0, _components.useWalletManager)(),
      status = _useWalletManager.status;

  (0, _components.useWallet)();
  return /*#__PURE__*/_react2["default"].createElement("p", null, status);
};

describe('display status', function () {
  beforeAll(function () {
    return (0, _testUtils.act)(function () {
      (0, _react.render)( /*#__PURE__*/_react2["default"].createElement(_components.WalletManagerProvider, {
        defaultChainId: _types.ChainInfoID.Juno1
      }, /*#__PURE__*/_react2["default"].createElement(DisplayStatus, null)));
    });
  });
  it('should display the status in the DOM', function () {
    expect(_react.screen.getByText(_types.CosmosWalletStatus.Disconnected)).toBeInTheDocument();
  });
  afterAll(_react.cleanup);
});