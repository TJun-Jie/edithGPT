// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from '@firebase/auth';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDOy-QZKgPBq91LFf4RsE8Hgla9c3CfcRo",
  authDomain: "hackharvard-2023.firebaseapp.com",
  databaseURL: "https://hackharvard-2023-default-rtdb.firebaseio.com",
  projectId: "hackharvard-2023",
  storageBucket: "hackharvard-2023.appspot.com",
  messagingSenderId: "725174418726",
  appId: "1:725174418726:web:4163912dfea501950d55e7",
  measurementId: "G-09X511MPLW"
};

// Initialize Firebase app if it's not already initialized
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const firestore = getFirestore();
export const auth = getAuth();
