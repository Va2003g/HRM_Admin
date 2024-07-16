import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { db } from "../../backend";
import { formDataType } from "../EmployeeForm";
export interface TimeSheetDataType {
  projectName: string;
  description: string;
  time: string;
  id: string;
  employeeId: string;
  date: string;
  employee?: formDataType;
}

export const TimeSheet = () => {
  const [timesheets, setTimesheets] = useState<TimeSheetDataType[]>([]);
  
  useEffect(() => {
    const fetchEmployeeData = async (timesheet: TimeSheetDataType) => {
      const employeeDoc = doc(db, "Employees", timesheet.employeeId);
      const employeeSnapshot = await getDoc(employeeDoc);

      if (employeeSnapshot.exists()) {
        const employeeData = employeeSnapshot.data() as formDataType;
        return {
          ...timesheet,
          employee: employeeData,
        };
      } else {
        console.error("No such employee document!");
        return timesheet;
      }
    };

    const unsubscribe = onSnapshot(
      collection(db, "Timesheet"),
      async (snapshot) => {
        const timesheetsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as TimeSheetDataType[];

        const updatedTimesheetsData = await Promise.all(
          timesheetsData.map(
            async (timesheet) => await fetchEmployeeData(timesheet)
          )
        );

        setTimesheets(updatedTimesheetsData);
      }
    );

    return () => unsubscribe();
  }, []);
  const handleApproval = useCallback(async (id: string, status: string) => {
    await updateDoc(doc(db, "Timesheets", id), { status });
  }, []);
  console.log("timesheets", timesheets);
  return (
    <div>
      <h2 className="text-center text-3xl py-5">Employees TimeSheet</h2>
      <table className="min-w-full bg-white border rounded-3xl">
        <thead>
          <tr className="border-b text-center *:p-[12px]">
            <th>Employee Name</th>
            <th>Employee Email</th>
            <th>Project Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Hours Worked</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {timesheets.map((timesheet) => (
            <tr key={timesheet.id} className="border-b text-center *:p-[14px]">
              <td>
                {timesheet.employee?.firstName} {timesheet.employee?.lastName}
              </td>
              <td>{timesheet.employee?.email}</td>
              <td>{timesheet.projectName}</td>
              <td>{timesheet.description}</td>
              <td>{timesheet.date.split("T")[0]}</td>
              <td>{timesheet.time}</td>
              {/* <td className="py-2 px-4 border-b">{TimeSheetDataType.status}</td> */}
              <td>
                {/* {TimeSheetDataType.status === "Pending" && ( */}
                {/* <button
                  onClick={() =>
                    handleApproval(TimeSheetDataType.id, "Approved")
                  }
                  className="bg-green-600 text-white font-semibold rounded-3xl"
                >
                  <CheckCircleIcon />
                </button>
                <button
                  onClick={() =>
                    handleApproval(TimeSheetDataType.id, "Rejected")
                  }
                  className="bg-red-600 text-white font-semibold rounded-3xl"
                >
                  <CancelIcon />
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeSheet;
