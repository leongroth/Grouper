import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";


export default function Tekstskriver() {
  const [inputValue, setInputValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [timeValue, setTimeValue] = useState();
  const styles= [textStyle, textStyle2];
  const [descriptionList, setDescriptionList] = useState([]);

  const descriptionCollectionRef = collection(db, "Teamwall")

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

  useEffect(() => {
    getDescriptionList();

  }, );

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    getDescriptionList();
  };

  const handleNameChange = (event) => {
    setNameValue(event.target.value);
    getDescriptionList();
  };
  
  const handleDateChange = (event) => {
  setTimeValue(event.target.value);
  getDescriptionList();
  }

  const handleClick = async () => {
    await addDoc(descriptionCollectionRef, {Description: inputValue, Username: nameValue, TimeStamp: timeValue } );
    setInputValue("");
    setNameValue("");
    setTimeValue(0);
    getDescriptionList();

  };
  const deleteDescription = async(id) => {
    const descriptionDoc = doc(db, "Teamwall", id )
    await deleteDoc(descriptionDoc);
    getDescriptionList();
  }

  return (
    <>
     <input type="text" value={inputValue} placeholder="Write description here" onChange={handleInputChange} />
     <input type="text" value={nameValue} placeholder="Write name here" onChange={handleNameChange} />
     <input type="date"  value={timeValue} onChange={handleDateChange} />
      <button onClick={handleClick}>Show input</button>
      


      <div>
        {descriptionList.map((Teamwall,index) => (
          <div style={styles[(index+2)%2]} key={Teamwall.id}>
            <h1>{Teamwall.Username}</h1>
            <p>{Teamwall.Description}</p>
            <p>{Teamwall.TimeStamp}</p>
            <button onClick={() => deleteDescription(Teamwall.id)}>Clear Note</button>
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