import { configureStore } from "@reduxjs/toolkit";
import UserData from './UserData/UserDataSlice'
export const store = configureStore({
  reducer: {
    userData: UserData,
  },
});

export type RootState = ReturnType<typeof store.getState>;
