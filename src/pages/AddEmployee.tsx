import React from "react";
import { Navbar, Sidebar, EmployeeForm } from "../components";

export const AddEmployee = () => {
  return (
    <div className='h-full w-full' style={{ backgroundColor: 'white' }} >
      <Navbar />
      <div className="flex gap-3">
        <Sidebar/>
        <EmployeeForm />
      </div>
    </div>
  );
};


export default AddEmployee;
