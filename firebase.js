// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNL5af80ZyXzp4zekshIXnzyP1DzWkF90",
  authDomain: "bloglist-8fb47.firebaseapp.com",
  databaseURL: "https://bloglist-8fb47-default-rtdb.firebaseio.com",
  projectId: "bloglist-8fb47",
  storageBucket: "bloglist-8fb47.firebasestorage.app",
  messagingSenderId: "692723903032",
  appId: "1:692723903032:web:cebd4591110e36863b94cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
export {auth, db}