import './App.css'
import { Outlet } from 'react-router'
import { auth } from './config/firebase'
import { useEffect, useState } from 'react'



function App() {


  const [logUser, setLogUser] = useState("")
  const [style, setStyle] = useState(testStyle1)

  useEffect(() => {
    const isLogged = auth.onAuthStateChanged(user => {
      if (user) {
        setStyle(testStyle);
        setLogUser(auth.currentUser.email)
      } else {
        setStyle(testStyle1);
        setLogUser("")
      }
    });

    return () => isLogged(); 
  }, [])


  return (
    <>
      <div>
        <div style={style}></div>
      <table>
        <th style={navbarStyle}>
          <tr>
            <a>{logUser}</a>
          </tr>
          <tr>
            <button>
                <a href={'/login'}>login</a>
            </button>
          </tr>
          <tr>
            <button>
                <a href={'/signup'}>register</a>
            </button>
          </tr>
          <tr>
            <button>
                <a href="/Calendar">Calendar</a>
            </button>
          </tr>
          <tr>
            <button>
                <a href="/Teamwall">Teamwall</a>
            </button>
          </tr>
          <tr>
            <button>
              <a href='/PBL'>PBL</a>
            </button>
          </tr>
          <tr>
            <button>
              <a href='/Points'>Points</a>
            </button>
          </tr>
        </th>
        <th>
          <Outlet/>
        </th>
      </table>

        
        
      </div>
    </>
  )
}

const navbarStyle = {
  width: "200px",
  background: "#C7C7C7",
  marginLeft:"1000px",

}
const testStyle = {
  width:"20px",
  height:"20px",
  borderRadius:"20px",
  background:"green"

}
const testStyle1 = {
  width:"20px",
  height:"20px",
  borderRadius:"20px",
  background:"black"

}

export default App
