// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, onSnapshot, doc } from "firebase/firestore"; 

// Firebase Configuration
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
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);
