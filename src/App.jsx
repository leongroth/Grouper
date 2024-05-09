import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Func from './Team Wall/TeamWall'
import { Outlet } from 'react-router'


function App() {

  return (
    <>
      <div>
        <Outlet/>
      </div>
    </>
  )
}

export default App
