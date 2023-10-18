import './App.css';
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from,} from "@apollo/client";    
import {onError} from '@apollo/client/link/error'
import Login from './Components/Login';
import Home from './Components/Home';
import NavBar from './Components/NavBar';
import AddBuilding from './Components/AddApartment';
import {routes} from './routes';
import { useRoutes } from 'react-router-dom';
import Signup_second from './Components/Signup_second';
import ListedApartment from './Components/ListedApartment';

function App() {
  const element = useRoutes(routes)
  return (
    <div>  
      <NavBar/>
      {element}
      {/* <Signup_second/> */}
    </div>
  );
}

export default App;
