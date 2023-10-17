import { useMutation } from '@apollo/client';
import React, {useState} from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { LOGIN_USER } from '../Graphql/Mutations';

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({});

  const [loginUser,{data,loading,error}] = useMutation(LOGIN_USER,{
    onCompleted(data){
      localStorage.setItem("token",data.login.token)
      console.log(data)
      localStorage.setItem("email",data.login.email)
      localStorage.setItem('fromLoginPage', 'true');

      navigate("/profile")
    }
  })
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

if(loading) return <h1>Loading</h1>

  const handleChange = (e) => {
    setFormData({
    ...formData,
    [e.target.name]: e.target.value
    })
  } 

  const handleSubmit = (e) => {
        e.preventDefault() 
        loginUser({
          variables: formData
      })
  }

  return (
    <div className = 'container my-container'>
      {
        error && 
        <div className='red card-panel'>{error.message}</div>
      }
      <h5>Login!!</h5>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input 
            type = 'email'
            placeholder = 'email'
            name = 'email'
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
            <Link to = "/signup"><p>Don't have an account?</p></Link>
            <button className='btn #42a5f5 blue lighten-1' type='submit'>Login</button>
      </form>
    </div>
  )
  
}

export default Login;
