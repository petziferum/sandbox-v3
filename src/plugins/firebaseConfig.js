// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


// Projekt documentation-dfdb2
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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const signIn = () =>{
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("result", result);
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
        console.log("error", error)
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
}


export { functions, db , auth, provider, signIn};