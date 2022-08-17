/* babel-plugin-inline-import './images/keplr-walletconnect.png' */
const imageUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARZSURBVHgB7Vs9TBRBFH57GG0gwdiIDUchNBLvoCJRDhoNhAKMkthiK8RSoaBCSwWtESsTYmEigUQLQBOpCBhpBBK2EgsJl2AjiTe+tz/ATW5vZ3bfEm73vuRxl7vl3bxv3t/M7higCCFEPb70o+RQMihplHo4G8ijmCjrKMso7w3DyAMH0PA0ynOUfVFZeI2ShqDAf64XtuGVDrLB01MND+PT+LIItpvHASZKN4aFKX+Rkj9A4ym+42Q8IY2y6NhWhCIPiOHMyzBB8oQjApw4WYP4Gu/CRMm6VeJkCIxD/I0npMG21YLlAY7r70Cy0ESh4HrAOCQPj+iP4cT+PiQPlAOayAP6IZmwWnsiIAfJRY4IyEBykaEcQPF/VlZ1p408ESAgwUhBwnEOTglruwLWfgJs7QnY3gM4OBTw56/9Xe0FgIZaA2rPY496hcSAbIMBp4FIQ4CMnf8hYGHr2FhVXK4Di4QH7SnrfVSIhIBfBwCTKwX4YvKo7mmOjgh2AmY3BEyvFrRnXAVDSMJQO29osBFABj/5VMA4j7ao3Gw0YKwrZeUNDrAQQC7/cO6f9aqDuvP2bFJC1AGFwqu+GpaQCE2AqvFk7I00QBtm+EwDZv26YlemhLmF1YE8aGHTf0hk/MydmtCeEJqA2Y0CTH31VkGG32sFGLym7rZE5vxmAWa/Y/U49L7u6e0UdDaGywmhCaABDn8oWDMog+r5WC549iYiJpYKVg8ho7fFgNFc+D6OJQeUImGw1YCRDp5Gk6rK9Oqxbi7jCXxV4AQJVKqoZHHCJYGTWAJrH0AkfMbmp7c5mjaWEiSFFSeUCXCzPSW1l33h67Crj8BR0tw+ZPdAaOlTIkAudVcvhSNB1he2rpPxpI8WWbr6fIOpVJ2nOB+eC9bultIXtJEiyMbr6vP1gLtvvRWRJzy7pV7m/Aam6wmk5/HHYuNlfe/u15TV4esBbWXW5eQJqkyrzIrOzLnXehlP6Ez7J0xfAkZx4VEuq0dlWFh91CuolEvlKjC1YremXvBy36DxHUafTqOk1QfIHZkMedBhkltQfbpNmHYjpEoCQWWwtk4+fbodaKBOUIUE6grLlcmTg1XRR+A2nhC4FfYbdDmUGiy3PlUEXlUE3Z/zGiy3PlWEXgzpzNxIh4GrufKDpUpDFUcFHKtOltWgCgmjXQb2E2qDXcB7CRPL5UngWnKzLKz93FfHeEJPi72T5P17fPsNbDsLXiToGu/CiwTuzRbWbRuZhKDGu5BJiGKnKZJbY3RLzL7RybN7s/3bvnfAvRtEqD4fAAkHEcBzsKAykScCTEgurCdFv0FysU4ELEFysew+KrsDyXxU7mLKeW7+DSQPM2R79XF5euccIZmE5GDSPTZTPTLjfup80A3x7gtMsA9NHTV/Ra2w4xYDEE8STJQB+exg9eBkqaudC7MQj8RINmRLGa8EYR+enhGVBTro/UIoHJ5W3mEQx8fnu1CuQ0yOz/8HSV7AWOCEHtAAAAAASUVORK5CYII=";
export const KeplrWalletConnectWallet = {
  id: 'keplr-walletconnect',
  name: 'WalletConnect',
  description: 'Keplr Mobile',
  imageUrl,
  isWalletConnect: true,
  walletConnectDeeplinkFormats: {
    ios: 'keplrwallet://wcV1?{{uri}}',
    android: 'intent://wcV1?{{uri}}#Intent;package=com.chainapsis.keplr;scheme=keplrwallet;end;'
  },
  walletConnectSigningMethods: ['keplr_enable_wallet_connect_v1', 'keplr_sign_amino_wallet_connect_v1'],
  getClient: async (chainInfo, walletConnect, newWalletConnectSession) => {
    if (walletConnect?.connected) {
      const client = new (await import('../connectors/keplr-walletconnect')).KeplrWalletConnectV1(walletConnect, [chainInfo]); // Prevent double app open request. See comment in
      // `keplr-walletconnect.ts` for more details.

      client.dontOpenAppOnEnable = !!newWalletConnectSession;
      return client;
    }

    throw new Error('Mobile wallet not connected.');
  },
  cleanupClient: async client => {
    // Allow future enable requests to open the app. See comment in
    // `keplr-walletconnect.ts` for more details.
    client.dontOpenAppOnEnable = false;
  },
  // WalletConnect only supports Amino signing.
  getOfflineSignerFunction: client => // This function expects to be bound to the `client` instance.
  client.getOfflineSignerOnlyAmino.bind(client),
  enableClient: (client, chainInfo) => client.enable(chainInfo.chainId),
  getNameAddress: (client, chainInfo) => client.getKey(chainInfo.chainId).then(key => ({
    name: key.name,
    address: key.bech32Address
  })),
  // Refresh listener controls.
  addRefreshListener: listener => window.addEventListener('keplr_keystorechange', listener),
  removeRefreshListener: listener => window.removeEventListener('keplr_keystorechange', listener)
};