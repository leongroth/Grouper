import { useState } from "react"
import {db} from '../config/firebase'
import { onValue, ref, set, push, remove} from "firebase/database"
import { CalPopup } from "./CalendarPopup"
import './Calendar.css'

export function Calendar(props) {

    //Popup states and stuff
    const [popupState, setPopupState] = useState(false)
    const [popupDate, setPopupDate] = useState("")
    //----------------------
    
    // CALENDAR DATES
    const date = new Date()
    const year = date.getFullYear()
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const month = date.getMonth()
    const today = date.getDate()
    const currentDate = `${today}-${month + 1}-${year}`

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
        }, {onlyOnce: false})
    }
    datesCollector()
    //----------------
    
    // DB content collector
    const [keys, setKeys] = useState([])
    const [contentDisplay, setContentDisplay] = useState([])

    const contentCollector = (date) => {
        const reference = ref(db, "Calendar/" + date)
        onValue(reference, (snapshot) => {
            const date = snapshot.key
            snapshot.forEach((childsnapshot) => {
                const key = childsnapshot.key
                const time = childsnapshot.val().time
                const timecode = Number(time[0] + time[1] + time[3] + time[4])
                if (keys.indexOf(key) == - 1){
                    setKeys(preKeys => [...preKeys, key])
                    setContentDisplay(prevDisplay => [...prevDisplay, {key: key, time: childsnapshot.val().time, timecode: timecode, title: childsnapshot.val().title, content: childsnapshot.val().content, date: date}])
                }
            })
        }, {onlyOnce: true})
        contentDisplay.sort((a, b) => (a.timecode > b.timecode) ? 1 : -1)
    }
    //---------------------

    // DB Content Setter
    const [time, setTime] = useState("")
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    const contentSetter = (date, time, content, title) => {
        const reference = ref(db, "Calendar/" + date)
        push(reference, {
            time: time,
            title: title,
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
        var todayStyle = notCurrentDayStyle
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
        
        if(date == currentDate){
            todayStyle = currentDayStyle
        }

        dates.map((item) => {
            if(item == date){
                contentCollector(date)
            }
        })

        return (
            <div style={todayStyle} className={style} onClick={() => {setPopupDate(date), setPopupState(true), contentCollector(date)}}>
                <div className="calendarDay">{day}</div>
                <div style={dotStyle}></div>
            </div>
        )
    }
    //---------------------

    return (props.trigger) ? (
        <div className="calendarpage">

            <table className="MonthSelector">
                <tr>
                    <td>
                        <button onClick={lastMonth}><div className="leftArrow"></div></button>
                    </td>

                    <td>
                        <div className="monthTitle">{months[selectedMonth]}</div>
                    </td>

                    <td>
                        <button onClick={nextMonth}><div className="rightArrow"></div></button>
                    </td>
                </tr>
            </table>
            
            <br></br>
            <br></br>
            <table className="Calendar">
                <tr>
                    <td className="DayIndicator">M</td>
                    <td className="DayIndicator">T</td>
                    <td className="DayIndicator">W</td>
                    <td className="DayIndicator">T</td>
                    <td className="DayIndicator">F</td>
                    <td className="DayIndicator">S</td>
                    <td className="DayIndicator">S</td>
                </tr>
                <tr>
                    <td className="monthDayCards">{renderMonth(1)}</td>
                    <td className="monthDayCards">{renderMonth(2)}</td>
                    <td className="monthDayCards">{renderMonth(3)}</td>
                    <td className="monthDayCards">{renderMonth(4)}</td>
                    <td className="monthDayCards">{renderMonth(5)}</td>
                    <td className="monthDayCards">{renderMonth(6)}</td>
                    <td className="monthDayCards">{renderMonth(7)}</td>
                </tr>
                <tr>
                    <td className="monthDayCards">{renderMonth(8)}</td>
                    <td className="monthDayCards">{renderMonth(9)}</td>
                    <td className="monthDayCards">{renderMonth(10)}</td>
                    <td className="monthDayCards">{renderMonth(11)}</td>
                    <td className="monthDayCards">{renderMonth(12)}</td>
                    <td className="monthDayCards">{renderMonth(13)}</td>
                    <td className="monthDayCards">{renderMonth(14)}</td>
                </tr>
                <tr>
                    <td className="monthDayCards">{renderMonth(15)}</td>
                    <td className="monthDayCards">{renderMonth(16)}</td>
                    <td className="monthDayCards">{renderMonth(17)}</td>
                    <td className="monthDayCards">{renderMonth(18)}</td>
                    <td className="monthDayCards">{renderMonth(19)}</td>
                    <td className="monthDayCards">{renderMonth(20)}</td>
                    <td className="monthDayCards">{renderMonth(21)}</td>
                </tr>
                <tr>
                    <td className="monthDayCards">{renderMonth(22)}</td>
                    <td className="monthDayCards">{renderMonth(23)}</td>
                    <td className="monthDayCards">{renderMonth(24)}</td>
                    <td className="monthDayCards">{renderMonth(25)}</td>
                    <td className="monthDayCards">{renderMonth(26)}</td>
                    <td className="monthDayCards">{renderMonth(27)}</td>
                    <td className="monthDayCards">{renderMonth(28)}</td>
                </tr>
                <tr>
                    <td className="monthDayCards">{renderMonth(29)}</td>
                    <td className="monthDayCards">{renderMonth(30)}</td>
                    <td className="monthDayCards">{renderMonth(31)}</td>
                    <td className="monthDayCards">{renderMonth(32)}</td>
                    <td className="monthDayCards">{renderMonth(33)}</td>
                    <td className="monthDayCards">{renderMonth(34)}</td>
                    <td className="monthDayCards">{renderMonth(35)}</td>
                </tr>
                <tr>
                    <td className="monthDayCards">{renderMonth(36)}</td>
                    <td className="monthDayCards">{renderMonth(37)}</td>
                    <td className="monthDayCards">{renderMonth(38)}</td>
                    <td className="monthDayCards">{renderMonth(39)}</td>
                    <td className="monthDayCards">{renderMonth(40)}</td>
                    <td className="monthDayCards">{renderMonth(41)}</td>
                    <td className="monthDayCards">{renderMonth(42)}</td>
                </tr>
            </table>
            <br></br>
            
            <CalPopup trigger={popupState} setTrigger={setPopupState}>
                <button className="PopupCloseBTN" onClick={() => {setPopupState(false), setContentDisplay([]), setKeys([]), setDates([]), datesCollector()}}>Close</button>
                <h2>{popupDate}</h2>

                
                <table className="PopupInputContainer">
                    <tr>
                        <div className="AddActivity">Add activity</div>
                    </tr>
                    <tr>
                        <input className="TimeInput" type="time" onChange={(e) => {setTime(e.target.value)}} />
                        <input className="ContentTitleINP" placeholder="Event Title" type="text" onChange={(e) => {setTitle(e.target.value)}}/>
                    </tr>
                    <tr>
                        <textarea className="DescriptionBox" placeholder="Type your activity here" onChange={(e) => {setContent(e.target.value)}}/>
                    </tr>
                    <tr>
                        <button className="ContentSubmitBTN" onClick={() => { 
                            contentSetter(popupDate, time, content, title)
                        }}>Submit plan</button>
                    </tr>
                </table>
                <div className="PopupContentDisplay">
                    {contentDisplay.map((item) => {
                        if(item.date == popupDate){
                            return (
                                <div className="ContentContainer">
                                    
                                    <div className="PopupContentDisplayTime">{item.time}</div>
                                    <div className="ContentDisplayTitle">{item.title}</div>
                                    <button className="ContentDisplayDeleteBTN" onClick={() => {contentDelete(item.key)}}>X</button>
                                    <div className="ContentDisplayDescription">{item.content}</div>
                                </div>
                            )
                        }
                    })}
                </div>
            </CalPopup>
        </div>
    ) : ""
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

const notCurrentDayStyle = {
    
}

const currentDayStyle = {
    background: "#4195FF"
}
