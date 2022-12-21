import Firebase from "firebase/compat/app";

import "firebase/compat/firestore";
import "firebase/compat/auth";

//we call function in the seedfile

// import { seedDatabase } from "../seeds";

const config = {
  apiKey: "AIzaSyDQBHTUQM4ApoCffCkaV8blXosc1f3E_Pg",
  authDomain: "instagram-aefab.firebaseapp.com",
  projectId: "instagram-aefab",
  storageBucket: "instagram-aefab.appspot.com",
  messagingSenderId: "1017835608222",
  appId: "1:1017835608222:web:7907ddedb699d632ef438f",
};

const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore;

// console.log(firebase);

//here we call seed file function only once

// seedDatabase(firebase);

export { firebase, FieldValue };
