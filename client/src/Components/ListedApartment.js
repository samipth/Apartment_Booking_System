import { useMutation, useQuery } from '@apollo/client';
import {React, useEffect} from 'react'
import { LOGIN_USER } from '../Graphql/Mutations';
import { GET_PROFILE } from '../Graphql/Queries';
import {useNavigate, Link} from 'react-router-dom';

function ListedApartment() {
    const navigate = useNavigate();

    // useEffect(() => {
    //   // Check if the user is coming from the login page
    //   const fromLoginPage = localStorage.getItem('fromLoginPage') === 'true';
  
    //   if (fromLoginPage) {
    //     // Clear the flag
    //     localStorage.removeItem('fromLoginPage');
  
    //     // Refresh the page
    //     window.location.reload();
    //   }
    // }, []);

    const email = localStorage.getItem("email")
    const {loading, error, data} = useQuery(GET_PROFILE, {
        variables : {user_email: email }
    })

    if(error){
        console.log(error)
    }
    
    return (
    <div>
        <div className='center-align' style={{marginTop: "10px"}}>
            <img className="circle" style={{border: "2px solid", marginTop: "10px"}}   src={`https://robohash.org/${data?.user_profile?.user_name}.png?size=200x200`} alt='pic' />
            <h5>{data?.user_profile?.user_name}</h5>
            <h6>Email: {data?.user_profile?.user_email}</h6>
            <h6> Role: {data?.user_profile?.role}</h6>
        </div>
        <div className='center-align'>
        <p>
            <h6>Hello!!!, this is my profile.</h6>
        </p>
        </div>

        {/* For Cards */}
        <h3 className='center-align'>Listed Apartments</h3>
        <div className='container row' style={{paddingTop: "20px"}}> 
          {
            data?.user_profile?.apartments.map(apartment =>{
              return (
                      <section className='fcards col l4'>
                      <div className="row">
                        <div className="">
                        <div className="card">
                            <div className="card-image waves-effect waves-block waves-light">
                              <img className="activator" src="https://media.istockphoto.com/id/1365649825/photo/stylish-micro-apartment-for-one.jpg?s=2048x2048&w=is&k=20&c=SEjWOYBNNQ3Y4w_wn6Go4wPwhZkwoH8etv4g02dWFl4="/>
                            </div>
                            <div className="card-content">
                              <span className="card-title activator grey-text text-darken-4">{apartment?.apartment_number}<i class="material-icons right">Description</i></span>
                              <Link to = "/login"><p>Book Now!!</p></Link>
                            </div>
                            <div className="card-reveal">
                              <span className="card-title grey-text text-darken-4" >Description<i className="material-icons right">close</i></span>
                              <p>Hello there</p>
                            </div>
                          </div>
                        </div>
                    </div>
                  </section>
              )
            })
          }
        </div>
        
    </div> 
  )
}

export default ListedApartment
