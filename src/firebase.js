import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLKyTjbn7ovAhIamYgmCBL0m2ZmcsfoeE",
  authDomain: "school-project-app-5ca6e.firebaseapp.com",
  projectId: "school-project-app-5ca6e",
  storageBucket: "school-project-app-5ca6e.appspot.com",
  messagingSenderId: "724171522578",
  appId: "1:724171522578:web:2a843f184246112516cecb"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
