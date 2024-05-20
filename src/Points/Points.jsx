import { useState } from "react";
import { onValue } from "firebase/database";
import "./Points.css"

export function PointsPage() {
    const [totalPoints, setTotalPoints] = useState(0)
    const [sessionsMonth, setSessionsMonth] = useState(0)
    const [sessionsDay, setSessionsDay] = useState(0)

    return (
        <div>
            <h1>Points</h1>
            <p>Earn Points by completing study sessions</p>
            <table className="PointCardsTable" >
                <th className="PointsTableItem">
                    <div className="TP-Header">Total Points</div>
                    <div className="TP-Box">
                        <div>{totalPoints}</div>
                    </div>
                </th>

                <th className="PointsTableItem">
                    <div className="M-Header">Sessions this month</div>
                    <div className="M-Sesh">
                        <div>{sessionsMonth}</div>
                    </div>
                </th>

                <th className="PointsTableItem">
                    <div className="D-Header">Sessions today</div>
                    <div className="D-Sesh">
                        <div>{sessionsDay}</div>
                    </div>
                </th>
            </table>
        </div>
    )

}