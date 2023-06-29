import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  isLogged: false,
  balance: 0,
};

/**
 * User reducer
 */
const user:any = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPlayerData: (state, action) => action.payload,
    setPlayerLogout: (state, action) => action.payload,
    setPlayerBalance: (state, action) => ({
      ...state,
      balance: action.payload,
    }),
  },
});

export const { setPlayerData, setPlayerLogout, setPlayerBalance } =
  user.actions;
export default user.reducer;
