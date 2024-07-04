import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUsers, FaFolder, FaCalendarAlt } from "react-icons/fa";
import { Route } from "../../routes";
import { FaSnowman } from "react-icons/fa6";
import { IoReceiptOutline } from "react-icons/io5";
import { BiReceipt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setFalse, setTrue } from "../../Redux/booleanSlice/booleanSlice";
export const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <div className="h-screen w-64 bg-white shadow-md rounded-2xl">
      <nav className="px-4 mt-10">
        <NavLink
          to={Route.DASHBOARD}
          className="flex items-center gap-3 py-3 text-blue-600"
          style={({ isActive }) => ({
            color: isActive ? "blue" : "gray",
          })}
        >
          <FaHome className="text-xl" />
          Dashboard
        </NavLink>
        <NavLink
          to={Route.ADD_EMPLOYEE}
          className={`flex items-center gap-3 py-3 text-gray-600`}
          style={({ isActive }) => ({
            color: isActive ? "blue" : "gray",
          })}
          onClick={() => {
            dispatch(setFalse("showEmployeeForm"));
            dispatch(setTrue("showEmployees"));
          }}
        >
          <FaUsers className="text-xl" />
          Show Employees
        </NavLink>
        <NavLink
          to={Route.PAY_ROLL}
          className="flex items-center gap-3 py-3 text-gray-600"
          style={({ isActive }) => ({
            color: isActive ? "blue" : "gray",
          })}
        >
          <IoReceiptOutline className="text-xl" />
          Pay Roll
        </NavLink>
        <NavLink
          to={Route.PROJECT}
          className="flex items-center gap-3 py-3 text-gray-600"
          style={({ isActive }) => ({
            color: isActive ? "blue" : "gray",
          })}
        >
          <FaFolder className="text-xl" />
          Projects
        </NavLink>
        <NavLink
          to={Route.LEAVE_TRACKER}
          className="flex items-center gap-3 py-3 text-gray-600"
          style={({ isActive }) => ({
            color: isActive ? "blue" : "gray",
          })}
        >
          <FaCalendarAlt className="text-xl" />
          Leaves
        </NavLink>

        <NavLink
          to={Route.PAY_SLIP}
          className="flex items-center gap-3 py-3 text-gray-600"
          style={({ isActive }) => ({
            color: isActive ? "blue" : "gray",
          })}
        >
          <BiReceipt className="text-xl" />
          Pay Slip
        </NavLink>
      </nav>
      <div className="px-4 mt-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Your teams
        </h3>
        <div className="flex items-center gap-3 py-3 text-gray-600">
          <div className="h-6 w-6 flex items-center justify-center bg-gray-200 rounded-full">
            C
          </div>
          Currently not in any Project
        </div>
      </div>
      <nav className="px-4 mt-6 relative top-[29%] left-3">
        <NavLink
          to={Route.PROFILE}
          className="flex items-center gap-3 py-3 text-gray-600 text-lg"
        >
          <FaSnowman className="text-[22px]" />
          Profile
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
