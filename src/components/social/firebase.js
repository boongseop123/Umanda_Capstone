import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB72lmrafHEIDS2LygdgPXQxV1jsNXyeC8",
  authDomain: "umanda-7c999.firebaseapp.com",
  projectId: "umanda-7c999",
  storageBucket: "umanda-7c999.appspot.com",
  messagingSenderId: "798262424149",
  appId: "1:798262424149:web:674300da33a5f11a455adc",
  measurementId: "G-E1DG1Z7ENG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

export { db, app, auth };
