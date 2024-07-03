// import { signInWithPopup } from "firebase/auth";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { auth, provider } from "../../Backend";
// import { update } from "../../Redux/UserData/UserDataSlice";
import React from "react";
// const dispatch = useDispatch()
// const dispatch = useDispatch();
//   const navigate = useNavigate();
//   function handleLogin() {
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         const { displayName, email, photoURL } = result.user;
//         console.log(displayName);
//         console.log(email);
//         console.log(photoURL);
//         dispatch(update({displayName,email,photoURL}))
//         navigate('/dashboard')
//         console.log("result after signing in", result.user);
//       })
//       .catch((error) => {
//         console.log("error while signing in", error);
//       })}