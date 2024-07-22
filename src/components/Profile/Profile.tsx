import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Redux/store';
import { update } from '../../Redux/UserData/UserDataSlice';
 // Assume this action exists

export const Profile = () => {
  const dispatch = useDispatch();
  const User = useSelector((state: RootState) => state.userData.data);

  const [phoneNumber, setPhoneNumber] = useState(User.contactNo);
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  const handleUpdatePhoneNumber = () => {
    if (isEditingPhone) {
      dispatch(update({ contactNo: phoneNumber }));
      setIsEditingPhone(false);
    } else {
      setIsEditingPhone(true);
    }
  };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         dispatch(update({ photoURL: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

  return (
    <div className="w-1/2 mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <div className="p-6">
              <img
                className="h-48 w-48 rounded-full object-cover mx-auto"
                src={User.photoURL}
                alt={`${User.firstName} ${User.lastName}`}
              />
              {/* <label className="block mt-4 text-center">
                <span className="sr-only">Choose profile photo</span>
                <input 
                  type="file" 
                  className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100"
                  accept="image/*"
                //   onChange={handlePhotoChange}
                />
              </label> */}
            </div>
          </div>
          <div className="p-8 flex-1">
            <h2 className="text-2xl font-bold text-gray-800">{`${User.firstName} ${User.lastName}`}</h2>
            <p className="text-gray-600">{User.email}</p>
            <div className="mt-4 space-y-4">
              <InfoItem label="Role" value={User.role} />
              <InfoItem label="Date of Joining" value={User.dateOfJoining} />
              <InfoItem label="Country" value={User.country} />
              <InfoItem label="State" value={User.state} />
              <InfoItem label="City" value={User.city} />
              <InfoItem label="Postal Code" value={User.postalCode} />
              <InfoItem label="Address" value={User.address} />
              <div className="flex items-center">
                <span className="font-semibold w-40">Phone Number:</span>
                {isEditingPhone ? (
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-md"
                  />
                ) : (
                  <span className="flex-1">{phoneNumber}</span>
                )}
                {/* <button
                  onClick={handleUpdatePhoneNumber}
                  className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                >
                  {isEditingPhone ? 'Save' : 'Edit'}
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }:{label:string,value:string}) => (
  <div className="flex">
    <span className="font-semibold w-40">{label}:</span>
    <span className="flex-1">{value}</span>
  </div>
);

export default Profile;