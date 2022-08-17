import { ChainInfoID, CosmosWalletStatus } from '@cosmos-kit/types';
import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { useWallet, useWalletManager, WalletManagerProvider } from '../components';

const DisplayStatus = () => {
  const {
    status
  } = useWalletManager();
  useWallet();
  return /*#__PURE__*/React.createElement("p", null, status);
};

describe('display status', () => {
  beforeAll(() => act(() => {
    render( /*#__PURE__*/React.createElement(WalletManagerProvider, {
      defaultChainId: ChainInfoID.Juno1
    }, /*#__PURE__*/React.createElement(DisplayStatus, null)));
  }));
  it('should display the status in the DOM', () => {
    expect(screen.getByText(CosmosWalletStatus.Disconnected)).toBeInTheDocument();
  });
  afterAll(cleanup);
});