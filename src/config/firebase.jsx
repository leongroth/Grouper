
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getDatabase} from 'firebase/database'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBdx_hurbjgalcoZMNENB6H7mtKGc2bpHY",
  authDomain: "login-auth-6e5a8.firebaseapp.com",
  databaseURL: "https://login-auth-6e5a8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "login-auth-6e5a8",
  storageBucket: "login-auth-6e5a8.appspot.com",
  messagingSenderId: "522872966180",
  appId: "1:522872966180:web:a17c74f9a05ee5bf7edcb1"
};
  
//test

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getDatabase(app)

