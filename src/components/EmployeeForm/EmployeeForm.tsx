import React, { useState } from "react";


import colors from "../../colors";
import { AddUser } from "../../backend";

{/* <div className="flex justify-between ">
        <div className="w-1/3 pr-6">
          <h2 className="text-lg font-medium">Profile</h2>
        </div>
        <div className="w-2/3 bg-white p-4 rounded-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              About
            </label>
            <textarea
              placeholder="Write a few sentences about yourself."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Photo
            </label>
            <div className="flex items-center mt-2">
              <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <svg
                  className="h-full w-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 24H0V0h24v24z" fill="none" />
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zM12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" />
                </svg>
              </span>
              <button
                type="button"
                className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Change
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Cover photo
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path d="M8 16v28h32V16H8zm16-4a4 4 0 110-8 4 4 0 010 8zm4 20h8v-8h-8v8zm-16 0h8v-8h-8v8zm0-16h8v-8h-8v8z" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-p-2 upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </div> */}
export interface formDataType {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  role: string;
  dateOfJoining: string;
  address: string;
  contactNo: string;
  city: string;
  state: string;
  postalCode: string;
  photoURL:string
}

export const EmployeeForm = () => {
  const [errors, setErrors] = useState<Partial<formDataType>>({});
  const [formData, setFormData] = useState<formDataType>({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    role: 'Employee',
    dateOfJoining: '',
    address: '',
    contactNo: '',
    city: '',
    state: '',
    postalCode: '',
    photoURL:'',
  });
  const validateForm = () => {
    const newErrors: Partial<formDataType> = {};

    Object.keys(formData).forEach(key => {
      if (key!=='photoURL'&&!formData[key as keyof formDataType]) {
        newErrors[key as keyof formDataType] = '*This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()){
      console.log('OK WALA',formData);
      AddUser(formData).then(()=>{
        alert('Data Saved Successfully')
      }).catch((err)=>alert(`Error while saving data ${err}`))
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        role: 'Employee',
        dateOfJoining: '',
        address: '',
        contactNo: '',
        city: '',
        state: '',
        postalCode: '',
        photoURL:''
      })

    }
    console.log(formData);
    
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: '',
    }));
  };

  return (
    // <div
    //   className="w-full m-5 p-6 rounded-lg shadow-md h-screen hide-scrollbar"
    //   style={{ backgroundColor: colors.secondary }}
    // >
    //   <div className="flex justify-between mb-6 -mt-2">
    //     <div className="w-1/3 pr-6">
    //       <h2 className="text-lg font-medium">Employee Personal Information</h2>
    //     </div>
    //     <div className="w-2/3 bg-white rounded-lg shadow-md p-4">
    //       <form onSubmit={handleSubmit}>
    //         <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
    //           <div>
    //             <label className="block text-sm font-medium text-gray-700">
    //               First name
    //             </label>
    //             <input
    //               type="text"
    //               name="firstName"
    //               value={formData.firstName}
    //               onChange={changeHandler}
    //               className="p-2 h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    //             />
    //           </div>
    //           <div>
    //             <label className="block text-sm font-medium text-gray-700">
    //               Last name
    //             </label>
    //             <input
    //               type="text"
    //               name="lastName"
    //               value={formData.lastName}
    //               onChange={changeHandler}
    //               className="p-2 h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    //             />
    //           </div>
    //           <div className="sm:col-span-2">
    //             <label className="block text-sm font-medium text-gray-700">
    //               Email address
    //             </label>
    //             <input
    //               type="email"
    //               name="email"
    //               value={formData.email}
    //               onChange={changeHandler}
    //               className="p-2 h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    //             />
    //           </div>
    //           <div className="sm:col-span-2">
    //             <label className="block text-sm font-medium text-gray-700">
    //               Country
    //             </label>
    //             <select
    //               name="country"
    //               value={formData.country}
    //               onChange={changeHandler}
    //               className="p-2 h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    //             >
    //               <option value="">Select country</option>
    //               <option value="India">India</option>
    //               <option value="United States">United States</option>
    //               <option value="Canada">Canada</option>
    //               <option value="Mexico">Mexico</option>
    //             </select>
    //           </div>
    //           <div className="sm:col-span-2 flex gap-2">
    //             <div>
    //               <label className="block text-sm font-medium text-gray-700">
    //                 Role
    //               </label>
    //               <select
    //                 name="role"
    //                 value={formData.role}
    //                 onChange={changeHandler}
    //                 className="p-2 h-10 mt-1 col-span-10 block w-[500px] border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    //               >
    //                 <option value="Employee">Employee</option>
    //                 <option value="Admin">Admin</option>
    //                 <option value="Manager">Manager</option>
    //               </select>
    //             </div>

    //             <div className="">
    //               <label className="block text-sm font-medium text-gray-700">
    //                 Date of Joining
    //               </label>
    //               <input
    //                 type="date"
    //                 name="dateOfJoining"
    //                 value={formData.dateOfJoining}
    //                 onChange={changeHandler}
    //                 className="p-2 h-10 mt-1 block w-[210px] border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    //               />
    //             </div>
    //           </div>
    //           <div className="sm:col-span-2">
    //             <label className="block text-sm font-medium text-gray-700">
    //               Street address
    //             </label>
    //             <input
    //               type="text"
    //               name="address"
    //               value={formData.address}
    //               onChange={changeHandler}
    //               className="p-2 h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    //             />
    //           </div>
    //           <div>
    //             <label className="block text-sm font-medium text-gray-700">
    //               Contact No.<span className="text-xs">(123-456-7890)</span>
    //             </label>
    //             <input
    //               type="number"
    //               name="contactNo"
    //               value={formData.contactNo}
    //               onChange={changeHandler}
    //               className="p-2 h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    //             />
    //           </div>
    //           <div>
    //             <label className="block text-sm font-medium text-gray-700">
    //               City
    //             </label>
    //             <input
    //               type="text"
    //               name="city"
    //               value={formData.city}
    //               onChange={changeHandler}
    //               className="p-2 h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    //             />
    //           </div>
    //           <div>
    //             <label className="block text-sm font-medium text-gray-700">
    //               State / Province
    //             </label>
    //             <input
    //               type="text"
    //               name="state"
    //               value={formData.state}
    //               onChange={changeHandler}
    //               className="p-2 h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    //             />
    //           </div>
    //           <div>
    //             <label className="block text-sm font-medium text-gray-700">
    //               ZIP / Postal code
    //             </label>
    //             <input
    //               type="text"
    //               name="postalCode"
    //               value={formData.postalCode}
    //               onChange={changeHandler}
    //               className="p-2 h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    //             />
    //           </div>
    //         </div>
    //         <div className="flex justify-end mt-6">
    //           <button
    //             type="button"
    //             className="mr-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //           >
    //             Cancel
    //           </button>
    //           <button
    //             type="submit"
    //             className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //             onClick={handleSubmit}
    //           >
    //             Save
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div
      className="w-full m-5 p-6 rounded-lg shadow-md h-screen hide-scrollbar"
      style={{ backgroundColor: colors.secondary }}
    >
      <div className="flex justify-between mb-6 -mt-2">
        <div className="w-1/3 pr-6">
          <h2 className="text-lg font-medium">Employee Personal Information</h2>
        </div>
        <div className="w-2/3 bg-white rounded-lg shadow-md p-4 ">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={changeHandler}
                  className="p-2 h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.firstName && <p className="text-red-500 text-sm absolute">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={changeHandler}
                  className="p-2 h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                  className="p-2 h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={changeHandler}
                  className="p-2 h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">Select a country</option>
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Mexico">Mexico</option>
                </select>
                {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
              </div>
              <div className="sm:col-span-2 flex gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={changeHandler}
                    className="p-2 h-10 mt-1 col-span-10 block w-[500px] border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="Employee">Employee</option>
                    <option value="Admin">Admin</option>
                    {/* <option value="SuperAdmin">SuperAdmin</option> */}
                    <option value="Manager">Manager</option>
                  </select>
                  {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                </div>
                <div className="">
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Joining
                  </label>
                  <input
                    type="date"
                    name="dateOfJoining"
                    value={formData.dateOfJoining}
                    onChange={changeHandler}
                    className="p-2 h-10 mt-1 block w-[210px] border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  {errors.dateOfJoining && <p className="text-red-500 text-sm">{errors.dateOfJoining}</p>}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Street address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={changeHandler}
                  className="p-2 h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact No.<span className="text-xs">(123-456-7890)</span>
                </label>
                <input
                  type="number"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={changeHandler}
                  className="p-2 h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.contactNo && <p className="text-red-500 text-sm">{errors.contactNo}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={changeHandler}
                  className="p-2 h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State / Province
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={changeHandler}
                  className="p-2 h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ZIP / Postal code
                </label>
                <input
                  type="number"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={changeHandler}
                  className="p-2 h-10 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="button"
                className="mr-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EmployeeForm;
