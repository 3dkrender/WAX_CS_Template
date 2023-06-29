import axios from "axios";

/**
 * Calls the server to get the info of the blockchain
 * @returns Info of the blockchain
 */
export const ctGetInfo = async () => {
  axios
    .get(import.meta.env.VITE_SERVER + "api/getinfo")
    .then((res: any) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err: any) => {
      console.log(err);
      return null;
    });
};