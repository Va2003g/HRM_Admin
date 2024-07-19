import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import {
  query,
  collection,
  where,
  onSnapshot,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../backend";
import { FaMoneyBill, FaWallet } from "react-icons/fa";
import { FaBriefcaseMedical } from "react-icons/fa6";
import { IconType } from "react-icons";

interface DashboardPropType {
  icon: ReactElement<IconType>;
  value: number;
  total: number;
  label: string;
}
export interface LeaveType {
  PaidLeft: number;
  PaidTotal: number;
  SickLeft: number;
  SickTotal: number;
  UnpaidLeft: number;
  UnpaidTotal: number;
  EmployeeId: string;
  id: string;
}
export interface LeaveFormType {
  leaveType: string;
  date: string;
  reason?: string;
  status: string;
  employeeId: string;
  id: string;
}
const DashboardItem = ({ icon, value, total, label }: DashboardPropType) => (
  <div className="bg-white rounded-lg p-5 w-48 mb-5 flex flex-col items-center">
    <div className="text-gray-500">{icon}</div>
    <div className="text-2xl font-bold mt-2">
      {value}
      <span className="text-gray-500 text-base">/{total}</span>
    </div>
    <div className="mt-1 text-gray-600">{label}</div>
  </div>
);

const LeaveTracker = () => {
  const [leaves, setLeaves] = useState<LeaveFormType[]>([]);
  const [isListExpanded, setIsListExpanded] = useState(false);
  const employeeData = useSelector(
    (state: RootState) => state.employeeData.employeeData
  );
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [leavesData, setLeavesData] = useState<LeaveType>({
    PaidLeft: 0,
    PaidTotal: 0,
    SickLeft: 0,
    SickTotal: 0,
    UnpaidLeft: 0,
    UnpaidTotal: 0,
    EmployeeId: "",
    id: "",
  });
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
  useEffect(() => {
    const leaveQuery = query(
      collection(db, "Leaves Data"),
      where("EmployeeId", "==", selectedEmployee)
    );

    const unsubscribe = onSnapshot(
      leaveQuery,
      (snapshot) => {
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          const leaveData = { id: doc.id, ...doc.data() } as LeaveType;
          console.log("leaveData: ", leaveData);
          setLeavesData(leaveData);
        }
      },
      (error) => {
        console.error("Error fetching leave data: ", error);
      }
    );

    // Clean up the subscription on component unmount
    return () => unsubscribe();
  }, [selectedEmployee]);
  const handleStatusChange = async (
    leaveId: string,
    newStatus: string,
    leaveType: string
  ) => {
    try {
      const leaveDocRef = doc(db, "Leaves", leaveId);
      await updateDoc(leaveDocRef, { status: newStatus });
      // Optionally adjust the counts here based on leave type and status
      if (newStatus === "Approved") {
        console.log('newStatus: ', newStatus)
        const leaveQuery = query(
          collection(db, "Leaves Data"),
          where("EmployeeId", "==", selectedEmployee)
        );
        const leaveDataSnap = await getDocs(leaveQuery);

        // Check if there is any matching document
        if (!leaveDataSnap.empty) {
          leaveDataSnap.forEach(async (doc) => {
            const leaveData = doc.data();
            const updatedLeaveCount = leaveData[`${leaveType}Left`] - 1;

            // Update the leave count for the user
            await updateDoc(doc.ref, {
              [`${leaveType}Left`]: updatedLeaveCount,
            });
          });
        }
      } else {
        console.log('newStatus: ', newStatus)
        const leaveQuery = query(
          collection(db, "Leaves Data"),
          where("EmployeeId", "==", selectedEmployee)
        );
        const leaveDataSnap = await getDocs(leaveQuery);

        // Check if there is any matching document
        if (!leaveDataSnap.empty) {
          leaveDataSnap.forEach(async (doc) => {
            const leaveData = doc.data();
            if (leaveData[`${leaveType}Left`] < 12) {
              const updatedLeaveCount = leaveData[`${leaveType}Left`] + 1;
              await updateDoc(doc.ref, {
                [`${leaveType}Left`]: updatedLeaveCount,
              });
            }

            // Update the leave count for the user
          });
        }
      }
    } catch (error) {
      console.error("Error updating leave status: ", error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-row-reverse p-4">
        <select
          value={selectedEmployee || ""}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          className="w-1/3 border border-gray-300 rounded-md"
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
      {!isListExpanded && (
        <div className="flex flex-wrap justify-between">
          <DashboardItem
            icon={<FaBriefcaseMedical size={24} />}
            value={leavesData.SickLeft}
            total={leavesData.SickTotal}
            label="Sick Leave"
          />
          <DashboardItem
            icon={<FaMoneyBill size={24} />}
            value={leavesData.PaidLeft}
            total={leavesData.PaidTotal}
            label="Paid Leave"
          />
          <DashboardItem
            icon={<FaWallet size={24} />}
            value={leavesData.UnpaidLeft}
            total={leavesData.UnpaidTotal}
            label="Unpaid Leave"
          />
        </div>
      )}

      <div className="p-6 w-full mx-auto pt-2">
        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-4 py-2 sm:px-6 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Employees Leaves Data
              </h2>
            </div>
            {!isListExpanded ? (
              <button
                className="bg-indigo-600 text-white px-4 py-1 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                onClick={() => setIsListExpanded(!isListExpanded)}
              >
                Expand List
              </button>
            ) : (
              <button
                className="bg-indigo-600 text-white px-4 py-1 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                onClick={() => setIsListExpanded(!isListExpanded)}
              >
                Collapse List
              </button>
            )}
          </div>

          <div className="border-t border-gray-200">
            <div className="grid grid-cols-5 gap-4 bg-gray-50 px-6 py-3">
              <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Leave Type
              </div>
              <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reason
              </div>
              <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </div>
              <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </div>
              <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Change Status
              </div>
            </div>
            <div
              className={` ${
                isListExpanded ? "h-[640px]" : "h-[380px]"
              } overflow-scroll hide-scrollbar`}
            >
              {leaves.length === 0 && (
                <div className="flex justify-center items-center">
                  {" "}
                  No Data Found
                </div>
              )}
              {leaves.map((leave, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-5 gap-4 px-6 py-4 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <div className="text-sm font-medium text-gray-900">
                    {leave.leaveType} Leave
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {leave.leaveType === "Sick" ? "Take Care" : leave.reason}
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {leave.date}
                  </div>
                  <div
                    className="text-sm font-medium text-gray-900 px-2 py-1 rounded w-32 text-center align-middle"
                    style={{
                      backgroundColor:
                        leave.status === "Approved"
                          ? "#4caf50"
                          : leave.status === "Rejected"
                          ? "#f44336"
                          : "#ffa500",
                      color: "white",
                    }}
                  >
                    {leave.status}
                  </div>

                  <select
                    value={leave.status}
                    onChange={(e) =>
                      handleStatusChange(
                        leave.id,
                        e.target.value,
                        leave.leaveType
                      )
                    }
                    className="border border-gray-300 rounded-md w-32 text-center"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Approved">Approved</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveTracker;
