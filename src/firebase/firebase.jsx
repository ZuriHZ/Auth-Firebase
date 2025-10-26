// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD0VHaubqFtv-QucExMyuVjgyMXkAq-oRg",
    authDomain: "backend-01-f0da4.firebaseapp.com",
    projectId: "backend-01-f0da4",
    storageBucket: "backend-01-f0da4.firebasestorage.app",
    messagingSenderId: "844927214053",
    appId: "1:844927214053:web:dc1007fdc36aa328614f0c",
    measurementId: "G-JNNG5HVV83",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
