import axios from "axios";

/**
 * 
 * @param userName: string
 * @returns Tokens of the user: {tokens: [{symbol: string, precision: number, amount: number, contract: string}]}
 */
export const ctGetUserTokens = async (userName: string) => {
  axios
    .get(import.meta.env.VITE_SERVER + `api/getusertokens/${userName}`)
    .then((res: any) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err: any) => {
      console.log(err);
      return null;
    });
};