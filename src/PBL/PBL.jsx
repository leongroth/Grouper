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
        <div>
            <h1 className="overskrift">
                PBL
            </h1>
            <p className="suboverskrift">
                Find help to your project or update the group contract
            </p>
        </div>
        <div className="PBLButtons">
            <button className="PBLButton" onClick={ ()=> {window.open('https://www.studerende.aau.dk/studieliv/studieteknik/inspiration-til-dit-gruppearbejde#') }}>Group Conflics</button>
            <button className="PBLButton" onClick={()=> {window.open('https://www.kommunikation.aau.dk/uddannelser/kdm/regler-og-retningslinjer/projektrapporten')}}>Report Structure</button> 
        </div>
        <div className="inputFields">
        <div className="Headline">
            Group Contract
        </div>
        <table className="tableClass">
            <tr>
            <input className="titleInp" type="text" placeholder=" Title here" onChange={handleTitleChange} value={titleValue} />
            </tr>
            <tr>
            <textarea className="ruleInp" type="text" placeholder="Write description of rule/addition to group contract here" onChange={handleRuleChange} value={ruleValue}/>
            </tr>
            <tr>
            <button className="submit" onClick={AddRule}>Submit Rule</button>
            </tr>
        </table>
        </div>
        <div className="paragraph">
            {PBLlist.map((PBL ) => {
                return(
                    <div className="paragraph1"  key={PBL.key}>
                        <h1 className="Title">{PBL.title}</h1>
                        <p className="Rule">{PBL.rule}</p>
                        <button className="deleteButton" onClick={() => deleteRule(PBL.key)}>
                        X
                        </button>
                    </div>
                )
            }
            )}
        </div>
        </>
    )
}
