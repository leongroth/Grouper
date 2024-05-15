import './App.css'
import { Outlet, useNavigate } from 'react-router'
import { auth } from './config/firebase'
import { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'



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
      <div className='NavbarContainer'>
        <div style={style}></div>
      <table className='loginRegisterTable'>
        <tr>
          <td className='contenttest'>
            <button>
              <a href={'/login'}>login</a>
            </button>
          </td>
          <td className='contenttest'>
            <button>
                <a href={'/signup'}>register</a>
            </button>
          </td>
          <button onClick={logout}>Sign out</button>
        </tr>
      </table>

      <br/>
      <br/>
      <br/>

      <table className='NavBarTable'> 
        <tr>
          <td className='contenttest'>
            <button>
              <a href="/Calendar">Calendar</a>
            </button>
          </td>
        </tr>
        
        <tr>
          <td className='contenttest'>
            <button>
              <a href="/Teamwall">Teamwall</a>
            </button>
          </td>
        </tr>

        <tr>
          <td className='contenttest'>
            <button>
              <a href='/PBL'>PBL</a>
            </button>
          </td>
        </tr>

        <tr>
          <td className='contenttest'>
            <button>
              <a href='/Points'>Points</a>
            </button>
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
