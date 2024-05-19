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
          <button onClick={logout}>Sign out</button>
          </td>
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
        
        <tr>
          <td className='contenttest'>
            <button>
              <a href="/Session">Session</a>
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


export default App
