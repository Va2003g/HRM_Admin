import React, { useEffect } from "react";
import "./App.css";
import {
  Login,
  Project,
  TimeSheet,
  LeaveTracker,
  Attendance,
  ProtectedRoute,
} from "./components";
import { Dashboard, AddEmployee, Layout } from "./pages";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/hr" element={<Layout />}>
            <Route path="project" element={<Project />} />
            <Route path="timesheet" element={<TimeSheet />} />
            <Route path="leaves" element={<LeaveTracker />} />
            <Route path="leaves" element={<LeaveTracker />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="*" element={<div>Coming Soon</div>} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
