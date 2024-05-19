import { useState } from "react";
import './CalendarContainerPage.css'
import { Calendar } from "./Calendar";
import { CalendarWeek } from "./CalendarWeekView";

export function CalendarContainerPage() {
    const [isMonthView, setIsMonthView] = useState(false)
    const [isWeekView, setIsWeekView] = useState(true)

    const [toggleStyle, setToggleStyle] = useState(leftToggled)


/*     <button onClick={() => {setIsMonthView(true)}}>View Calendar</button>
    <button onClick={() => {setIsMonthView(false)}}>Close Calendar</button> */


    const toggleLeft = () => {
        setToggleStyle(leftToggled)
        setIsMonthView(false)
        setIsWeekView(true)
    }
    const toggleRight = () => {
        setToggleStyle(rightToggled)
        setIsMonthView(true)
        setIsWeekView(false)
    }

    return (
        <div>
            <div className="TopContainer">
                <h1 className="CalendarTitle">Calendar</h1>
                <p className="CalendarSubtitle">Manage your tasks and sessions</p>


                <div className="form-box">
                    <div className="button-box">
                        <div className="btn" style={toggleStyle}></div>
                        <button type="button" className="toggle-btn" onClick={toggleLeft} >Week</button>
                        <button type="button" className="toggle-btn" onClick={toggleRight} >Month</button>
                    </div>
                </div>
                <Calendar trigger={isMonthView}/>
                <CalendarWeek trigger={isWeekView}/>
            </div>

        </div>
    )
}

const leftToggled = {
    left: '6px'
}

const rightToggled = {
    left: '136px'
}