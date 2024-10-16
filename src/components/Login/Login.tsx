import React, { useEffect } from "react";
import { signInWithPopup } from "firebase/auth";

import { hero, logo, Google } from "../../assets";
import { auth, db, provider } from "../../backend";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../Redux/UserData/UserDataSlice";
import { useNavigate } from "react-router-dom";
import { Route } from "../../routes";
import {
  query,
  collection,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { RootState } from "../../Redux/store";
export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userData.data);
  useEffect(() => {
    if (user) {
      navigate(Route.DASHBOARD);
    }
  }, [user, navigate]);
  function handleLogin() {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const { displayName, email, photoURL } = result.user;
        console.log(displayName);
        console.log(email);
        console.log(photoURL);
        const queryForFindingUser = query(
          collection(db, "Employees"),
          where("email", "==", email)
        );
        const querySnapshot = await getDocs(queryForFindingUser);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userRef = doc(db, "Employees", userDoc.id);

          // Update the photoURL in the backend
          await updateDoc(userRef, { photoURL });

          // Dispatch the updated user data
          const updatedUserData = {
            ...userDoc.data(),
            photoURL,
          };
          dispatch(update(updatedUserData));
          // dispatch(update(userDoc.data()));
        }
        navigate(Route.DASHBOARD);
        console.log("result after signing in", result.user);
      })
      .catch((error) => {
        console.log("error while signing in", error);
      });
  }

  return (
    <div className="login w-full h-full flex relative justify-evenly bg-gradient-to-b from-[#4D62B3]/[0.3] to-[#849BDA]/[0.4] ">
      <div className="image relative top-[168.14px]">
        <img src={hero} alt="" className="w-[869.32px] h-[495px] aspect-auto" />
      </div>
      <div className="loginBlock flex flex-col relative top-[331px] gap-3">
        <div className="imageLogo">
          {/* <img 
            // src={logo} 
            alt="Logo" 
          /> */}
        </div>
        <div className="message text-[#232324] text-[25.2px] font-[600] leading-[37.8px] tracking-[0.10499993711709976px] text-left">
          Log In to Your Account
        </div>
        <div
          className="btn bg-[#FC5A5A] w-[338px] h-[50px] text-white justify-center flex items-center rounded-xl gap-2 text-sm cursor-pointer hover:bg-red-500"
          onClick={handleLogin}
        >
          <img src={Google} alt="" />
          Continue with Google
        </div>
      </div>
    </div>
  );
}

export default Login;
