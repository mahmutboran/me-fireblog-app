// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_authDomain,
  databaseURL: process.env.REACT_APP_FIREBASE_databaseURL,
  projectId: process.env.REACT_APP_FIREBASE_projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_appId,
});

export const auth = getAuth(app);
export const firebaseDB = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();
// export  const loginWithGoogle = () => {
//     googleProvider.setCustomParameters({ prompt: "select_account" });
//     signInWithPopup(auth, googleProvider)
//       .then((res) => {})
//       .catch((err) => {
//         console.log(err);
//       });
//   };
  export const loginWithGoogle = () => {

    signInWithPopup(auth, googleProvider)
        .then((result) => {
            console.log(result)
  

        }).catch((error) => {
            console.log(error)
        });
}