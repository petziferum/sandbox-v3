// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAQrUZ44HnkaVksAqUs4G79TiaG1Ejwiw0",
    authDomain: "documentation-dfdb2.firebaseapp.com",
    databaseURL: "https://documentation-dfdb2.firebaseio.com",
    projectId: "documentation-dfdb2",
    storageBucket: "documentation-dfdb2.appspot.com",
    messagingSenderId: "644597680458",
    appId: "1:644597680458:web:b26f46fb441a0a55b799b3",
    measurementId: "G-Y9ZR7M799S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { functions, db };