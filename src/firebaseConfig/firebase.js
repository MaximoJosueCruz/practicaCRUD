import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase vehiculos that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjbvE8-WoojuNZmRG3-NH77X03WWV1DYw",
  authDomain: "carritoej24pw.firebaseapp.com",
  projectId: "carritoej24pw",
  storageBucket: "carritoej24pw.appspot.com",
  messagingSenderId: "144991982109",
  appId: "1:144991982109:web:fb569c6f26be6283282cf4",
  measurementId: "G-RC9QJYB1SN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const  db = getFirestore(app);