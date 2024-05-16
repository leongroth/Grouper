import { useState } from "react";
import './CalendarWeekView.css'

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
    const [daysInWeekSelected, setDaysInWeekSelected] = useState([])

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
    
        

        return (
            <div className="DayBox">
                <h3>{daysOfWeek[id -1]}</h3>
                <div>test</div>
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
                
            </table>
            
            <div style={testStyle}> {firstDayOfWeekSelected} - {selectedMonth} - {selectedYear} </div>
            <div style={testStyle}>{today}</div>
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