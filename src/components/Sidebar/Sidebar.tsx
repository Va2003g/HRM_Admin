import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUsers, FaFolder, FaCalendarAlt } from "react-icons/fa";
import { Route } from "../../routes";
import {FaRegCalendarCheck } from "react-icons/fa6";
import { IoReceiptOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setFalse, setTrue } from "../../Redux/booleanSlice/booleanSlice";
export const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-64 h-screen bg-white shadow-md rounded-2xl flex flex-col">
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
          to={Route.ATTENDANCE}
          className="flex items-center gap-3 py-3 text-gray-600"
          style={({ isActive }) => ({
            color: isActive ? "blue" : "gray",
          })}
        >
          <FaRegCalendarCheck className="text-xl" />
          Attendance Tracker
        </NavLink>
      </nav>

      {/* <nav className="align-bottom">
        <NavLink
          to={Route.PROFILE}
          className="flex items-center gap-3 py-3 text-gray-600 text-lg"
        >
          <FaSnowman className="text-[22px]" />
          Profile
        </NavLink>
      </nav> */}
    </div>
  );
};

export default Sidebar;
