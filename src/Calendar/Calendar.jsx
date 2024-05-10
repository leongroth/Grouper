import { useState } from "react"

export function Calendar() {
    
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
        const data = []
        var date = `${day}/${selectedMonth + 1}/${selectedYear}`
        
        if (id < firstDay) {
            day = daysInMonthBefore - (firstDay - (id + 1))
            date = `${day}/${selectedMonth}/${selectedYear}`
        }
        if (id >= firstDay && id <= (firstDay + daysInMonth(selectedYear, selectedMonth + 1) - 1)) {
            day = (id - firstDay) + 1
            style = activeDayStyle
            date = `${day}/${selectedMonth + 1}/${selectedYear}`
        }
        if (id > (firstDay + daysInMonth(selectedYear, selectedMonth + 1) - 1)) {
            day = id - (daysInMonth(selectedYear, selectedMonth + 1) + firstDay)
            date = `${day}/${selectedMonth + 2}/${selectedYear}`
        }

        return (
            <div style={style}>
                <div style={textStyle}>{day}</div>
                <div>{date}</div>
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
