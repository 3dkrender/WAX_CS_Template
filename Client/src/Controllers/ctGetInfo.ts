import axios from "axios";

/**
 * Calls the server to get the info of the blockchain
 * @returns Info of the blockchain
 */
export const ctGetInfo = async () => {
  try {
    const res = await axios.get(import.meta.env.VITE_SERVER + "api/getinfo");
    return res.data['info'];
  } catch (error) {
    console.log(error);
    return null;
  }
};