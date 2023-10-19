import { useMutation, useQuery } from '@apollo/client';
import {React, useEffect} from 'react'
import { BOOKED_APARTMENTS } from '../Graphql/Queries';

function ApartmentDetails() {

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
    const {loading, error, data} = useQuery(BOOKED_APARTMENTS)

    if(error){
        console.log(error)
    }
    
    return (
    <div>
        <div className='center-align' style={{marginTop: "10px"}}>
        {
            data?.bookedapartments_details.map(apartment =>{
              return(
                <div>
                    <h5>Apartment ID: {apartment?.apartment_id}</h5>
                    <h6>Apartment Number: {apartment?.apartment_number}</h6>
                    <h6>Apartment Size: {apartment?.apartment_size} BHK</h6>
              </div>
            )
        })}
        </div>
    </div> 
  )
}

export default ApartmentDetails
