import './App.css'
import { Outlet, useNavigate } from 'react-router'
import { auth } from './config/firebase'
import { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import CalendarIcon from "./assets/calender-icon.svg"
import TeamWallIcon from "./assets/teamwall-icon.svg"
import PBLIcon from "./assets/PBL-icon.svg"
import PointsIcon from "./assets/Points-icon.svg"
import SessionsIcon from "./assets/Sessions-icon.svg"




function App() {

  const navigate = useNavigate()

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/login")
    } catch (err) {
      console.error(err);
    }
  };

  const [logUser, setLogUser] = useState("")

  useEffect(() => {
    const isLogged = auth.onAuthStateChanged(user => {
      if (user) {
        setLogUser(auth.currentUser.email)
      } else {
        setLogUser("")
      }
    });

    return () => isLogged(); 
  }, [])


  return (
    <>
      <div className='NavbarContainer'>
        <div >{logUser}</div>
      <table className='loginRegisterTable'>
        <tr>
          <td className='contenttest'>
            <button>
              <a href={'/login'}>Login</a>
            </button>
          </td>
          <td className='contenttest'>
            <button>
                <a href={'/signup'}>Register</a>
            </button>
          </td >
          <td className='contenttest'>
          <button onClick={logout}>Signout</button>
          </td>
        </tr>
      </table>

      <br/>
      <br/>
      <br/>

      <table className='NavBarTable'> 
        <tr>
          <td className='contenttest'>
              <button className='NavCalendarButton'>
                <a href="/Calendar">
                  <img src={CalendarIcon} />
                </a>
              </button>
              <h2 className='CalendarHoverText'>Calendar</h2>
          </td>
        </tr>
        
        <tr>
          <td className='contenttest'>
            <button className='NavTeamwallButton'>
              <a href="/Teamwall">
                <img src={TeamWallIcon} />
              </a>
            </button>
            <h2 className='TeamwallHoverText'>Team wall</h2>
          </td>
        </tr>

        <tr>
          <td className='contenttest'>
            <button className='NavPBLButton'>
              <a href='/PBL'>
                <img src={PBLIcon} />
              </a>
            </button>
            <h2 className='PBLHoverText'>PBL</h2>
          </td>
        </tr>

        <tr>
          <td className='contenttest'>
            <button className='NavPointsButton'>
              <a href='/Points'>
                <img src={PointsIcon}/>
              </a>
            </button>
            <h2 className='PointsHoverText'>Points</h2>
          </td>
        </tr>
        
        <tr>
          <td className='contenttest'>
            <button className='NavSessionButton'>
              <a href="/Session">
                <img src={SessionsIcon} />
              </a>
            </button>
            <h2 className='SessionHoverText'>Session</h2>
          </td>
        </tr>
      </table>
        
      </div>
      <div className="PageContainer">
        <Outlet/>
      </div>
    </>
  )
}


export default App
