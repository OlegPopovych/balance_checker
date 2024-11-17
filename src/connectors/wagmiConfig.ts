import { http, createConfig } from 'wagmi';
import { avalanche } from 'wagmi/chains';
import { trustWallet } from '@rainbow-me/rainbowkit/wallets';
import {
  tokenPocketWallet,
  walletConnectWallet,
  metaMaskWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { connectorsForWallets, Chain } from '@rainbow-me/rainbowkit';
import { PROJECT_ID } from '../constants';

export const TARGET_CHAIN = avalanche;

const chains: readonly [Chain, ...Chain[]] = [TARGET_CHAIN];

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        tokenPocketWallet,
        metaMaskWallet,
        walletConnectWallet,
        trustWallet,
      ],
    },
  ],
  { appName: 'X_STAKING', projectId: PROJECT_ID }
);

export const wagmiConfig = createConfig({
  chains,
  transports: {
    [avalanche.id]: http(),
  },
  connectors,
});
