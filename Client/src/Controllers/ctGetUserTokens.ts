import axios from "axios";

/**
 * 
 * @param userName: string
 * @returns Tokens of the user: {tokens: [{symbol: string, precision: number, amount: number, contract: string}]}
 */
export const ctGetUserTokens = async (userName: string) => {

  try {
    const res = await axios.get(import.meta.env.VITE_SERVER + `api/getusertokens/${userName}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};