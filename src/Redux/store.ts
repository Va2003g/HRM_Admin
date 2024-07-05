import { configureStore } from "@reduxjs/toolkit";
import UserData from './UserData/UserDataSlice'
import booleanSlice from "./booleanSlice/booleanSlice";
import EmployeeSlice from "./EmployeeData/EmployeeSlice";
export const store = configureStore({
  reducer: {
    userData: UserData,
    booleanData:booleanSlice,
    employeeData:EmployeeSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
