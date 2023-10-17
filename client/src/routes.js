import Login from './Components/Login';
import Home from './Components/Home';
import Signup from './Components/Signup';
import AddBuilding from './Components/AddBuilding';
import Profilepage from './Components/Profilepage';

export const routes = [
    {path:"/", element: <Home/>},
    {path:"/login", element: <Login/>},
    {path:"/signup", element: <Signup/>},
    {path:"/addbuildings", element: <AddBuilding/>},
    {path:"/profile", element: <Profilepage/>}
]