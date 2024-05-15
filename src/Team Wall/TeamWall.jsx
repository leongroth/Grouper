
import { useState } from "react";
import { auth, db } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { onValue, ref, set, push, remove} from "firebase/database"
import "./TeamWall.css"
import { TWPopup } from "./TeamWallPopup";

export default function Tekstskriver() {
  const [inputValue, setInputValue] = useState("");
  const [timeValue, setTimeValue] = useState();
  const styles= [textStyle1, textStyle2];
  const [descriptionList, setDescriptionList] = useState([]);
  const [twPopupState, setTwPopupState] = useState("false")

  const descriptionRef = ref(db, "Teamwall");

  const getDescriptionList = () => {
    onValue(descriptionRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const descriptionArray = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));
        setDescriptionList(descriptionArray);
      } else {
        setDescriptionList([]);
      }
    },{onlyOnce:true});
  };
getDescriptionList()

  const navigate = useNavigate()
  const now = new Date()
  const month = now.getMonth()+1
  const day = now.getDate()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  

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


  
  const handleDateChange = () => {
  setTimeValue([day, month, hours, minutes]);

  }

  const addData = async () => {
    const time = `${day}/${month} ${hours}:${minutes}`
    await push(descriptionRef, {
      Description: inputValue,
      TimeStamp: time,
      userId: auth.currentUser.uid,
    });
    setInputValue("")
    setTimeValue("")
    getDescriptionList()
  };


  const deleteDescription = async (id) => {
    await remove(ref(db, `Teamwall/${id}`));
  };

  document.addEventListener('DOMContentLoaded', () => {
    const textareaEle = document.getElementById('textarea');
    textareaEle.addEventListener('input', () => {
        textareaEle.style.height = 'auto';
        textareaEle.style.height = `${textareaEle.scrollHeight}px`;
    });
});


  return (
    <>
    <button onClick={() => {setTwPopupState(true)}}>open popup</button>
    <TWPopup trigger={twPopupState}>
     <textarea id="textarea" type="text" value={inputValue}  placeholder="Write description" onChange={handleInputChange} />
     <button onClick={()=> {setTwPopupState(false)}}>luk</button>
      <button onClick={addData}>Show input</button>
      </TWPopup>
      <div>
      <button onClick={logout}>Sign out</button>
      {descriptionList.map((teamwall, index) => (
          <div style={styles[(index+2)%2]} key={teamwall.id}>
            <h1 className="h1">{auth.currentUser.email}</h1>
            <p>{teamwall.Description}</p>
            <p>{[teamwall.TimeStamp]}</p>
            <button onClick={() => deleteDescription(teamwall.id)}>
              Clear Note
            </button>
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