import React, { useEffect } from "react";
import { db } from "../../backend";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import {
  onSnapshot,
  collection,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { update } from "../../Redux/EmployeeData/EmployeeSlice";
import { formDataType } from "../EmployeeForm";
import { MdDelete } from "react-icons/md";
import { FcBusinessman } from "react-icons/fc";
interface formDataTypeWithId extends formDataType {
  id: string;
}
export const ShowEmployees = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Employees"), (snapshot) => {
      const data: formDataTypeWithId[] = snapshot.docs.map(
        (dataEmployee) =>
          ({
            id: dataEmployee.id,
            ...dataEmployee.data(),
          } as formDataTypeWithId)
      );
      console.log("data", data);
      dispatch(update(data));
    });

    return () => unsubscribe();
  }, [dispatch]);
  const employeesData = useSelector(
    (state: RootState) => state.employeeData.employeeData
  );
  console.log("employeesData: ", employeesData);
  async function handleDelete(id: string) {
    try {
      const docRef = doc(db, "Employees", id); // Replace "collectionName" with the actual collection name
      await deleteDoc(docRef);
      console.log(`Document with ID ${id} deleted successfully`);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  }

  const handleRoleChange = async (
    id: string,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log("id: ", id);
    console.log("event: ", event.target.value);
  
    try {
      const userRef = doc(db, "Employees", id);
      await updateDoc(userRef, {
        role: event.target.value,
      });
  
      // // Fetch the updated document
      // const updatedDoc = await getDoc(userRef);
  
      // if (updatedDoc.exists()) {
      //   const updatedUserData = {
      //     id: updatedDoc.id,
      //     ...updatedDoc.data(),
      //   };
  
      //   // Dispatch the updated user data
      //   dispatch(update(updatedUserData));
      // }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Employees
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            "The way a team plays as a whole determines its success. You may
            have the greatest bunch of individual stars in the world, but if
            they don't play together, the club won't be worth a dime."
          </p>
        </div>
        <div className="flex flex-wrap -m-2">
          {employeesData.map((data) => (
            // <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={data.id} onClick={(event)=>console.log(event.target)}>
            <div
              className="h-full w-[360px] flex items-center border-gray-200 border p-4 rounded-lg m-2"
              onClick={(event) => console.log(event.target)}
              key={data.id}
            >
              {data.photoURL ? (
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src={data.photoURL}
                />
              ) : (
                <FcBusinessman className="text-3xl w-16 h-16 mr-4" />
              )}

              <div className="flex-grow">
                <h2 className="text-gray-900 title-font font-medium">
                  {data.firstName + " " + data.lastName}
                </h2>
                <p className="text-gray-500">{data.email}</p>
                <p className="text-gray-500">{data.dateOfJoining}</p>
                <div className="flex justify-between">
                  <select
                    name=""
                    id=""
                    className="outline-none"
                    onChange={(event) => handleRoleChange(data.id, event)}
                  >
                    <option className="text-gray-500" value={data.role}>
                      {data.role}
                    </option>
                    {data.role !== "Admin" && (
                      <option className="text-gray-500" value="Admin">
                        Admin
                      </option>
                    )}
                    {data.role !== "Employee" && (
                      <option className="text-gray-500" value="Employee">
                        Employee
                      </option>
                    )}
                    {data.role !== "Manager" && (
                      <option className="text-gray-500" value="Manager">
                        Manager
                      </option>
                    )}
                  </select>
                  <MdDelete
                    className="text-red-400 text-2xl cursor-pointer hover:text-red-700"
                    onClick={() => handleDelete(data.id)}
                  />
                </div>
                {/* <p className="text-gray-500">{data.role}</p> */}
              </div>
            </div>
            // </div>
          ))}
        </div>
      </div>
    </section>
  );
};
