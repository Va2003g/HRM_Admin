import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { Route } from "../../routes";
import { signOut } from "firebase/auth";
import { auth } from "../../backend";
import { Link, useNavigate } from "react-router-dom";
import { FcBusinessman } from "react-icons/fc";
import { setFalse, setTrue } from "../../Redux/booleanSlice/booleanSlice";

export const Navbar = () => {
  const userData = useSelector((state: RootState) => state.userData.data);
  const navigate = useNavigate();
  const [showDropDown, setShowDropDown] = useState(false);
  async function handleLogOut() {
    signOut(auth)
      .then(() => {
        navigate(Route.LOGIN_PAGE);
      })
      .catch((err) => {
        alert(`Error while logging out ${err}`);
      });
  }
  const dispatch = useDispatch()
  const displayName = userData.firstName + " " + userData.lastName
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="GeekyAnts"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to={Route.DASHBOARD}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  aria-current="page"
                >
                  Dashboard
                </Link>
                <Link
                  to={Route.ADD_EMPLOYEE}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  onClick={() => {
                    dispatch(setTrue("showEmployeeForm"));
                    dispatch(setFalse("showEmployees"));
                  }}
                >
                  Add Employees
                </Link>
                <Link
                  to={Route.DASHBOARD}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Projects
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>

            <div className="relative ml-3">
              <div className="flex gap-3 items-center">
                {displayName && (
                  <span className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                    {displayName}
                  </span>
                )}
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => setShowDropDown(!showDropDown)}
                >
                  {userData.photoURL ? (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={userData.photoURL}
                      alt=""
                    />
                  ) : (
                    <FcBusinessman className="text-3xl" />
                  )}
                </button>
              </div>
              {showDropDown && (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <Link
                    to={Route.PROFILE}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    id="user-menu-item-0"
                  >
                    Your Profile
                  </Link>
                  <div
                    onClick={handleLogOut}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    id="user-menu-item-2"
                  >
                    Sign out
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
