import React, { useState } from "react";

export default function Tekstskriver() {
  const [inputValue, setInputValue] = useState("");
  const [inputValues, setInputValues] = useState([]); 
  const styles= [textStyle, textStyle2];

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    setInputValues([...inputValues, inputValue]);
    setInputValue(""); 
  };

  return (
    <>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleClick}>Show input</button>
      
        {
        inputValues.map((value, index)=> (
            <div style={styles[(index+2)%2]} key={index+1}>
                <h2> {value}</h2>
            </div>
        ))
      }

    </>
  );
}

const textStyle= {
    width: "fill",
    height: "fill",
    background: "red",
    margin: "5em",
    marginRight: "25em",
}

const textStyle2={
  width: "fill",
    height: "fill",
    background: "blue",
    margin: "5em",
    marginLeft: "25em",
}