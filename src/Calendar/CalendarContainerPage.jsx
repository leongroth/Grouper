import { useState } from "react";
import './CalendarContainerPage.css'
import { Calendar } from "./Calendar";

export function CalendarContainerPage() {
    const [isMonthView, setIsMonthView] = useState(false)


    return (
        <div>
            <div className="TopContainer">
                <h1>Calendar</h1>
                <p>Manage your tasks and sessions</p>
                <button onClick={() => {setIsMonthView(true)}}>View Calendar</button>
                <button onClick={() => {setIsMonthView(false)}}>Close Calendar</button>
            </div>

            <div className="CalendarViewContainer">
                <Calendar trigger={isMonthView}/>
            </div>
        </div>
    )
}