import React, { useEffect } from "react";
import "./App.css";
import {
  Login,
  Project,
  TimeSheet,
  LeaveTracker,
  Attendance,
  ProtectedRoute,
  Profile,
  Payroll,
} from "./components";
import { Dashboard, AddEmployee, Layout } from "./pages";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./Redux/store";
import {
  getDocs,
  query,
  collection,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "./backend";
import { PermissionType, upatePermissions } from "./Redux/PermissionsSlice";
function App() {
  // const setRoles = async () => {
  //   try {
  //     // Get all permissions for 'project' and 'user' entities
  //     const permissionsQuery = query(
  //       collection(db, 'Permissions'),
  //       where('entity', 'in', ['project', 'user'])
  //     );
  //     const permissionsSnapshot = await getDocs(permissionsQuery);

  //     if (!permissionsSnapshot.empty) {
  //       const allPermissions = permissionsSnapshot.docs.map(doc => ({
  //         id: doc.id,
  //         ...doc.data()
  //       }));

  //       // Define role-specific permissions
  //       const adminPermissions = allPermissions.map(p => p.id);
  //       const managerPermissions = allPermissions
  //         .filter(p => ['create', 'read'].includes(p.operation))
  //         .map(p => p.id);
  //       const employeePermissions = allPermissions
  //         .filter(p => p.operation === 'read')
  //         .map(p => p.id);

  //       // Update Admin role
  //       const adminQuery = query(collection(db, 'Roles'), where('name', '==', 'admin'));
  //       const adminSnapshot = await getDocs(adminQuery);
  //       if (!adminSnapshot.empty) {
  //         adminSnapshot.docs.forEach(async (d) => {
  //           await updateDoc(doc(db, 'Roles', d.id), { permissions: adminPermissions });
  //         });
  //       }

  //       // Update Manager role
  //       const managerQuery = query(collection(db, 'Roles'), where('name', '==', 'Manager'));
  //       const managerSnapshot = await getDocs(managerQuery);
  //       if (!managerSnapshot.empty) {
  //         managerSnapshot.docs.forEach(async (d) => {
  //           await updateDoc(doc(db, 'Roles', d.id), { permissions: managerPermissions });
  //         });
  //       }

  //       // Update Employee role
  //       const employeeQuery = query(collection(db, 'Roles'), where('name', '==', 'Employee'));
  //       const employeeSnapshot = await getDocs(employeeQuery);
  //       if (!employeeSnapshot.empty) {
  //         employeeSnapshot.docs.forEach(async (d) => {
  //           await updateDoc(doc(db, 'Roles', d.id), { permissions: employeePermissions });
  //         });
  //       }

  //       console.log('Roles updated successfully');
  //     }
  //   } catch (err) {
  //     console.error('Error updating roles:', err);
  //   }
  // };
  // useEffect(()=>{
  //   setRoles()
  // })
  const fetchUserPermissions = async (userRole: string) => {
    try {
      // Fetch role details
      const roleDoc = await getDocs(
        query(collection(db, "Roles"), where("name", "==", userRole))
      );
      const roleData = roleDoc.docs[0].data();
      const permissionIds = roleData?.permissions;

      if (!permissionIds) {
        throw new Error("Role permissions not found");
      }

      // Fetch complete permission data
      const permissionsData:PermissionType[] = await Promise.all(
        permissionIds.map(async (permissionId: string) => {
          const permissionDoc = await getDoc(
            doc(db, "Permissions", permissionId)
          );
          return {
            id: permissionDoc.id,
            ...permissionDoc.data(),
          } as PermissionType;
        })
      );

      return permissionsData;
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const userData = useSelector((state: RootState) => state.userData.data);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userData) {
      fetchUserPermissions(userData.role).then((permissionsData) => {
        console.log("permissionsData: ", permissionsData);
        if(permissionsData)
        dispatch(upatePermissions(permissionsData));
      });
    }
  }, [dispatch, userData]);
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
            <Route path="profile" element={<Profile />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="*" element={<div>Coming Soon</div>} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
