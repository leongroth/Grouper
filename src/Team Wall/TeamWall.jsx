import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";


export default function Tekstskriver() {
  const [inputValue, setInputValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [timeValue, setTimeValue] = useState();
  const styles= [textStyle1, textStyle2];
  const [descriptionList, setDescriptionList] = useState([]);

  const descriptionCollectionRef = collection(db, "Teamwall")
  const navigate = useNavigate();
  const getDescriptionList = async () => {
    try{
    const data = await getDocs(descriptionCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(), 
      id:doc.id}));

    setDescriptionList(filteredData)
    }catch(err){
      console.error(err);
    }
  };
  getDescriptionList();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/home")
    } catch (err) {
      console.error(err);
    }
  };


  const handleInputChange = (event) => {
    setInputValue(event.target.value);

  };

  const handleNameChange = (event) => {
    setNameValue(event.target.value);

  };
  
  const handleDateChange = (event) => {
  setTimeValue(event.target.value);

  }

  const addData = async () => {
    await addDoc(descriptionCollectionRef, {Description: inputValue, Username: nameValue, TimeStamp: timeValue, userId:auth.currentUser.uid, } );
    setInputValue("");
    setNameValue("");
    setTimeValue(0);
    getDescriptionList();
    alert("Note added")
  };
  
  const deleteDescription = async(id) => {
    const descriptionDoc = doc(db, "Teamwall", id )
    await deleteDoc(descriptionDoc);
    getDescriptionList();
  }

  document.addEventListener('DOMContentLoaded', () => {
    const textareaEle = document.getElementById('textarea');
    textareaEle.addEventListener('input', () => {
        textareaEle.style.height = 'auto';
        textareaEle.style.height = `${textareaEle.scrollHeight}px`;
    });
});
  return (
    <>
     <textarea id="textarea" type="text" value={inputValue}  placeholder="Write description" onChange={handleInputChange} />
     <input type="text" value={nameValue} placeholder="Write name here" onChange={handleNameChange} />
     <input type="date"  value={timeValue} onChange={handleDateChange} />
      <button onClick={addData}>Show input</button>
      
      <div>
      <button onClick={logout}>Sign out</button>
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

 const textStyle1=  {
    width: "250px",
    height: "fill",
    background: "#ff8b94",
    margin: "5em",
    marginRight: "25em", 
    boxShadow: "5px 5px 12px 0.2px #535353",
}

const textStyle2={
  width: "250px",
    height: "fill",
    background: "#1b85b8",
    margin: "5em",
    marginLeft: "25em",
    boxShadow: "5px 5px 12px 0.2px #535353",
} 