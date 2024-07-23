import { configureStore } from "@reduxjs/toolkit";
import UserData from './UserData/UserDataSlice'
import booleanSlice from "./booleanSlice/booleanSlice";
import EmployeeSlice from "./EmployeeData/EmployeeSlice";
import ProjectSlice from "./projectSlice";
import Permission  from "./PermissionsSlice";
export const store = configureStore({
  reducer: {
    userData: UserData,
    booleanData:booleanSlice,
    employeeData:EmployeeSlice,
    projectData:ProjectSlice,
    permission:Permission,
  },
});

export type RootState = ReturnType<typeof store.getState>;
