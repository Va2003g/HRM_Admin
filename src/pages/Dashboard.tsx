import React from "react";
import colors from "../colors";
import { Service, Navbar, Sidebar } from "../components";
export const Dashboard = () => {
  return (
    <div className="h-full w-full" style={{ backgroundColor: colors.primary }}>
      <Navbar />
      <div className="flex gap-3">
        <Sidebar />
        <div className="mt-9 relative left-9">
          <Service />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
