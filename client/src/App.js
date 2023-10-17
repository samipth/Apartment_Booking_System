import './App.css';
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from,} from "@apollo/client";    
import {onError} from '@apollo/client/link/error'
import Login from './Components/Login';
import Home from './Components/Home';
import NavBar from './Components/NavBar';
import AddBuilding from './Components/AddBuilding';
import {routes} from './routes';
import { useRoutes } from 'react-router-dom';
import Signup_second from './Components/Signup_second';

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
