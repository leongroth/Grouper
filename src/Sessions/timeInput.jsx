import { useState, useEffect } from "react";
import Spinner from "./spinner"; // the spinner component
import './Timeinput.css';
import {db} from '../config/firebase'
import { push, ref } from "firebase/database";

const TimeInput = () => {
  const [value, setValue] = useState("00:00:00");
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [sessionCompleted, setSessionsCompleted] = useState(false);
  const [showBreakWheel, setShowBreakWheel] = useState(false); // triggers when to show breakwheel
  const [isActive, setIsActive] = useState(true);
  const [isToggled, setIsToggled] = useState(false);

  // Add points To DB
  const date = new Date()
  const currentMonth = date.getMonth() +1 
  const currentDay = `${date.getDate()}-${currentMonth}-${date.getFullYear()}`

  const addPoints = () => {
    const reference = ref(db, "/Points")
    push(reference, {
      month: currentMonth,
      day: currentDay,
      points: 100
    })
  }
  //-----------------

  const onChange = (event) => { // updates the value state after user input
    setValue(event.target.value);
  };

  const onBlur = (event) => { // input value is into secs - updates the secondsRemaining state
    const value = event.target.value;
    const seconds = Math.max(0, getSecondsFromHHMMSS(value));
    setSecondsRemaining(seconds);
    setValue(toHHMMSS(seconds));
  };

  const toggleCountdown = () => { // switches between start and stop
    if (!countdownStarted) {
      setCountdownStarted(true);
      setShowTimer(true);
      setIsActive(true);
    } else {
      setIsActive((prevIsActive) => !prevIsActive);
    }
  };

  useEffect(() => {
    let interval;
    if (countdownStarted && isActive) {
      interval = setInterval(() => {
        setSecondsRemaining((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            clearInterval(interval);
            setCountdownStarted(false);
            setSessionsCompleted(true);
            addPoints()
            return 0;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [countdownStarted, isActive]);

  const getSecondsFromHHMMSS = (value) => {
    const [str1, str2, str3] = value.split(":");
    const val1 = Number(str1);
    const val2 = Number(str2);
    const val3 = Number(str3);

    if (!isNaN(val1) && isNaN(val2) && isNaN(val3)) {
      return val1;
    }

    if (!isNaN(val1) && !isNaN(val2) && isNaN(val3)) {
      return val1 * 60 + val2;
    }

    if (!isNaN(val1) && !isNaN(val2) && !isNaN(val3)) {
      return val1 * 60 * 60 + val2 * 60 + val3;
    }

    return 0;
  };

  const toHHMMSS = (secs) => {
    const secNum = parseInt(secs.toString(), 10);
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor(secNum / 60) % 60;
    const seconds = secNum % 60;

    return [hours, minutes, seconds]
      .map((val) => (val < 10 ? `0${val}` : val))
      .filter((val, index) => val !== "00" || index > 0)
      .join(":")
      .replace(/^0/, "");
  };

  useEffect(() => {
    if (countdownStarted && secondsRemaining > 0) {
      const totalSeconds = getSecondsFromHHMMSS(value);
      const minutesPassed = (totalSeconds - secondsRemaining) / 60;
      if (minutesPassed % 0.25 === 0 && minutesPassed !== 0) { // checks if 25 minutes passed
        setShowBreakWheel(true);
        setIsToggled(true);
        setIsActive(false); // Pause the countdown
      }
    }
  }, [countdownStarted, secondsRemaining, value]);

  return (
    <div>
      <h1 className="overskrift">Sessions</h1>
      <p className="suboverskrift"> Start a study session to get the whole team focused</p>
      <h5 className="HrMinSecIndication">Hr : Min : Secs</h5>
      {!sessionCompleted && (
        <input className="inputSessions" type="text" onChange={onChange} onBlur={onBlur} value={value} />
      )}
      <div>
        {showTimer && (
          <div className="Timer">
            <span>{toHHMMSS(secondsRemaining)}</span>
          </div>
        )}

        { !isToggled && (
        <button onClick={toggleCountdown} className="buttonSessions">
        {countdownStarted ? (!isActive ? 'Resume' : 'pause') : 'Start Session'}
      </button>
        )}

        { isToggled && (
          <button className="buttonStopBreak" onClick={() => [setIsToggled(false), toggleCountdown()]}> Breaks over </button>
        )}

        {isToggled && <Spinner />}


        {sessionCompleted && <div className="SessionsCompleted">Session completed <br /> 100 points </div>}
      </div>
    </div>
  );
};

export default TimeInput;