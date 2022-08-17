"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeplrWalletConnectWallet = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* babel-plugin-inline-import './images/keplr-walletconnect.png' */
var imageUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARZSURBVHgB7Vs9TBRBFH57GG0gwdiIDUchNBLvoCJRDhoNhAKMkthiK8RSoaBCSwWtESsTYmEigUQLQBOpCBhpBBK2EgsJl2AjiTe+tz/ATW5vZ3bfEm73vuRxl7vl3bxv3t/M7higCCFEPb70o+RQMihplHo4G8ijmCjrKMso7w3DyAMH0PA0ynOUfVFZeI2ShqDAf64XtuGVDrLB01MND+PT+LIItpvHASZKN4aFKX+Rkj9A4ym+42Q8IY2y6NhWhCIPiOHMyzBB8oQjApw4WYP4Gu/CRMm6VeJkCIxD/I0npMG21YLlAY7r70Cy0ESh4HrAOCQPj+iP4cT+PiQPlAOayAP6IZmwWnsiIAfJRY4IyEBykaEcQPF/VlZ1p408ESAgwUhBwnEOTglruwLWfgJs7QnY3gM4OBTw56/9Xe0FgIZaA2rPY496hcSAbIMBp4FIQ4CMnf8hYGHr2FhVXK4Di4QH7SnrfVSIhIBfBwCTKwX4YvKo7mmOjgh2AmY3BEyvFrRnXAVDSMJQO29osBFABj/5VMA4j7ao3Gw0YKwrZeUNDrAQQC7/cO6f9aqDuvP2bFJC1AGFwqu+GpaQCE2AqvFk7I00QBtm+EwDZv26YlemhLmF1YE8aGHTf0hk/MydmtCeEJqA2Y0CTH31VkGG32sFGLym7rZE5vxmAWa/Y/U49L7u6e0UdDaGywmhCaABDn8oWDMog+r5WC549iYiJpYKVg8ho7fFgNFc+D6OJQeUImGw1YCRDp5Gk6rK9Oqxbi7jCXxV4AQJVKqoZHHCJYGTWAJrH0AkfMbmp7c5mjaWEiSFFSeUCXCzPSW1l33h67Crj8BR0tw+ZPdAaOlTIkAudVcvhSNB1he2rpPxpI8WWbr6fIOpVJ2nOB+eC9bultIXtJEiyMbr6vP1gLtvvRWRJzy7pV7m/Aam6wmk5/HHYuNlfe/u15TV4esBbWXW5eQJqkyrzIrOzLnXehlP6Ez7J0xfAkZx4VEuq0dlWFh91CuolEvlKjC1YremXvBy36DxHUafTqOk1QfIHZkMedBhkltQfbpNmHYjpEoCQWWwtk4+fbodaKBOUIUE6grLlcmTg1XRR+A2nhC4FfYbdDmUGiy3PlUEXlUE3Z/zGiy3PlWEXgzpzNxIh4GrufKDpUpDFUcFHKtOltWgCgmjXQb2E2qDXcB7CRPL5UngWnKzLKz93FfHeEJPi72T5P17fPsNbDsLXiToGu/CiwTuzRbWbRuZhKDGu5BJiGKnKZJbY3RLzL7RybN7s/3bvnfAvRtEqD4fAAkHEcBzsKAykScCTEgurCdFv0FysU4ELEFysew+KrsDyXxU7mLKeW7+DSQPM2R79XF5euccIZmE5GDSPTZTPTLjfup80A3x7gtMsA9NHTV/Ra2w4xYDEE8STJQB+exg9eBkqaudC7MQj8RINmRLGa8EYR+enhGVBTro/UIoHJ5W3mEQx8fnu1CuQ0yOz/8HSV7AWOCEHtAAAAAASUVORK5CYII=";
var KeplrWalletConnectWallet = {
  id: 'keplr-walletconnect',
  name: 'WalletConnect',
  description: 'Keplr Mobile',
  imageUrl: imageUrl,
  isWalletConnect: true,
  walletConnectDeeplinkFormats: {
    ios: 'keplrwallet://wcV1?{{uri}}',
    android: 'intent://wcV1?{{uri}}#Intent;package=com.chainapsis.keplr;scheme=keplrwallet;end;'
  },
  walletConnectSigningMethods: ['keplr_enable_wallet_connect_v1', 'keplr_sign_amino_wallet_connect_v1'],
  getClient: function () {
    var _getClient = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(chainInfo, walletConnect, newWalletConnectSession) {
      var client;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(walletConnect !== null && walletConnect !== void 0 && walletConnect.connected)) {
                _context.next = 9;
                break;
              }

              _context.next = 3;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require('../connectors/keplr-walletconnect'));
              });

            case 3:
              _context.t0 = _context.sent.KeplrWalletConnectV1;
              _context.t1 = walletConnect;
              _context.t2 = [chainInfo];
              client = new _context.t0(_context.t1, _context.t2);
              // Prevent double app open request. See comment in
              // `keplr-walletconnect.ts` for more details.
              client.dontOpenAppOnEnable = !!newWalletConnectSession;
              return _context.abrupt("return", client);

            case 9:
              throw new Error('Mobile wallet not connected.');

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getClient(_x, _x2, _x3) {
      return _getClient.apply(this, arguments);
    }

    return getClient;
  }(),
  cleanupClient: function () {
    var _cleanupClient = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(client) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // Allow future enable requests to open the app. See comment in
              // `keplr-walletconnect.ts` for more details.
              client.dontOpenAppOnEnable = false;

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function cleanupClient(_x4) {
      return _cleanupClient.apply(this, arguments);
    }

    return cleanupClient;
  }(),
  // WalletConnect only supports Amino signing.
  getOfflineSignerFunction: function getOfflineSignerFunction(client) {
    return (// This function expects to be bound to the `client` instance.
      client.getOfflineSignerOnlyAmino.bind(client)
    );
  },
  enableClient: function enableClient(client, chainInfo) {
    return client.enable(chainInfo.chainId);
  },
  getNameAddress: function getNameAddress(client, chainInfo) {
    return client.getKey(chainInfo.chainId).then(function (key) {
      return {
        name: key.name,
        address: key.bech32Address
      };
    });
  },
  // Refresh listener controls.
  addRefreshListener: function addRefreshListener(listener) {
    return window.addEventListener('keplr_keystorechange', listener);
  },
  removeRefreshListener: function removeRefreshListener(listener) {
    return window.removeEventListener('keplr_keystorechange', listener);
  }
};
exports.KeplrWalletConnectWallet = KeplrWalletConnectWallet;