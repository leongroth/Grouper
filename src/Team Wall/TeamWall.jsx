import React, {useState} from "react"

export default function Tekstskriver(){
    const [inputValue, setInputValue] = useState("");

    const handeInputchange = (event) => {
        setInputValue(event.target.value);
        console.log(inputValue);
    };

    return(
        <input type="text" value={inputValue} onChange={handeInputchange}/>
    );
}