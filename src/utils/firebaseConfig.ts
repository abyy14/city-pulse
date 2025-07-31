// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-xhBF7xNvjHMnFTCoBB0oC3jtqIxm06Q",
  authDomain: "citypulse-91bab.firebaseapp.com",
  projectId: "citypulse-91bab",
  storageBucket: "citypulse-91bab.firebasestorage.app",
  messagingSenderId: "719066747366",
  appId: "1:719066747366:web:6c8dcd1f5618a0a01b8627"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);