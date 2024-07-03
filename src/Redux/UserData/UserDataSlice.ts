import { createSlice } from "@reduxjs/toolkit";

export interface userDataType {
    displayName:string,
    email:string,
    photoURL:string,
}
interface UserState {
    data: userDataType;
  }
const initialState:UserState = {
    data:{
        displayName: "",
        email: "",
        photoURL: ""
    }
}

export const userSlice = createSlice({
    name:"UserData",
    initialState,
    reducers:{
        update:(state,action)=>{
            state.data = action.payload;
        }
    }
})

export const {update} = userSlice.actions
export default userSlice.reducer