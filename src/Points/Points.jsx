import { useState } from "react";
import { onValue } from "firebase/database";
import "./Points.css"

export function PointsPage() {
    const [totalPoints, setTotalPoints] = useState(0)
    const [sessionsMonth, setSessionsMonth] = useState(0)

    return (
        <div>
            <table>
                <th>
                    <div className="TP-Box">
                    Total Points
                    <br></br>
                    {totalPoints}
                    </div>
                </th>
                <th>
                    <div className="M-Sesh">
                    Sessions this month
                    <br/>
                    {sessionsMonth}
                    </div>
                </th>
            </table>
            
            
        </div>
    )

}