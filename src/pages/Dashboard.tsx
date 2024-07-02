import React from "react";
import colors from "../colors";
import { Service, Navbar, Sidebar } from "../components";
const Dashboard = () => {
  return (
    <div className='h-full w-full' style={{ backgroundColor: colors.primary }} >
      <Navbar />
      <div className="flex gap-3">
        <Sidebar/>
        <Service />
      </div>
    </div>
  );
};

export default Dashboard;
