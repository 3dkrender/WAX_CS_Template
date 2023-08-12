import { sessionKit } from "../components/Menu/Menu";


// TODO: Don't forget to change "broadcast: true" when you are ready to push the transaction to the blockchain
export const TAPOS = {
  blocksBehind: 3,
  expireSeconds: 120,
  broadcast: false
};

export interface IBaseTransaction {
  actions: any;
};

export const InitTransaction = async (dataTrx: IBaseTransaction ) => {
  
  const session = await sessionKit.restore();
  if (!session) {
    console.log("No session found");
    return null;
  }
  
  const actions =  [
      ...dataTrx.actions
    ]

  try {
    const transaction = await session.transact({actions}, TAPOS);
    if(transaction) return {transactionId: String(transaction.resolved?.transaction.id), actions: actions};
  } catch (error) {
    console.log(error);
    return null;
  }
}