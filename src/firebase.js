// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwh8N4vwmzfkyIAmfdvGqJLOuTF9wBvOo",
  authDomain: "transporter-b80fb.firebaseapp.com",
  projectId: "transporter-b80fb",
  storageBucket: "transporter-b80fb.firebasestorage.app",
  messagingSenderId: "373790816073",
  appId: "1:373790816073:web:56725abfbb04139a7ecc98",
  measurementId: "G-E9VNK9EDPX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);