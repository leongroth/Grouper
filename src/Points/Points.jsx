import { useState } from "react";
import { onValue } from "firebase/database";

export function PointsPage() {
    const [totalPoints, setTotalPoints] = useState(0)

    return (
        <div>
            <div>
                Total Points
                <br></br>
                {totalPoints}
            </div>
        </div>
    )

}