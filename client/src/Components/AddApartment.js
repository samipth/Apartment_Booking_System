import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { ADD_BUILDING } from '../Graphql/Mutations';
import { LOAD_USERS } from '../Graphql/Queries';

function AddApartment() {
  const [formData, setFormData] = useState({});
  const [addBuilding, {loading, error, data}] = useMutation(ADD_BUILDING, {
    refetchQueries: [
        LOAD_USERS,
        'GetAllUsers'
    ]
  })

  const handleChange = (e) => {

    let value = parseInt(e.target.value);
    if (Number.isNaN(value)){
        value = e.target.value
    }
    setFormData({
    ...formData,
    [e.target.name]: value
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    addBuilding({
        variables: {
            building: formData
        }
    })
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
                <div className='green card-panel'>New Apartment has been added</div>
        }
      <h5>AddBuilding!!</h5>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input 
            type = 'number'
            placeholder = 'UserID'
            name = 'user_id'
            onChange={(e) => handleChange(e)}
            required
            />

        <input 
            type = 'number'
            placeholder = 'Number of Rooms'
            name = 'num_rooms'
            onChange={(e) => handleChange(e)}
            required
            />
        <input 
            type = 'text'
            placeholder = 'Location'
            name = 'building_location'
            onChange={(e) => handleChange(e)}
            required
            />
            <button className='btn #42a5f5 blue lighten-1' type='submit'>Add</button>
      </form>
    </div>
  )
}

export default AddApartment;
