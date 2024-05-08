import { useState } from "react";
import { auth } from "../config/firebase";
import {  signInWithEmailAndPassword } from "firebase/auth";

export const Log = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const signIn = async() =>{
        try {
            await signInWithEmailAndPassword(auth, email, password);  
            alert(email + "  is signed in")
        }
        catch(err){
        console.error(err)
        }
    };

//asdfasdfasdf
    return(
     <div>
        <input 
        placeholder="email" 
        onChange={(e) => setEmail(e.target.value)}/>

        <input placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={signIn}>Sign in </button>
    </div>
);
};