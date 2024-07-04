import React from "react";
import { Navbar, Sidebar, EmployeeForm, ShowEmployees } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { setFalse, setTrue } from "../Redux/booleanSlice/booleanSlice";

export const AddEmployee = () => {
  const showEmployeeForm = useSelector(
    (state: RootState) => state.booleanData["showEmployeeForm"]
  );
  const showEmployees = useSelector(
    (state: RootState) => state.booleanData["showEmployees"]
  );
  const dispatch = useDispatch();
  return (
    <div className="h-full w-full" style={{ backgroundColor: "white" }}>
      <Navbar />
      <div className="flex gap-3">
        <Sidebar />
        {!showEmployeeForm && !showEmployees && (
          <div className="mx-auto my-[25%]">
            <button
              className="h-fit py-3 px-4 mx-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                dispatch(setTrue("showEmployeeForm"));
                dispatch(setFalse("showEmployees"));
              }}
            >
              + Add Employees
            </button>
            <button
              className="h-fit py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                dispatch(setFalse("showEmployeeForm"));
                dispatch(setTrue("showEmployees"));
              }}
            >
              Show Employees
            </button>
          </div>
        )}
        {showEmployeeForm && <EmployeeForm />}
        {showEmployees && <ShowEmployees />}
      </div>
    </div>
  );
};

export default AddEmployee;
