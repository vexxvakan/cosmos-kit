import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
const _excluded = ["wallets", "selectWallet", "classNames"];
import React from 'react';
import styled from 'styled-components';
import { BaseModal } from './BaseModal';
export const SelectWalletModal = _ref => {
  let {
    wallets,
    selectWallet,
    classNames
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(BaseModal, _extends({
    classNames: classNames,
    title: "Select a wallet"
  }, props), /*#__PURE__*/React.createElement(WalletList, {
    className: classNames?.walletList
  }, wallets.map(wallet => /*#__PURE__*/React.createElement(WalletRow, {
    key: wallet.id,
    className: classNames?.wallet,
    onClick: e => {
      e.preventDefault();
      selectWallet(wallet);
    }
  }, /*#__PURE__*/React.createElement(WalletIconImg, {
    alt: "keplr logo",
    className: classNames?.walletImage,
    src: wallet.imageUrl
  }), /*#__PURE__*/React.createElement(WalletInfo, {
    className: classNames?.walletInfo
  }, /*#__PURE__*/React.createElement(WalletName, {
    className: classNames?.walletName
  }, wallet.name), /*#__PURE__*/React.createElement(WalletDescription, {
    className: classNames?.walletDescription
  }, wallet.description))))));
};
const WalletList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const WalletRow = styled.div`
  border-radius: 1rem;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  background-color: rgb(229 231 235);
  box-shadow: inset 0 0 0 1px rgb(156 163 175);

  &:hover {
    cursor: pointer;
  }
`;
const WalletIconImg = styled.img`
  width: 4rem;
  height: 4rem;
`;
const WalletInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.25rem;
`;
const WalletName = styled.div`
  color: black;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.75rem;
`;
const WalletDescription = styled.div`
  margin-top: 0.25rem;
  color: rgb(75 85 99);
`;