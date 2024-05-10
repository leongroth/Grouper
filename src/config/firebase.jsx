
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {

  apiKey: "AIzaSyDgx-jxzxrD9B4NbJVYK8GUdHUQVEqxoxg",
  authDomain: "nytester-de30d.firebaseapp.com",
  projectId: "nytester-de30d",
  storageBucket: "nytester-de30d.appspot.com",
  messagingSenderId: "353756479601",
  appId: "1:353756479601:web:7a95da090d6f60a9d39bd0"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)

