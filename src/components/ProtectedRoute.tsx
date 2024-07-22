
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../backend";
import {
  query,
  collection,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { update } from "../Redux/UserData/UserDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Route } from "../routes";

export const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User = useSelector((state: RootState) => state.userData.data);
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("user in Protected Routes: ", user);
        const { email, photoURL } = user;
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
        }
      }
        else {
          dispatch(update(null));
        }
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, [dispatch]);
  async function handleLogOut() {
    signOut(auth)
      .then(() => {
        console.log("sigend out");
        navigate(Route.LOGIN_PAGE);
      })
      .catch((err) => {
        alert(`Error while logging out ${err}`);
      });
  }
  if (!authChecked) {
    return <div className="h-full flex justify-center items-center text-4xl">Loading...</div>;
  }
  if (authChecked && User && User.role === "Employee") {
    return (
      <div className="flex flex-col justify-center items-center text-4xl h-full">
        <h3>You are not authorized to access Admin Portal</h3>
        <button
          onClick={handleLogOut}
          className="border bg-emerald-800 text-white rounded-lg p-4 text-xl"
        >
          Go Back
        </button>
      </div>
    );
  }

  return <div>{User ? <Outlet /> : <Navigate to={Route.LOGIN_PAGE} />}</div>;
};

export default ProtectedRoute;
