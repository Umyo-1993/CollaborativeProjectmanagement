// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEaAr_sEZK8Rx2e9HQfkjBPlOVmtNWPow",
  authDomain: "studentdatabase-da249.firebaseapp.com",
  projectId: "studentdatabase-da249",
  storageBucket: "studentdatabase-da249.appspot.com",
  messagingSenderId: "835913752977",
  appId: "1:835913752977:web:92c2b5c2d0f92eac62fa30",
  measurementId: "G-3FQCC09WVZ"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const auth=getAuth(app);
