import { Session } from "@wharfkit/session"
import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey"
import { APIClient } from "@wharfkit/antelope"

/**
 * WARNING: Never hardcode a private key into a production application!
 * Api object is only needed to put transactions on the blockchain. 
 * You can read from the blockchain without this Api (using only rpc)
 */
const args = {
  chain: {
    id: process.env.CHAIN_ID as string,
    url: process.env.RPC as string,
  },
  actor: process.env.ACCOUNT as string,
  permission: "active",
  walletPlugin: new WalletPluginPrivateKey(process.env.WAXKEY as string),
}

export const sessionWAX = new Session(args);
// export const apiWAX = new APIClient({
//   url: process.env.RPC as string,
// });