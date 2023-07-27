// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFHRR_D2QEnqNaB8lPSFOmNxo9jhaZOas",
  authDomain: "test-react-4c715.firebaseapp.com",
  databaseURL: "https://test-react-4c715-default-rtdb.firebaseio.com",
  projectId: "test-react-4c715",
  storageBucket: "test-react-4c715.appspot.com",
  messagingSenderId: "926844535330",
  appId: "1:926844535330:web:cdba4b386800e0a975807b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const db2 = getFirestore(app);
