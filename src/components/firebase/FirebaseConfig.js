// src/firebase.js

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwt0MLi58JOP3HMXWy4DiUAHEnKVX69yE",
  authDomain: "bysim-b44dd.firebaseapp.com",
  projectId: "bysim-b44dd",
  storageBucket: "bysim-b44dd.appspot.com",
  messagingSenderId: "1041280018669",
  appId: "1:1041280018669:web:fbc6cce9890761d7e644e4",
  measurementId: "G-K8VG2CT60C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
