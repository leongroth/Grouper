import { useState } from "react";
import { get, onValue, ref } from "firebase/database";
import {db} from '../config/firebase'
import "./Points.css"

export function PointsPage() {
    const [totalPoints, setTotalPoints] = useState(0)
    const [sessionsMonth, setSessionsMonth] = useState(0)
    const [sessionsDay, setSessionsDay] = useState(0)
    const [keys, setKeys] = useState([])

    const date = new Date()
    const currentDate = `${date.getDate()}-${date.getMonth() +1}-${date.getFullYear()}`
    const currentMonth = date.getMonth() + 1

    const getPoints = () => {
        const reference = ref(db, "Points/")
        onValue(reference, (snapshot) => {
            snapshot.forEach((childsnapshot) => {
                const key = childsnapshot.key
                const points = childsnapshot.val().points
                const date = childsnapshot.val().day
                const month = childsnapshot.val().month
                if(keys.indexOf(key) == -1){
                    setKeys(prevKey => [...prevKey, key])
                    setTotalPoints(totalPoints => totalPoints + points)
                    if(month == currentMonth){
                        setSessionsMonth(sessionsMonth => sessionsMonth + 1)
                    }
                    if(date == currentDate){
                        setSessionsDay(sessionsDay => sessionsDay + 1)
                    }
                }
            })
        })
    }
    getPoints()

    return (
        <div>
            <h1 className="overskrift">Points</h1>
            <p className="suboverskrift">Earn Points by completing study sessions</p>
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