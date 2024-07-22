import { createSlice } from "@reduxjs/toolkit";
import { formDataType } from "../../components";

export interface formDataTypeWithId extends formDataType{
    id:string
  }
interface initialStateType{
    employeeData:formDataTypeWithId[]
}
const initialState:initialStateType = {
    employeeData:[]
}

export const employeeSlice = createSlice({
    name:"EmployeeSlice",
    initialState,
    reducers:{
        update:(state,action)=>{
            state.employeeData = action.payload;
            console.log('action.payload: ', action.payload)
        }
    }
})

export const {update} = employeeSlice.actions
export default employeeSlice.reducer