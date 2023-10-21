// Import the functions you need from the SDKs you need
<<<<<<< HEAD
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from '@firebase/auth';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDOy-QZKgPBq91LFf4RsE8Hgla9c3CfcRo",
  authDomain: "hackharvard-2023.firebaseapp.com",
  databaseURL: "https://hackharvard-2023-default-rtdb.firebaseio.com",
=======
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
>>>>>>> origin/main
  projectId: "hackharvard-2023",
  storageBucket: "hackharvard-2023.appspot.com",
  messagingSenderId: "725174418726",
  appId: "1:725174418726:web:4163912dfea501950d55e7",
  measurementId: "G-09X511MPLW"
};

<<<<<<< HEAD
// Initialize Firebase app if it's not already initialized
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const firestore = getFirestore();
export const auth = getAuth();
=======
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
>>>>>>> origin/main
