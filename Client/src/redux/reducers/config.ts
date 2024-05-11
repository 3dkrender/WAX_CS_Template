import { PayloadAction, createSlice, } from "@reduxjs/toolkit";

export type TStoreConfig = {
  lang: string;
}

const initialState: TStoreConfig = {
  lang: 'en_US'
};

const config = createSlice({
  name: "config",
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<string>) => {
      return { ...state, lang: action.payload }
    }
  }
});

export const { 
  setLang 
} = config.actions;
export default config.reducer;