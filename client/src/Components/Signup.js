import { useMutation } from '@apollo/client';
import React, {useState} from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { SIGNUP_USER } from '../Graphql/Mutations';

function Signup() {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate()
    const [signupUser, {data, loading, error}] =  useMutation(SIGNUP_USER)

    if (loading) return <h1>Loading</h1>
    //   const [email, setEmail] = useState("");
    //   const [password, setPassword] = useState("");
    
    
      const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        })
      } 
    
      const handleSubmit = (e) => {
            e.preventDefault() 
            signupUser({
                variables:{
                    user: formData
                }
            })
      }
    
      return (
        <div className = 'container my-container'>
            {
                error && 
                <div className='red card-panel'>{error.message}</div>
            }
            {
                data && data.register &&
                <div className='green card-panel'>{data.register.user_name} is Signedup. You can login now.</div>
            }
          <h5>Signup!!</h5>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input 
                type = 'text'
                placeholder = 'Username'
                name='user_name'
                onChange = {(e) => handleChange(e)}
                required                
            />
            <input 
                type = 'date'
                placeholder = 'Birth_Date'
                name='user_birth_date'
                onChange = {(e) => handleChange(e)}
                required                
            />
            <input 
                type = 'text'
                placeholder = 'Phone_number'
                name='user_phone'
                onChange = {(e) => handleChange(e)}
                required                
            />
            <input 
                type = 'email'
                placeholder = 'email'
                name = 'user_email'
                onChange={(e) => handleChange(e)}
                required
            />
            <input 
                type = 'text'
                placeholder = 'Role'
                name = 'role'
                onChange={(e) => handleChange(e)}
                required
            />
            <input 
                type = 'password'
                placeholder = 'password'
                name = 'user_password'
                onChange={(e) => handleChange(e)}
                required
                />
                <Link to = "/login"><p>Already have an account?</p></Link>
                <button className='btn #42a5f5 blue lighten-1' type='submit'>Signup</button>
          </form>
        </div>
      )
    }
    
    export default Signup;
    