import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from './LoginPage/pages/Login.jsx'
import Signup from './LoginPage/pages/Signup.jsx'
import Home from "./LoginPage/pages/Home.jsx";
import Tekstskriver from "./Team Wall/TeamWall.jsx";
import { Calendar } from "./Calendar/Calendar.jsx";

export const router= createBrowserRouter (
    [
        {
            path:"/",
            element: <App/>,
            children:[
                {path: "", element:<Home/>},
                {path:"/login", element:<Login/>},
                {path:"/signup", element:<Signup/>},
                {path:"/teamwall", element:<Tekstskriver/>},
                {path:"/Calendar", element:<Calendar />}
            ]
        }
    ]
)