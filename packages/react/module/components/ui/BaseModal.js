import _extends from "@babel/runtime/helpers/esm/extends";
import React, { useEffect } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { CloseIcon as DefaultCloseIcon } from './CloseIcon';
export const BaseModal = ({
  isOpen,
  onClose,
  title,
  maxWidth = '36rem',
  classNames,
  closeIcon,
  children
}) => {
  // ReactModal accessibility.
  useEffect(() => {
    ReactModal.setAppElement('body');
  }, []);
  return /*#__PURE__*/React.createElement(ReactModal, {
    className: classNames?.modalContent ?? '_',
    contentElement: (props, children) => /*#__PURE__*/React.createElement(ModalContent, _extends({
      maxWidth: maxWidth
    }, props), children),
    isOpen: isOpen,
    onRequestClose: e => {
      e.preventDefault();
      onClose?.();
    },
    overlayClassName: classNames?.modalOverlay ?? '_',
    overlayElement: (props, children) => /*#__PURE__*/React.createElement(ModalOverlay, props, children)
  }, /*#__PURE__*/React.createElement(React.Fragment, null, typeof title === 'string' ? /*#__PURE__*/React.createElement(ModalHeader, {
    className: classNames?.modalHeader
  }, title) : title, onClose && /*#__PURE__*/React.createElement(ModalCloseButton, {
    className: classNames?.modalCloseButton,
    onClick: onClose
  }, closeIcon ?? /*#__PURE__*/React.createElement(DefaultCloseIcon, {
    height: 26,
    width: 26
  })), children));
};
const ModalContent = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 1.25rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  background: white;
  width: 100%;
  max-width: ${props => props.maxWidth};
  outline: none;
  cursor: auto;

  @media (max-width: 768px) {
    width: calc(100% - 40px);
  }
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: cetner;
  cursor: pointer;
`;
const ModalHeader = styled.div`
  color: rgb(31, 41, 55);
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.75rem;
  margin-bottom: 1rem;
`;
export const ModalSubheader = styled.div`
  color: rgb(31, 41, 55);
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.25rem;
`;
const ModalCloseButton = styled.div`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  cursor: pointer;
`;