import {db} from '../config/firebase'

function Calendar() {
    const today = new Date()
    const month = today.getMonth() +1
    const year = today.getFullYear()
    const date = today.getDate()
    

    return <div>{day} {month} {year}</div>
}