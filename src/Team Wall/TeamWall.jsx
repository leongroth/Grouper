
import { useState } from "react";
import { auth, db } from "../config/firebase";
import { onValue, ref, push, remove} from "firebase/database"
import "./TeamWall.css"
import { TWPopup } from "./TeamWallPopup";

export default function Tekstskriver() {
  const [inputValue, setInputValue] = useState("")
  const styles= [textStyle1, textStyle2]
  const [descriptionList, setDescriptionList] = useState([])
  const [twPopupState, setTwPopupState] = useState(false)
  const [keyList, setKeyList] = useState([])
  const user = auth?.currentUser?.email

  const descriptionRef = ref(db, "Teamwall");

  const getDescriptionList = () => {
    onValue(descriptionRef, (snapshot) => {
      snapshot.forEach((childsnapshot) => {
      const description= childsnapshot.val().Description
      const timeStamp= childsnapshot.val().TimeStamp
      const userId=childsnapshot.val().userId
      const userEmail=childsnapshot.val().userEmail
      const key = childsnapshot.key

      if (keyList.indexOf(key)==-1) {
        setDescriptionList(prevdescriptionList => [...prevdescriptionList, {description:description, timeStamp:timeStamp, userId:userId, userEmail:userEmail, key:key}])
        setKeyList(prevKeyList => [...prevKeyList, key])
      }
    })
  },{onlyOnce:true})
}

getDescriptionList()

  const now = new Date()
  const month = now.getMonth()+1
  const day = now.getDate()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  




  const handleInputChange = (event) => {
    setInputValue(event.target.value);

  };


  


  const addData = async () => {
    const time = `${day}/${month} ${hours}:${minutes}`
    await push(descriptionRef, {
      Description: inputValue,
      TimeStamp: time,
      userId: auth.currentUser.uid,
      userEmail: user,
    });
    setInputValue("")
  };


  const deleteDescription = async (id) => {
    await remove(ref(db, `Teamwall/${id}`));
    const newList=[]
    descriptionList.map((item)=> {
        if (item.key !=id) {
            newList.push(item)
        }
    })
    setDescriptionList(newList)
  };




  return (
    <>
    <button className="addNote" onClick={() => {setTwPopupState(true)}}>+</button>
    <TWPopup trigger={twPopupState}>
     <textarea  type="text" value={inputValue}  placeholder="Write description" onChange={handleInputChange} />
     <button onClick={()=> {setTwPopupState(false)}}>luk</button>
      <button onClick={addData}>Show input</button>
      </TWPopup>
      <div>
      {descriptionList.map((teamwall, index) => (
          <div style={styles[(index+2)%2]} key={teamwall.key}>
            <h1 className="h1">{[teamwall.userEmail]}</h1>
            <p>{teamwall.description}</p>
            <p>{[teamwall.timeStamp]}</p>
            <button onClick={() => deleteDescription(teamwall.key)}>
              Clear Note
            </button>
            </div>
        ))}
      </div>

      

    </>
  ); 
}

 const textStyle1=  {
    width: "50%",
    height: "50%",
    background: "#ff8b94",
    marginLeft: "25%", 
    boxShadow: "5px 5px 12px 0.2px #535353",
}

const textStyle2={
    width: "40%",
    height: "fill",
    background: "#1b85b8",
    marginLeft: "50%",
    boxShadow: "5px 5px 12px 0.2px #535353",
} 