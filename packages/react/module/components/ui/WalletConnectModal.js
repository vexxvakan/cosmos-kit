import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
const _excluded = ["isOpen", "uri", "classNames", "reset", "deeplinkFormats"];
import { isAndroid as checkIsAndroid, isMobile as checkIsMobile } from '@walletconnect/browser-utils';
import QRCode from 'qrcode.react';
import React, { useEffect, useMemo, useState } from 'react';
import { BaseModal, ModalSubheader } from './BaseModal';
const IOS_KEPLR_MOBILE_URL = 'itms-apps://itunes.apple.com/app/1567851089';
export const WalletConnectModal = _ref => {
  let {
    isOpen,
    uri,
    classNames,
    reset,
    deeplinkFormats
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const isMobile = useMemo(() => checkIsMobile(), []);
  const isAndroid = useMemo(() => checkIsAndroid(), []); // Defined if isMobile is true.

  const deeplinkUrl = useMemo(() => isMobile && deeplinkFormats ? isAndroid ? deeplinkFormats.android.replace('{{uri}}', uri) : deeplinkFormats.ios.replace('{{uri}}', uri) : undefined, [isMobile, deeplinkFormats, isAndroid, uri]); // Open app if mobile URL is available.

  useEffect(() => {
    if (!isOpen || !deeplinkUrl) return;
    const timeout = setTimeout(() => {
      window.location.href = deeplinkUrl;
    }, 100);
    return () => clearTimeout(timeout);
  }, [deeplinkUrl, isOpen]);
  const [qrShowing, setQrShowing] = useState(!isMobile); // Show mobile help if timeout is reached.

  const [showMobileHelp, setShowMobileHelp] = useState(false);
  useEffect(() => {
    if (!isMobile || !isOpen) {
      setShowMobileHelp(false);
      return;
    }

    const timeout = setTimeout(() => setShowMobileHelp(true), 5000);
    return () => clearTimeout(timeout);
  }, [isOpen, isMobile, setShowMobileHelp]);
  return /*#__PURE__*/React.createElement(BaseModal, _extends({
    classNames: classNames,
    isOpen: isOpen,
    maxWidth: "24rem",
    title: isMobile ? 'Connect to Mobile Wallet' : 'Scan QR Code'
  }, props), !!deeplinkUrl && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    className: classNames?.textContent,
    style: {
      marginBottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: deeplinkUrl,
    style: {
      textDecoration: 'underline'
    }
  }, "Open your mobile wallet"), ' ', "and accept the connection request."), /*#__PURE__*/React.createElement("p", {
    className: classNames?.textContent,
    style: {
      marginBottom: showMobileHelp ? '1rem' : '1.5rem'
    }
  }, "If you don't have Keplr Mobile installed,", ' ', /*#__PURE__*/React.createElement("a", {
    href: isAndroid ? deeplinkUrl : IOS_KEPLR_MOBILE_URL,
    style: {
      textDecoration: 'underline'
    }
  }, "click here to install it"), ". You can also scan the QR code at the bottom from another device with Keplr Mobile installed."), showMobileHelp && /*#__PURE__*/React.createElement("p", {
    className: classNames?.textContent,
    style: {
      marginBottom: '1.5rem'
    }
  }, "If nothing shows up in your mobile wallet, or nothing happened once you accepted,", ' ', /*#__PURE__*/React.createElement("button", {
    onClick: reset,
    style: {
      textDecoration: 'underline',
      display: 'inline'
    }
  }, "click here to reset"), ' ', "and try connecting again. Refresh the page if the problem persists."), /*#__PURE__*/React.createElement("button", {
    onClick: () => setQrShowing(s => !s),
    style: {
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement(ModalSubheader, {
    className: classNames?.modalSubheader,
    style: {
      marginBottom: qrShowing ? '1rem' : 0,
      textDecoration: 'underline'
    }
  }, qrShowing ? 'Hide' : 'Show', " QR Code"))), !!uri && qrShowing && /*#__PURE__*/React.createElement(QRCode, {
    size: 500,
    style: {
      width: '100%',
      height: '100%'
    },
    value: uri
  }));
};