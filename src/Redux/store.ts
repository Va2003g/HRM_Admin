import { configureStore } from "@reduxjs/toolkit";
import UserData from './UserData/UserDataSlice'
import booleanSlice from "./booleanSlice/booleanSlice";
export const store = configureStore({
  reducer: {
    userData: UserData,
    booleanData:booleanSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
