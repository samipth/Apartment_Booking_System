import { useMutation, useQuery } from '@apollo/client';
import {React, useEffect} from 'react'
import { LOGIN_USER } from '../Graphql/Mutations';
import { GET_PROFILE } from '../Graphql/Queries';
import {useNavigate} from 'react-router-dom';

function Profilepage() {
    const navigate = useNavigate();

    useEffect(() => {
      // Check if the user is coming from the login page
      const fromLoginPage = localStorage.getItem('fromLoginPage') === 'true';
  
      if (fromLoginPage) {
        // Clear the flag
        localStorage.removeItem('fromLoginPage');
  
        // Refresh the page
        window.location.reload();
      }
    }, []);

    const email = localStorage.getItem("email")
    const {loading, error, data} = useQuery(GET_PROFILE, {
        variables : {user_email: email }
    })

    if(error){
        console.log(error)
    }

    
    return (
    <div className = 'container my-container'>
        <div className='center-align' style={{marginTop: "10px"}}>
            <img className="circle" style={{border: "2px solid", marginTop: "10px"}}   src={`https://robohash.org/${data?.user_profile?.user_name}.png?size=200x200`} alt='pic' />
            <h5>{data?.user_profile?.user_name}</h5>
            <h6>Email: {data?.user_profile?.user_email}</h6>
            <h6> Role: {data?.user_profile?.role}</h6>
        </div>
        <blockquote>
            <h6>Hello!!!, this is my profile.</h6>
        </blockquote>
        
    </div> 
  )
}

export default Profilepage;
