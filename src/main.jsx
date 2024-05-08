import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Func from './Team Wall/TeamWall.jsx'
import Tekstskriver from './Team Wall/TeamWall.jsx'
import { Calendar } from './Calendar/Calendar.jsx'
import Login from './LoginPage/pages/Login.jsx'
import Signup from './LoginPage/pages/Signup.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Signup/>
  </React.StrictMode>
)
