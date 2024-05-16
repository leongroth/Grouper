import { onValue, push, ref, remove } from "firebase/database"
import { db } from "../config/firebase"
import { useState } from "react"
import "./PBL.css"

export default function PBL(){
    const [PBLlist, setPBLlist] = useState([])
    const [keyList, setKeyList] = useState([])
    const [titleValue, setTitleValue] = useState("")
    const [ruleValue, setRuleValue] = useState("")

    const PBLRef = ref(db, "PBL")

    const handleTitleChange= (event) => {
        setTitleValue(event.target.value)
    }

    const handleRuleChange= (event) => {
        setRuleValue(event.target.value)
    }


    const getPBLlist = () => {
        onValue(PBLRef, (snapshot) => {
            snapshot.forEach((childsnapshot) => {
                const title= childsnapshot.val().Title
                const rule= childsnapshot.val().Rule
                const key = childsnapshot.key

                if (keyList.indexOf(key)==-1) {
                    setPBLlist(prevPBLlist => [...prevPBLlist, {title:title, rule:rule, key:key}])
                    setKeyList(prevKeyList => [...prevKeyList, key]) 
                }
            })
        },{onlyOnce:true})
    }

getPBLlist()


    const AddRule = async () => {
        await push(PBLRef, {
            Title : titleValue,
            Rule : ruleValue,
        })
        setTitleValue("")
        setRuleValue("")
    }

    const deleteRule = async (id) => {
        await remove(ref(db, `PBL/${id}`));
        const newList=[]
        PBLlist.map((item)=> {
            if (item.key !=id) {
                newList.push(item)
            }
        })
        setPBLlist(newList)
      };

    return(
        <>
        <table>
            <tr>
        <div>
            <button onClick={ ()=> {window.open('https://www.studerende.aau.dk/studieliv/studieteknik/inspiration-til-dit-gruppearbejde#') }}>Group Conflics</button>
        </div>
        <div>
            <button onClick={()=> {window.open('https://www.kommunikation.aau.dk/uddannelser/kdm/regler-og-retningslinjer/projektrapporten')}}>Report Structure</button> 
        </div>
        </tr>
        </table>
        <div>
            <input type="text" placeholder="Write title of rule here" onChange={handleTitleChange} value={titleValue} />
            <textarea type="text" placeholder="Write description of rule here" onChange={handleRuleChange} value={ruleValue}/>
            <button onClick={AddRule}>Submit Rule</button>
        </div>
        <div>
            {PBLlist.map((PBL ) => {
                return(
                    <div className="paragraph" key={PBL.key}>
                    <h1>{PBL.title}</h1>
                    <p>{PBL.rule}</p>
                    <button onClick={() => deleteRule(PBL.key)}>
                        Delete Rule
                    </button>
                    </div>
                )
            }
            )}
        </div>
        </>
    )
}
