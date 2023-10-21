// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

//Now import this
import 'firebase/firestore';

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
