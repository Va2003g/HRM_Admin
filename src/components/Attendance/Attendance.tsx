import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { db } from "../../backend";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { LeaveFormType } from "../LeaveTracker";
interface AttendanceType {
  date: string;
  emoployeeId: string;
  attendanceType: string;
  id: string;
}

export const Attendance = () => {
  const [attendance, setAttendance] = useState<AttendanceType[]>([]);
  const [leaves, setLeaves] = useState<LeaveFormType[]>([]);
  const employeeData = useSelector(
    (state: RootState) => state.employeeData.employeeData
  );
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  useEffect(() => {
    const leavesQuery = query(
      collection(db, "Attendance"),
      where("employeeId", "==", selectedEmployee)
    );

    const unsubscribe = onSnapshot(
      leavesQuery,
      (snapshot) => {
        const leavesData = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as AttendanceType)
        );
        setAttendance(leavesData);
      },
      (error) => {
        console.error("Error fetching leaves: ", error);
      }
    );

    return () => unsubscribe();
  }, [selectedEmployee]);

  useEffect(() => {
    const leavesQuery = query(
      collection(db, "Leaves"),
      where("employeeId", "==", selectedEmployee)
    );

    const unsubscribe = onSnapshot(
      leavesQuery,
      (snapshot) => {
        const leavesData = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as LeaveFormType)
        );
        setLeaves(leavesData);
      },
      (error) => {
        console.error("Error fetching leaves: ", error);
      }
    );

    return () => unsubscribe();
  }, [selectedEmployee]);


  const getTileContent = ({ date }: { date: Date }) => {
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    console.log("formattedDate: ", formattedDate);
    const attendanceRecord = attendance.find(
      (record) => record.date === formattedDate
    );
    console.log("attendanceRecord: ", attendanceRecord);

    if (attendanceRecord) {
      if (
        attendanceRecord.attendanceType.toLowerCase() ===
        "Work from Home".toLowerCase()
      ) {
        return <div className=" text-purple-800 underline">WFH</div>;
      } else if (
        attendanceRecord.attendanceType.toLowerCase() ===
        "Work from Office".toLowerCase()
      ) {
        console.log(
          'attendanceRecord.attendanceType.toLowerCase() === "Work from Office".toLowerCase(): ',
          attendanceRecord.attendanceType.toLowerCase() ===
            "Work from Office".toLowerCase()
        );
        return <div className=" text-green-800 underline">WFO</div>;
      }
    }
    const leaveRecord = leaves.find((record)=>record.status==='Approved' && record.date===formattedDate)
    if(leaveRecord)
    {
        return <div className="text-red-600 underline">Leave</div>;
    }

    return "";
  };
  return (
    <div className="w-full">
      <div className="flex flex-row p-4 justify-between">
        <div className="text-3xl font-medium text-gray-900 font-[Roboto] tracking-wide">
          Attendance Record
        </div>
        <select
          value={selectedEmployee || ""}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          className="w-1/3 border border-gray-300 rounded-md p-3"
        >
          <option value="" disabled>
            Select an Employee
          </option>
          {employeeData.map(
            (emp) =>
              emp.role === "Employee" && (
                <option key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName} {"  "}
                </option>
              )
          )}
        </select>
      </div>
      <div className="flex items-center w-full">
        <Calendar
          tileContent={getTileContent}
          maxDate={new Date()}
          className={'mx-auto scale-x-150 scale-y-150 translate-y-40'}
        />
      </div>
    </div>
  );
};

export default Attendance;
