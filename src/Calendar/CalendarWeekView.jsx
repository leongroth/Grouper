import { useState } from "react";
import './CalendarWeekView.css'
import { db } from "../config/firebase";
import { onValue, ref, push, remove } from "firebase/database";
import { CalPopup } from "./CalendarPopup";

export function CalendarWeek(props) {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const today = date.getDate()
    const currentDate = `${today}-${month}-${year}`

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    const [selectedYear, setSelectedYear] = useState(year)
    const [selectedMonth, setSelectedMonth] = useState(month)

    const daysInMonth = (year, month) => new Date(year, month, 0).getDate()

    var firstDay = (new Date(year, selectedMonth, 1)).getDay()
        if (firstDay == 0) {
            firstDay = 7
        }

    const weekday = (new Date(year, month - 1, today)).getDay()
    const [firstDayOfWeekSelected, setFirstDayOfWeekSelected] = useState(today - weekday +1)


    const [popupState, setPopupState] = useState(false)
    const [popupDate, setPopupDate] = useState("")


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
            const date = snapshot.key
            snapshot.forEach((childsnapshot) => {
                const key = childsnapshot.key
                if (keys.indexOf(key) == - 1){
                    setKeys(preKeys => [...preKeys, key])
                    setContentDisplay(prevDisplay => [...prevDisplay, {key: key, time: childsnapshot.val().time, title: childsnapshot.val().title, content: childsnapshot.val().content, date: date}])
                }
            })
        }, {onlyOnce: true})
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
    contentCollector(popupDate)
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











    const lastWeek = () => {
        if(firstDayOfWeekSelected - 7 < 0){
            var newMonth = selectedMonth - 1

            if(newMonth < 1){
                newMonth = 12
                setSelectedYear(selectedYear - 1)
            }

            setSelectedMonth(newMonth)
            setFirstDayOfWeekSelected((daysInMonth(selectedYear, newMonth)) + (firstDayOfWeekSelected - 7))
        }
        else {
            setFirstDayOfWeekSelected(firstDayOfWeekSelected - 7)
        }
    }

    const nextWeek = () => {
        
        if(firstDayOfWeekSelected + 7 > daysInMonth(selectedYear, selectedMonth)){
            var newMonth = selectedMonth + 1

            if(newMonth > 12){
                newMonth = 1
                setSelectedYear(selectedYear + 1)
            }

            setSelectedMonth(newMonth)
            setFirstDayOfWeekSelected((firstDayOfWeekSelected + 7) - (daysInMonth(year, newMonth -1)))
        }
        else {
            setFirstDayOfWeekSelected(firstDayOfWeekSelected +7)
        }
    }

    const renderDate = (id) => {
    
        
        var day = firstDayOfWeekSelected + id - 1
        var month = selectedMonth 
        var year = selectedYear


        if (day > daysInMonth(selectedYear, selectedMonth)){
            day = day - daysInMonth(selectedYear, selectedMonth)
            month = selectedMonth + 1
            if (month > 12){
                month = 1
                year = selectedYear + 1
            }
        }

        const cardDateDisplay = `${day}/${month}/${year}`
        const cardDate = `${day}-${month}-${year}`


        return (
            <div className="DayBox" onClick={() => {setPopupDate(cardDate), setPopupState(true)}}>
                <h3>{cardDateDisplay}</h3>
                <div>
                    {contentDisplay.map((item) => {
                        return (
                            <div>
                                
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }


    return (props.trigger) ? (
        <div className="calendarWeekPage">

            <table className="MonthSelector">
                <tr>
                    <td>
                        <button onClick={lastWeek}><div className="leftArrow"></div></button>
                    </td>

                    <td>
                        <div className="monthTitle">Week 8</div>
                    </td>

                    <td>
                        <button onClick={nextWeek}><div className="rightArrow"></div></button>
                    </td>
                </tr>
            </table>

            <br></br>
            <br></br>
            
            <table className="CalendarWeekBox">
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
                    <td>
                        {renderDate(1)}
                    </td>
                    <td>
                        {renderDate(2)}
                    </td>
                    <td>
                        {renderDate(3)}
                    </td>
                    <td>
                        {renderDate(4)}
                    </td>
                    <td>
                        {renderDate(5)}
                    </td>
                    <td>
                        {renderDate(6)}
                    </td>
                    <td>
                        {renderDate(7)}
                    </td>
                </tr>
                
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
                        return (
                            <div className="ContentContainer">
                                
                                <div className="PopupContentDisplayTime">{item.time}</div>
                                <div className="ContentDisplayTitle">{item.title}</div>
                                <button className="ContentDisplayDeleteBTN" onClick={() => {contentDelete(item.key)}}>X</button>
                                <div className="ContentDisplayDescription">{item.content}</div>
                            </div>
                        )
                    })}
                </div>
            </CalPopup>

            </table>
        </div>
    ) : ""
}

const todayStyle = {
    background: "#38caff"
}

const notTodayStyle = {

}


const testStyle = {
    fontSize: "100px",
}