import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";

export default function Tekstskriver() {
  const [inputValue, setInputValue] = useState("");
  const [inputValues, setInputValues] = useState([]); 
  const styles= [textStyle, textStyle2];
  const [descriptionList, setDescriptionList] = useState([]);

  const descriptionCollectionRef = collection(db, "Teamwall")

  useEffect(() => {
    const getDescriptionList = async () => {
      try{
      const data = await getDocs(descriptionCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(), 
        id:doc.id}))

      setDescriptionList(filteredData)
      }catch(err){
        console.error(err);
      }
    };
    getDescriptionList();
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = async () => {
    await addDoc(descriptionCollectionRef, {Description: inputValue, Username: "Frost" } )

    /*     setInputValues([...inputValues, inputValue]);
    setInputValue("");  */
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

      <div>
        {descriptionList.map((Teamwall,index) => (
          <div style={styles[(index+2)%2]} key={Teamwall.TimeStamp}>
            <h1>{Teamwall.Username}</h1>
            <p>{Teamwall.Description}</p>
            </div>
        ))}
      </div>

      

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