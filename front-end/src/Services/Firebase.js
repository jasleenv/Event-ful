import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
// import firebase from "firebase/app";
// import "firebase/auth";\import firebase from "firebase/compat/app";
import "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile
} from "firebase/auth";
dotenv.config();

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = getAuth();

export const userSignUp = (userName, email, password) => {
  let errorMessage = null
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      updateProfile(userCredential.user, {displayName: userName})
      console.log(`Created new user`)
      console.log(user)
    })
    .catch(e => {
    errorMessage = e.code
    console.log(`errorMessage is ${errorMessage}`)
    return errorMessage
  });
    
};

export const userSignIn = (email, password) => {
  let errorMessage = null
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      // console.log(`userCredential: ${userCredential}`)
      // console.log(Object.keys(userCredential))
      // console.log(Object.values(userCredential))
      // const user = userCredential.user;
      // console.log(`Firebase, line 57, ${user}`);
      // console.log(Object.keys(user));
      // console.log(user);
      //
    })
    .catch(e => {
      errorMessage = e.code
      console.log(`errorMessage is ${errorMessage}`)
      return errorMessage
    });
};

export const userGoogleSignIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export const userSignOut = () => {
  return signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("user signed out");
    })
    .catch((error) => {
      // An error happened.
      console.warn(error.message);
    });
};

