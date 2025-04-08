// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuvd1AX2Z2s1ReXKKPnHF83c0kDpCAnUg",
  authDomain: "dashboard-financeiro-98805.firebaseapp.com",
  projectId: "dashboard-financeiro-98805",
  storageBucket: "dashboard-financeiro-98805.firebasestorage.app",
  messagingSenderId: "729974676393",
  appId: "1:729974676393:web:c346f528b27feb643602b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);