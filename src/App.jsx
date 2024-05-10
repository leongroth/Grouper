import './App.css'
import { Outlet } from 'react-router'


function App() {
  return (
    <>
      <div>
      <table>
        <th style={navbarStyle}>
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
  background: "#C7C7C7"
}

export default App
