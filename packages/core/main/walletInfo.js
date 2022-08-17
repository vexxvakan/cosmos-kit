"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConnectedWalletInfo = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getConnectedWalletInfo = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(wallet, client, chainInfo, signingCosmWasmClientOptions, signingStargateClientOptions) {
    var _yield$Promise$all, _yield$Promise$all2, _yield$Promise$all2$, name, address, offlineSigner, _yield$Promise$all3, _yield$Promise$all4, signingCosmWasmClient, signingStargateClient;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return wallet.enableClient(client, chainInfo);

          case 2:
            _context.next = 4;
            return Promise.all([// Get name and address.
            wallet.getNameAddress(client, chainInfo), // Get offline signer.
            wallet.getOfflineSignerFunction(client)(chainInfo.chainId)]);

          case 4:
            _yield$Promise$all = _context.sent;
            _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 2);
            _yield$Promise$all2$ = _yield$Promise$all2[0];
            name = _yield$Promise$all2$.name;
            address = _yield$Promise$all2$.address;
            offlineSigner = _yield$Promise$all2[1];
            _context.t0 = Promise;
            _context.next = 13;
            return Promise.resolve().then(function () {
              return _interopRequireWildcard(require('@cosmjs/cosmwasm-stargate'));
            });

          case 13:
            _context.next = 15;
            return _context.sent.SigningCosmWasmClient.connectWithSigner(chainInfo.rpc, offlineSigner, signingCosmWasmClientOptions);

          case 15:
            _context.t1 = _context.sent;
            _context.next = 18;
            return Promise.resolve().then(function () {
              return _interopRequireWildcard(require('@cosmjs/stargate'));
            });

          case 18:
            _context.next = 20;
            return _context.sent.SigningStargateClient.connectWithSigner(chainInfo.rpc, offlineSigner, signingStargateClientOptions);

          case 20:
            _context.t2 = _context.sent;
            _context.t3 = [_context.t1, _context.t2];
            _context.next = 24;
            return _context.t0.all.call(_context.t0, _context.t3);

          case 24:
            _yield$Promise$all3 = _context.sent;
            _yield$Promise$all4 = (0, _slicedToArray2["default"])(_yield$Promise$all3, 2);
            signingCosmWasmClient = _yield$Promise$all4[0];
            signingStargateClient = _yield$Promise$all4[1];

            if (!(address === undefined)) {
              _context.next = 30;
              break;
            }

            throw new Error('Failed to retrieve wallet address.');

          case 30:
            return _context.abrupt("return", {
              wallet: wallet,
              walletClient: client,
              chainInfo: chainInfo,
              offlineSigner: offlineSigner,
              name: name,
              address: address,
              signingCosmWasmClient: signingCosmWasmClient,
              signingStargateClient: signingStargateClient
            });

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getConnectedWalletInfo(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.getConnectedWalletInfo = getConnectedWalletInfo;