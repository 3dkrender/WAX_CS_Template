import { Api } from 'enf-eosjs'
import { JsSignatureProvider } from 'enf-eosjs/dist/eosjs-jssig';

/**
 * WARNING: Never hardcode a private key into a production application!
 * Api object is only needed to put transactions on the blockchain. 
 * You can read from the blockchain without this Api (using only rpc)
 */
const signatureProvider = new JsSignatureProvider([process.env.WAXKEY as string]);

export const api = (rpc: any) =>
  new Api({
    rpc,
    signatureProvider,
    textDecoder: new TextDecoder(),
    textEncoder: new TextEncoder(),
  });
