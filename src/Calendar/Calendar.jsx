import { useState } from "react"
import {db} from '../config/firebase'
import { onValue, ref, set, push, remove} from "firebase/database"
import { CalPopup } from "./CalendarPopup"
import './Calendar.css'

export function Calendar() {

    //Popup states and stuff
    const [popupState, setPopupState] = useState(false)
    const [popupDate, setPopupDate] = useState("")
    //----------------------
    
    // CALENDAR DATES
    const date = new Date()
    const year = date.getFullYear()
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const month = date.getMonth()

    const [selectedYear, setSelectedYear] = useState(year)
    const [selectedMonth, setSelectedMonth] = useState(month)


    const daysInMonth = (year, month) => new Date(year, month, 0).getDate()
    const daysInMonthBefore = daysInMonth(selectedYear, selectedMonth) 

    
    var firstDay = (new Date(year, selectedMonth, 1)).getDay()
        if (firstDay == 0) {
            firstDay = 7
        }
    //---------------

    // DB dates collector

    const [dates, setDates] = useState([])

    const datesCollector = () => {
        const reference = ref(db, "Calendar/")
        onValue(reference, (snapshot) => {
            snapshot.forEach((childsnapshot) => {
                const date = childsnapshot.key 
                const content = childsnapshot.val().content
                if (dates.indexOf(date) == -1 ){
                    setDates(prevDates => [...prevDates, date])
                }
            })
        }, {onlyOnce: true})
    }
    datesCollector()
    //----------------
    
    // DB content collector
    const [keys, setKeys] = useState([])
    const [contentDisplay, setContentDisplay] = useState([])

    const contentCollector = (date) => {
        const reference = ref(db, "Calendar/" + date)
        onValue(reference, (snapshot) => {
            snapshot.forEach((childsnapshot) => {
                const key = childsnapshot.key
                if (keys.indexOf(key) == - 1){
                    setKeys(preKeys => [...preKeys, key])
                    setContentDisplay(prevDisplay => [...prevDisplay, {key: key, time: childsnapshot.val().time, content: childsnapshot.val().content}])
                }
            })
        }, {onlyOnce: true})
    }
    //---------------------

    // DB Content Setter
    const [time, setTime] = useState("")
    const [content, setContent] = useState("")

    const contentSetter = (date, time, content) => {
        const reference = ref(db, "Calendar/" + date)
        push(reference, {
            time: time,
            content: content
        })
        datesCollector()
        contentCollector(popupDate)
    }
    //------------------

    // DB Delete content
    const contentDelete = (id) => {
        const reference = ref(db, "Calendar/" + `${popupDate}/` + id)
        remove(reference)
        const newContents = []
        contentDisplay.map((item) => {
            if (item.key != id){
                newContents.push(item)
            }
        },
        setContentDisplay(newContents)
    )
    }
    //------------------

    // Change selected month
    const lastMonth = () => {
        setSelectedMonth(selectedMonth - 1)
    }

    const nextMonth = () => {
        setSelectedMonth(selectedMonth + 1)
    }
    //----------------------

    // Render Calendar Days
    const renderMonth = (id) => {
        var day = 0
        var style = "inactiveDayStyle"
        var dotStyle = inactivityStyle 
        const data = []
        var date = `${day}-${selectedMonth + 1}-${selectedYear}`
        
        if (id < firstDay) {
            day = daysInMonthBefore - (firstDay - (id + 1))
            date = `${day}-${selectedMonth}-${selectedYear}`
        }
        if (id >= firstDay && id <= (firstDay + daysInMonth(selectedYear, selectedMonth + 1) - 1)) {
            day = (id - firstDay) + 1
            style = "activeDayStyle"
            date = `${day}-${selectedMonth + 1}-${selectedYear}`
        }
        if (id > (firstDay + daysInMonth(selectedYear, selectedMonth + 1) - 1)) {
            day = id - (daysInMonth(selectedYear, selectedMonth + 1) + firstDay - 1)
            date = `${day}-${selectedMonth + 2}-${selectedYear}`
        }

        if (dates.includes(date)){
            dotStyle = activityStyle
        }
        

        return (
            <div className={style} onClick={() => {setPopupDate(date), setPopupState(true), contentCollector(date)}}>
                <div className="calendarDay">{day}</div>
                <div style={dotStyle}></div>
            </div>
        )
    }
    //---------------------

    return (
        <div className="calendarpage">
            <button onClick={lastMonth}><div className="leftArrow"></div></button>
            <button onClick={nextMonth}>Next Month</button>
            <br></br>
            <div>{months[selectedMonth]}</div>
            <br></br>
            <br></br>
            <table className="Calendar">
                <tr>
                    <td className="tester">{renderMonth(1)}</td>
                    <td className="tester">{renderMonth(2)}</td>
                    <td className="tester">{renderMonth(3)}</td>
                    <td className="tester">{renderMonth(4)}</td>
                    <td className="tester">{renderMonth(5)}</td>
                    <td className="tester">{renderMonth(6)}</td>
                    <td className="tester">{renderMonth(7)}</td>
                </tr>
                <tr>
                    <td className="tester">{renderMonth(8)}</td>
                    <td className="tester">{renderMonth(9)}</td>
                    <td className="tester">{renderMonth(10)}</td>
                    <td className="tester">{renderMonth(11)}</td>
                    <td className="tester">{renderMonth(12)}</td>
                    <td className="tester">{renderMonth(13)}</td>
                    <td className="tester">{renderMonth(14)}</td>
                </tr>
                <tr>
                    <td className="tester">{renderMonth(15)}</td>
                    <td className="tester">{renderMonth(16)}</td>
                    <td className="tester">{renderMonth(17)}</td>
                    <td className="tester">{renderMonth(18)}</td>
                    <td className="tester">{renderMonth(19)}</td>
                    <td className="tester">{renderMonth(20)}</td>
                    <td className="tester">{renderMonth(21)}</td>
                </tr>
                <tr>
                    <td className="tester">{renderMonth(22)}</td>
                    <td className="tester">{renderMonth(23)}</td>
                    <td className="tester">{renderMonth(24)}</td>
                    <td className="tester">{renderMonth(25)}</td>
                    <td className="tester">{renderMonth(26)}</td>
                    <td className="tester">{renderMonth(27)}</td>
                    <td className="tester">{renderMonth(28)}</td>
                </tr>
                <tr>
                    <td className="tester">{renderMonth(29)}</td>
                    <td className="tester">{renderMonth(30)}</td>
                    <td className="tester">{renderMonth(31)}</td>
                    <td className="tester">{renderMonth(32)}</td>
                    <td className="tester">{renderMonth(33)}</td>
                    <td className="tester">{renderMonth(34)}</td>
                    <td className="tester">{renderMonth(35)}</td>
                </tr>
                <tr>
                    <td className="tester">{renderMonth(36)}</td>
                    <td className="tester">{renderMonth(37)}</td>
                    <td className="tester">{renderMonth(38)}</td>
                    <td className="tester">{renderMonth(39)}</td>
                    <td className="tester">{renderMonth(40)}</td>
                    <td className="tester">{renderMonth(41)}</td>
                    <td className="tester">{renderMonth(42)}</td>
                </tr>
            </table>
            <br></br>
            
            <CalPopup trigger={popupState} setTrigger={setPopupState}>
                <button className="PopupCloseBTN" onClick={() => {setPopupState(false), setContentDisplay([]), setKeys([]), setDates([]), datesCollector()}}>Close</button>
                <h2>{popupDate}</h2>
                <div>
                    <input type="time" onChange={(e) => {setTime(e.target.value)}}/>
                    <textarea placeholder="Type your activity here" onChange={(e) => {setContent(e.target.value)}}/>
                    <button onClick={() => { 
                        contentSetter(popupDate, time, content)
                    }}>Submit plan</button>
                </div>
                <div>
                    {contentDisplay.map((item) => {
                        return (
                            <div>
                                <table>
                                    <td><div>{item.time} {item.content}</div></td>
                                    <td><button onClick={() => {contentDelete(item.key)}}>Delete</button></td>
                                </table>
                            </div>
                        )
                    })}
                </div>
            </CalPopup>
        </div>
    )
}


const activityStyle = {
    width: "20px",
    height: "20px",
    borderRadius: "20px",
    background: "blue"
}

const inactivityStyle = {
    width: "20px",
    height: "20px",
    borderRadius: "20px",
}
