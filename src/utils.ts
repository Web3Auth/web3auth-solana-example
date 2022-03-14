import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, CONNECTED_EVENT_DATA, CustomChainConfig } from "@web3auth/base";
import { SolanaWalletAdapter} from '@web3auth/torus-solana-adapter'

import { ADAPTER_EVENTS } from "@web3auth/base";
// import { LOGIN_MODAL_EVENTS } from "@web3auth/ui";

// Solana config for web3auth
export const solanaChainConfig: CustomChainConfig = {
    chainNamespace: CHAIN_NAMESPACES.SOLANA,
    rpcTarget: "https://api.testnet.solana.com",
    blockExplorer: "https://explorer.solana.com?cluster=testnet",
    chainId: "0x2",
    displayName: "testnet",
    ticker: "SOL",
    tickerName: "solana",
};

export const adapter = new SolanaWalletAdapter ({
  adapterSettings: {
   modalZIndex: 99999
  },
  // loginSettings: {
  //   verifier: "google"
  // },
  initParams: {
    buildEnv: "testing"
  },
  chainConfig: solanaChainConfig
})

// Subscribe to event from web3auth
export function subscribeAuthEvents(web3auth: Web3Auth) {
  web3auth.on(ADAPTER_EVENTS.CONNECTED, (data: CONNECTED_EVENT_DATA) => {
    console.log("Yeah!, you are successfully logged in", data);
  });

  web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
    console.log("connecting");
  });

  web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
    console.log("disconnected");
  });

  web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
    console.log("some error or user have cancelled login request", error);
  });

  // web3auth.on(LOGIN_MODAL_EVENTS.MODAL_VISIBILITY, (isVisible) => {
  //   console.log("modal visibility", isVisible);
  // });
}