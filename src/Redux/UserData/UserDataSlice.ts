import { createSlice } from "@reduxjs/toolkit";
import { formDataType } from "../../components";
// export interface userDataType {
//     displayName:string,
//     email:string,
//     photoURL:string,
// }
interface UserState {
  data: formDataType;
}
const initialState: UserState = {
  data: {
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    role: "",
    dateOfJoining: "",
    address: "",
    contactNo: "",
    city: "",
    state: "",
    postalCode: "",
    photoURL: "",
  },
};

export const userSlice = createSlice({
  name: "UserData",
  initialState,
  reducers: {
    update: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { update } = userSlice.actions;
export default userSlice.reducer;
