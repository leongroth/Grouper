import { useState } from "react";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup ()  {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const register = async() =>{
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert(email + "  has succesfully signed up")
        }
        catch(err){
        console.error(err)
        }
    };

    return(
     <div>
        <h1>Register Here !</h1>
        <input 
        placeholder="email" 
        onChange={(e) => setEmail(e.target.value)}/>

        <input placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={register}>Register </button>
    </div>
);
}