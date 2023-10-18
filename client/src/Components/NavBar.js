import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

function NavBar() {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const setting_refresh = () => {
    localStorage.setItem('fromNav', 'true');
  };

  return (
    <nav>
        <div className="nav-wrapper">
            <Link to = "/" className="brand-logo left" onClick={setting_refresh}>Apartment Booking App</Link>
            <ul id="nav-mobile" className="right">
              {
                token ?
                <>
                  <li><Link to="/addapartments">Add Apartments</Link></li>
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to= "/listed">Listed Apartments</Link></li>
                  <li><button className='red btn' onClick={()=>{
                    localStorage.removeItem("token")
                    localStorage.removeItem("email")
                    navigate("/login")
                  }}>Logout</button></li>
                </>:
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/signup">Signup</Link></li>
                </>
              }
                
            </ul>
        </div>
    </nav>
        
  )
}

export default NavBar
