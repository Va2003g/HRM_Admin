import React, { useEffect } from "react";
import { db } from "../../backend";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { onSnapshot, collection } from "firebase/firestore";
import { update } from "../../Redux/EmployeeData/EmployeeSlice";
import { formDataType } from "../EmployeeForm";
interface formDataTypeWithId extends formDataType{
  id:string
}
export const ShowEmployees = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const data:formDataTypeWithId[]= [];
    try {
      const unsubscribe = onSnapshot(
        collection(db, "Employees"),
        (snapshot) => {
          snapshot.forEach((dataEmployee) => {
            data.push({
              id: dataEmployee.id,
              ...dataEmployee.data(),
            }as formDataTypeWithId);
          });
          console.log("data", data);
          dispatch(update(data));
        }
      );
      return unsubscribe;
    } catch (err) {
      console.log("Error while fetching employees data: ", err);
    }
  }, [dispatch]);
  const employeesData = useSelector(
    (state: RootState) => state.employeeData.employeeData
  );
  console.log("employeesData: ", employeesData);
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Employees
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            "The way a team plays as a whole determines its success. You may have
            the greatest bunch of individual stars in the world, but if they
            don't play together, the club won't be worth a dime."
          </p>
        </div>
        <div className="flex flex-wrap -m-2">
          {employeesData.map((data) => (
            // <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={data.id} onClick={(event)=>console.log(event.target)}>
              <div className="h-full w-fit flex items-center border-gray-200 border p-4 rounded-lg mx-2" onClick={(event)=>console.log(event.target)} key={data.id}>
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src={data.photoURL}
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    {data.firstName+ " "+data.lastName}
                  </h2>
                  <p className="text-gray-500">{data.email}</p>
                  <p className="text-gray-500">{data.dateOfJoining}</p>
                  <p className="text-gray-500">{data.role}</p>
                </div>
              </div>
            // </div>
          ))}
        </div>
      </div>
    </section>
  );
};
