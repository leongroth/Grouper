import { useState } from "react"
import {db} from '../config/firebase'
import { onValue, ref, set, push} from "firebase/database"
import { CalPopup } from "./CalendarPopup"

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
    const [contentDisplay, setContentDisplay] = useState([])

    const contentCollector = (date) => {
        const reference = ref(db, "Calendar/" + date)
        onValue(reference, (snapshot) => {
            snapshot.forEach((childsnapshot) => {
                const content = `${childsnapshot.val().time} : ${childsnapshot.val().content}`
                if (contentDisplay.indexOf(content) == -1){
                    setContentDisplay(prevDisplay => [...prevDisplay, content])
                }
            })
        })
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
        var style = inactiveDayStyle
        var dotStyle = inactivityStyle 
        const data = []
        var date = `${day}-${selectedMonth + 1}-${selectedYear}`
        
        if (id < firstDay) {
            day = daysInMonthBefore - (firstDay - (id + 1))
            date = `${day}-${selectedMonth}-${selectedYear}`
        }
        if (id >= firstDay && id <= (firstDay + daysInMonth(selectedYear, selectedMonth + 1) - 1)) {
            day = (id - firstDay) + 1
            style = activeDayStyle
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
            <div style={style} onClick={() => {setPopupDate(date), setPopupState(true), contentCollector(date)}}>
                <div style={textStyle}>{day}</div>
                <div style={dotStyle}></div>
            </div>
        )
    }
    //---------------------

    return (
        <div className="calendarpage">
            <button onClick={lastMonth}>Last Month</button>
            <button onClick={nextMonth}>Next Month</button>
            <br></br>
            <div>{months[selectedMonth]}</div>
            <br></br>
            <br></br>
            <table>
                <tr>
                    <th>{renderMonth(1)}</th>
                    <th>{renderMonth(2)}</th>
                    <th>{renderMonth(3)}</th>
                    <th>{renderMonth(4)}</th>
                    <th>{renderMonth(5)}</th>
                    <th>{renderMonth(6)}</th>
                    <th>{renderMonth(7)}</th>
                </tr>
                <tr>
                    <th>{renderMonth(8)}</th>
                    <th>{renderMonth(9)}</th>
                    <th>{renderMonth(10)}</th>
                    <th>{renderMonth(11)}</th>
                    <th>{renderMonth(12)}</th>
                    <th>{renderMonth(13)}</th>
                    <th>{renderMonth(14)}</th>
                </tr>
                <tr>
                    <th>{renderMonth(15)}</th>
                    <th>{renderMonth(16)}</th>
                    <th>{renderMonth(17)}</th>
                    <th>{renderMonth(18)}</th>
                    <th>{renderMonth(19)}</th>
                    <th>{renderMonth(20)}</th>
                    <th>{renderMonth(21)}</th>
                </tr>
                <tr>
                    <th>{renderMonth(22)}</th>
                    <th>{renderMonth(23)}</th>
                    <th>{renderMonth(24)}</th>
                    <th>{renderMonth(25)}</th>
                    <th>{renderMonth(26)}</th>
                    <th>{renderMonth(27)}</th>
                    <th>{renderMonth(28)}</th>
                </tr>
                <tr>
                    <th>{renderMonth(29)}</th>
                    <th>{renderMonth(30)}</th>
                    <th>{renderMonth(31)}</th>
                    <th>{renderMonth(32)}</th>
                    <th>{renderMonth(33)}</th>
                    <th>{renderMonth(34)}</th>
                    <th>{renderMonth(35)}</th>
                </tr>
                <tr>
                    <th>{renderMonth(36)}</th>
                    <th>{renderMonth(37)}</th>
                    <th>{renderMonth(38)}</th>
                    <th>{renderMonth(39)}</th>
                    <th>{renderMonth(40)}</th>
                    <th>{renderMonth(41)}</th>
                    <th>{renderMonth(42)}</th>
                </tr>
            </table>
            <br></br>
            
            <CalPopup trigger={popupState} setTrigger={setPopupState}>
                <button style={closeStyle} onClick={() => {setPopupState(false), setContentDisplay([])}}>Close</button>
                <h2>{popupDate}</h2>
                <div>
                    <input type="time" onChange={(e) => {setTime(e.target.value)}}/>
                    <textarea placeholder="Type your activity here" onChange={(e) => {setContent(e.target.value)}}/>
                    <button onClick={() => {setContentDisplay([]), 
                        contentSetter(popupDate, time, content)
                    }}>Submit plan</button>
                </div>
                <div>
                    {contentDisplay.map((item) => {
                        return <div>{item}</div>
                    })}
                </div>
            </CalPopup>
        </div>
    )
}

const inactiveDayStyle = {
    width: "200px",
    height: "100px",
    background: "#e7e7e7",
    borderRadius: "10px"
}

const activeDayStyle = {
    width: "200px",
    height: "100px",
    background: "#c2efff",
    borderRadius: "10px"
}

const textStyle = {
    color: "black",
    fontWeight: "bold"
}

const monthtextStyle = {
    fontSize: 80
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


const closeStyle = {
    background: "red"
}