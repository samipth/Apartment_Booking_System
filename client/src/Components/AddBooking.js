import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { ADD_BOOKING } from '../Graphql/Mutations';
import { LOAD_USERS } from '../Graphql/Queries';
import { useNavigate } from 'react-router-dom';

function AddBooking() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [addBooking, {loading, error, data}] = useMutation(ADD_BOOKING, {
    refetchQueries: [
        LOAD_USERS,
        'GetAllUsers'
    ]
  })

  const handleChange = (e) => {
    setFormData({
    ...formData,
    [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    addBooking({
        variables: {
            booking: {
              user_id: parseInt(localStorage.getItem("user_id")),
              apartment_id: parseInt(localStorage.getItem("apartment_id")),
              booking_start_date: formData.booking_start_date,
              booking_end_date: formData.booking_end_date
            }
        }
    })
    navigate("/profile")
  }

//   if(loading) return <h1>Loading</h1>

//   if(error){
//     console.log(error.message)
//   }

  if(data){
    console.log(data)
  }

  return (
    <div className = 'container my-container'>
        {
            error && 
            <div className='red card-panel'>{error.message}</div>
        }
        {
                data && data.addBuilding &&
                <div className='green card-panel'>New Booking has been added</div>
        }
      <h5>AddBooking!!</h5>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input 
            type = 'date'
            placeholder = 'Start Date'
            name = 'booking_start_date'
            onChange={(e) => handleChange(e)}
            required
            />

        <input 
            type = 'date'
            placeholder = 'End Date'
            name = 'booking_end_date'
            onChange={(e) => handleChange(e)}
            required
            />
            <button className='btn #42a5f5 blue lighten-1' type='submit'>Add</button>
      </form>
    </div>
  )
}

export default AddBooking
