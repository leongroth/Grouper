import { useState } from "react";
import './CalendarWeekView.css'

export function CalendarWeek(props) {
    const date = new Date()
    const year = date.getFullYear()
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const month = date.getMonth()
    const today = date.getDate()
    const currentDate = `${today}-${month + 1}-${year}`

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    const [selectedYear, setSelectedYear] = useState(year)
    const [selectedMonth, setSelectedMonth] = useState(month)

    const daysInMonth = (year, month) => new Date(year, month, 0).getDate()
    const daysInMonthBefore = daysInMonth(selectedYear, selectedMonth)

    var firstDay = (new Date(year, selectedMonth, 1)).getDay()
        if (firstDay == 0) {
            firstDay = 7
        }

    const weekday = (new Date(year, selectedMonth, today)).getDay()

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
                        <button><div className="leftArrow"></div></button>
                    </td>

                    <td>
                        <div className="monthTitle">Week 8</div>
                    </td>

                    <td>
                        <button><div className="rightArrow"></div></button>
                    </td>
                </tr>
            </table>

            <br></br>
            <br></br>
            
            <table className="CalendarWeekBox">
                <tr>
                    <td>
                        
                    </td>
                    <td>
                        <div className="DayBox">
                            <h3>Tuesday</h3>
                            <div>{renderDate(2)}</div>
                        </div>
                    </td>
                    <td>
                        <div className="DayBox">
                            <h3>Wednesday</h3>
                            <div>{renderDate(3)}</div>
                        </div>
                    </td>
                    <td>
                        <div className="DayBox">
                            <h3>Thursday</h3>
                            <div>{renderDate(4)}</div>
                        </div>
                    </td>
                    <td>
                        <div className="DayBox">
                            <h3>Friday</h3>
                            <div>{renderDate(5)}</div>
                        </div>
                    </td>
                    <td>
                        <div className="DayBox">
                            <h3>Satturdat</h3>
                            <div>{renderDate(6)}</div>
                        </div>
                    </td>
                    <td>
                        <div className="DayBox">
                            <h3>Sunday</h3>
                            <div>{renderDate(7)}</div>
                        </div>
                    </td>
                </tr>
                
            </table>
        </div>
    ) : ""
}