// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgBwfUpy6pgzL5GNlntzxZ57mmqSkA_XQ",
  authDomain: "webanalisisdampaklalulintas.firebaseapp.com",
  databaseURL: "https://webanalisisdampaklalulintas-default-rtdb.firebaseio.com",
  projectId: "webanalisisdampaklalulintas",
  storageBucket: "webanalisisdampaklalulintas.appspot.com",
  messagingSenderId: "435784394834",
  appId: "1:435784394834:web:698c257010dee577cf178b",
  measurementId: "G-PE2FWCP87Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

