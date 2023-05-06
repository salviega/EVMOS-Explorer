import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createClient, WagmiConfig, Chain } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import {darkTheme} from '@rainbow-me/rainbowkit'
import { ChakraProvider } from "@chakra-ui/react";

const evmosTestnet: Chain = {
  id: 9000,
  name: "Evmos Testnet",
  network: "evmostest",
  nativeCurrency: {
    decimals: 18,
    name: "tEVMOS",
    symbol: "tEVMOS",
  },
  rpcUrls: {
    default: {
      http: ["https://eth.bd.evmos.dev:8545"],
    },
  },
  blockExplorers: {
    default: {
      name: "Evmos Explorer",
      url: "https://evm.evmos.dev",
    },
  },
  testnet: true,
};
const { chains, provider, webSocketProvider } = configureChains(
  [evmosTestnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider 
        chains={chains}
        modalSize="compact"
        theme={darkTheme({
          accentColor: "#7b3fe4",
          accentColorForeground: "white",
          borderRadius: "small",
          fontStack: "system",
          overlayBlur: "small",
        })}
      >
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
