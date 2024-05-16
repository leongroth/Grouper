import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from './LoginPage/pages/Login.jsx'
import Signup from './LoginPage/pages/Signup.jsx'
import Home from "./LoginPage/pages/Home.jsx";
import Tekstskriver from "./Team Wall/TeamWall.jsx";
import { Calendar } from "./Calendar/Calendar.jsx";
import { CalendarContainerPage } from "./Calendar/CalendarContainerPage.jsx";
import PBL from "./PBL/PBL.jsx";
import { PointsPage } from "./Points/Points.jsx";

export const router= createBrowserRouter (
    [
        {
            path:"/",
            element: <App/>,
            children:[
                {path: "/home", element:<Home/>},
                {path:"/login", element:<Login/>},
                {path:"/signup", element:<Signup/>},
                {path:"/teamwall", element:<Tekstskriver/>},
                {path:"/Calendar", element:<CalendarContainerPage />},
                {path:"/PBL", element:<PBL/>},
                {path:"/Points", element:<PointsPage/>},
            ]
        }
    ]
)