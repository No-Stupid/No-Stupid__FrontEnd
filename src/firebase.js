// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics,signInWithEmailAndPassword,createUserWithEmailAndPassword ,getAuth } from "firebase/auth";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtINbA0BxvZSo1kt0iGjVpZUuGHpNxFq4",
  authDomain: "no-stupid-4120a.firebaseapp.com",
  projectId: "no-stupid-4120a",
  storageBucket: "no-stupid-4120a.appspot.com",
  messagingSenderId: "288986517671",
  appId: "1:288986517671:web:8e9b2398438287f41ccb82",
  measurementId: "G-3HFF9B5XLH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const analytics = getAnalytics(app);

const firebaseAuth = getAuth(firebaseApp);

export { firebaseAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword };