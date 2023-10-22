// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOy-QZKgPBq91LFf4RsE8Hgla9c3CfcRo",
  authDomain: "hackharvard-2023.firebaseapp.com",
  projectId: "hackharvard-2023",
  storageBucket: "hackharvard-2023.appspot.com",
  messagingSenderId: "725174418726",
  appId: "1:725174418726:web:4163912dfea501950d55e7",
  measurementId: "G-09X511MPLW"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);