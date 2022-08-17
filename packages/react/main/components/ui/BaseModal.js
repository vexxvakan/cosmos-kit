"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalSubheader = exports.BaseModal = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _reactModal = _interopRequireDefault(require("react-modal"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _CloseIcon = require("./CloseIcon");

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var BaseModal = function BaseModal(_ref) {
  var _classNames$modalCont, _classNames$modalOver;

  var isOpen = _ref.isOpen,
      onClose = _ref.onClose,
      title = _ref.title,
      _ref$maxWidth = _ref.maxWidth,
      maxWidth = _ref$maxWidth === void 0 ? '36rem' : _ref$maxWidth,
      classNames = _ref.classNames,
      closeIcon = _ref.closeIcon,
      children = _ref.children;
  // ReactModal accessibility.
  (0, _react.useEffect)(function () {
    _reactModal["default"].setAppElement('body');
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_reactModal["default"], {
    className: (_classNames$modalCont = classNames === null || classNames === void 0 ? void 0 : classNames.modalContent) !== null && _classNames$modalCont !== void 0 ? _classNames$modalCont : '_',
    contentElement: function contentElement(props, children) {
      return /*#__PURE__*/_react["default"].createElement(ModalContent, (0, _extends2["default"])({
        maxWidth: maxWidth
      }, props), children);
    },
    isOpen: isOpen,
    onRequestClose: function onRequestClose(e) {
      e.preventDefault();
      onClose === null || onClose === void 0 ? void 0 : onClose();
    },
    overlayClassName: (_classNames$modalOver = classNames === null || classNames === void 0 ? void 0 : classNames.modalOverlay) !== null && _classNames$modalOver !== void 0 ? _classNames$modalOver : '_',
    overlayElement: function overlayElement(props, children) {
      return /*#__PURE__*/_react["default"].createElement(ModalOverlay, props, children);
    }
  }, /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, typeof title === 'string' ? /*#__PURE__*/_react["default"].createElement(ModalHeader, {
    className: classNames === null || classNames === void 0 ? void 0 : classNames.modalHeader
  }, title) : title, onClose && /*#__PURE__*/_react["default"].createElement(ModalCloseButton, {
    className: classNames === null || classNames === void 0 ? void 0 : classNames.modalCloseButton,
    onClick: onClose
  }, closeIcon !== null && closeIcon !== void 0 ? closeIcon : /*#__PURE__*/_react["default"].createElement(_CloseIcon.CloseIcon, {
    height: 26,
    width: 26
  })), children));
};

exports.BaseModal = BaseModal;

var ModalContent = _styledComponents["default"].div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n  padding: 1.25rem;\n  border-radius: 1rem;\n  display: flex;\n  flex-direction: column;\n  background: white;\n  width: 100%;\n  max-width: ", ";\n  outline: none;\n  cursor: auto;\n\n  @media (max-width: 768px) {\n    width: calc(100% - 40px);\n  }\n"])), function (props) {
  return props.maxWidth;
});

var ModalOverlay = _styledComponents["default"].div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  width: 100vw;\n  height: 100vh;\n  z-index: 50;\n  background-color: rgba(0, 0, 0, 0.3);\n  display: flex;\n  align-items: center;\n  justify-content: cetner;\n  cursor: pointer;\n"])));

var ModalHeader = _styledComponents["default"].div(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2["default"])(["\n  color: rgb(31, 41, 55);\n  font-size: 1.25rem;\n  font-weight: bold;\n  line-height: 1.75rem;\n  margin-bottom: 1rem;\n"])));

var ModalSubheader = _styledComponents["default"].div(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2["default"])(["\n  color: rgb(31, 41, 55);\n  font-size: 1rem;\n  font-weight: bold;\n  line-height: 1.25rem;\n"])));

exports.ModalSubheader = ModalSubheader;

var ModalCloseButton = _styledComponents["default"].div(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2["default"])(["\n  position: absolute;\n  top: 1.25rem;\n  right: 1.25rem;\n  cursor: pointer;\n"])));