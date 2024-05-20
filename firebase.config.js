// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlK0RjlDE-qA6Ewl5PU-2ooG19ktxPt2c",
  authDomain: "cuadronecesidades.firebaseapp.com",
  projectId: "cuadronecesidades",
  storageBucket: "cuadronecesidades.appspot.com",
  messagingSenderId: "101063875282",
  appId: "1:101063875282:web:604f28c5be60a3ca83eb0b",
  measurementId: "G-MPC8XH1J8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export default app;
