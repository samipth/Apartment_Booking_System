import Login from './Components/Login';
import Home from './Components/Home';
import Signup from './Components/Signup';
import AddApartment from './Components/AddApartment';
import Profilepage from './Components/Profilepage';
import ListedApartment from './Components/ListedApartment';
import AddBooking from './Components/AddBooking';
import ApartmentDetails from './Components/ApartmentDetails';

export const routes = [
    {path:"/", element: <Home/>},
    {path:"/login", element: <Login/>},
    {path:"/signup", element: <Signup/>},
    {path:"/addapartments", element: <AddApartment/>},
    {path:"/profile", element: <Profilepage/>},
    {path:"/listed", element: <ListedApartment/>},
    {path:"/booking", element: <AddBooking/>},
    {path:"/apartment", element: <ApartmentDetails/>}
]