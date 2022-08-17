import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
const _excluded = ["isOpen", "classNames", "renderLoader", "reset"];
import React, { useEffect, useState } from 'react';
import { BaseModal } from './BaseModal';
export const EnablingWalletModal = _ref => {
  let {
    isOpen,
    classNames,
    renderLoader,
    reset
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const [showHelp, setShowHelp] = useState(false); // Show help if timeout is reached.

  useEffect(() => {
    if (!isOpen) {
      setShowHelp(false);
      return;
    }

    const timeout = setTimeout(() => setShowHelp(true), 5000);
    return () => clearTimeout(timeout);
  }, [isOpen, setShowHelp]);
  return /*#__PURE__*/React.createElement(BaseModal, _extends({
    classNames: classNames,
    isOpen: isOpen,
    maxWidth: "24rem",
    title: "Enabling Wallet..."
  }, props), showHelp && /*#__PURE__*/React.createElement("p", {
    className: classNames?.textContent
  }, "If nothing shows up in your wallet,", ' ', /*#__PURE__*/React.createElement("button", {
    onClick: reset,
    style: {
      textDecoration: 'underline',
      display: 'inline'
    }
  }, "click here to reset"), ' ', "and try connecting again. Refresh the page if the problem persists."), renderLoader && /*#__PURE__*/React.createElement("div", {
    className: "mt-4"
  }, renderLoader()));
};