
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getApp,getApps} from 'firebase/app';
const firebaseConfig = {
  apiKey: "AIzaSyBFITT50UUiRfMyAI6etJuvkh6R39UWhnc",
  authDomain: "alphabi-56fad.firebaseapp.com",
  projectId: "alphabi-56fad",
  storageBucket: "alphabi-56fad.appspot.com",
  messagingSenderId: "72932522130",
  appId: "1:72932522130:web:da6837ecdb268df36bce4b",
  measurementId: "G-P6HZY03VLN"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();
const analytics = app.name && typeof window !== 'undefined' ? getAnalytics(app) : null;
export { app, analytics,auth,db}