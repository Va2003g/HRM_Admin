
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCEJU_SwVWCgfgsvDwFu8xjV9plsKok88o",
    authDomain: "hrmadmin-92a3e.firebaseapp.com",
    projectId: "hrmadmin-92a3e",
    storageBucket: "hrmadmin-92a3e.appspot.com",
    messagingSenderId: "807284430195",
    appId: "1:807284430195:web:78f093a05826d9d60de106",
    measurementId: "G-6KLEVXMKE8"
};

export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();