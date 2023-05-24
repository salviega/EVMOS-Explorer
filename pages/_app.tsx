import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { Chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

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
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
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
