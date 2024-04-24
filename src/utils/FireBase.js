import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAm2dY10EDr-RdT19drPdWKFJWb1yljp3U",
  authDomain: "bytechat-7523e.firebaseapp.com",
  projectId: "bytechat-7523e",
  storageBucket: "bytechat-7523e.appspot.com",
  messagingSenderId: "57505270082",
  appId: "1:57505270082:web:877a8574790e0bc4d6a0db",
  measurementId: "G-BS6K42J1X4",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
