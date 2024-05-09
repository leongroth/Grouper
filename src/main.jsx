import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Func from './Team Wall/TeamWall.jsx'
import Tekstskriver from './Team Wall/TeamWall.jsx'
import { Calendar } from './Calendar/Calendar.jsx'
import Login from './LoginPage/pages/Login.jsx'
import Signup from './LoginPage/pages/Signup.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import ReactDom from 'react-dom/client';
import Home from './LoginPage/pages/Home.jsx'
import { router } from './router.jsx'

 
ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='mainpage'>
    <RouterProvider router={router}/>
  </div>
);

