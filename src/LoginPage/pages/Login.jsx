import { useState } from "react";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

export default function Login ()  {
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

    return(
     <div>
        <h1>Sign In Here !</h1>
        <input 
        placeholder="email" 
        onChange={(e) => setEmail(e.target.value)}/>

        <input placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={signIn}>Sign in </button>
    </div>
);
}