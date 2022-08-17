"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeplrWallet = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* babel-plugin-inline-import './images/keplr-extension.png' */
var imageUrl = "data:image/png;base64,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";
var KeplrWallet = {
  id: 'keplr',
  name: 'Keplr Wallet',
  description: 'Keplr Chrome Extension',
  imageUrl: imageUrl,
  isWalletConnect: false,
  getClient: function () {
    var _getClient = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require('@keplr-wallet/stores'));
              });

            case 2:
              return _context.abrupt("return", _context.sent.getKeplrFromWindow());

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getClient() {
      return _getClient.apply(this, arguments);
    }

    return getClient;
  }(),
  getOfflineSignerFunction: function getOfflineSignerFunction(client) {
    return (// This function expects to be bound to the `client` instance.
      client.getOfflineSignerAuto.bind(client)
    );
  },
  enableClient: function () {
    var _enableClient = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(client, chainInfo) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(client.mode === 'extension')) {
                _context2.next = 3;
                break;
              }

              _context2.next = 3;
              return client.experimentalSuggestChain(chainInfo);

            case 3:
              _context2.next = 5;
              return client.enable(chainInfo.chainId);

            case 5:
              return _context2.abrupt("return", _context2.sent);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function enableClient(_x, _x2) {
      return _enableClient.apply(this, arguments);
    }

    return enableClient;
  }(),
  getNameAddress: function getNameAddress(client, chainInfo) {
    return client.getKey(chainInfo.chainId).then(function (key) {
      return {
        name: key.name,
        address: key.bech32Address
      };
    });
  },
  // Autoconnect to this wallet if in Keplr's in-app browser interface, since
  // the Keplr client is already provided/connected.
  shouldAutoconnect: function () {
    var _shouldAutoconnect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", Promise.resolve().then(function () {
                return _interopRequireWildcard(require('@keplr-wallet/stores'));
              }).then(function (_ref) {
                var getKeplrFromWindow = _ref.getKeplrFromWindow;
                return getKeplrFromWindow();
              }).then(function (keplr) {
                return !!keplr && keplr.mode === 'mobile-web';
              })["catch"](function () {
                return false;
              }));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function shouldAutoconnect() {
      return _shouldAutoconnect.apply(this, arguments);
    }

    return shouldAutoconnect;
  }(),
  // Refresh listener controls.
  addRefreshListener: function addRefreshListener(listener) {
    return window.addEventListener('keplr_keystorechange', listener);
  },
  removeRefreshListener: function removeRefreshListener(listener) {
    return window.removeEventListener('keplr_keystorechange', listener);
  }
};
exports.KeplrWallet = KeplrWallet;