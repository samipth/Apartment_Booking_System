import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { ADD_APARTMENT, ADD_BUILDING } from '../Graphql/Mutations';
import { LOAD_USERS } from '../Graphql/Queries';

function AddApartment() {
  const [formData, setFormData] = useState({});
  const [addBuilding, {loading, error, data}] = useMutation(ADD_APARTMENT, {
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
            apartment: {
              building_number: formData.building_number,
              user_id: parseInt(localStorage.getItem("user_id")),
              apartment_number: formData.apartment_number,
              apartment_size:formData.apartment_size,
              apartment_features: formData.apartment_features, 
              apartment_type: formData.apartment_type
            }
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
      <h5>AddApartment!!</h5>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input 
            type = 'text'
            placeholder = 'Building Number'
            name = 'building_number'
            onChange={(e) => handleChange(e)}
            required
            />
        <input 
            type = 'text'
            placeholder = 'Apartment Number'
            name = 'apartment_number'
            onChange={(e) => handleChange(e)}
            required
            />
        <input 
            type = 'number'
            placeholder = 'Apartment Size (BHK)'
            name = 'apartment_size'
            onChange={(e) => handleChange(e)}
            required
            />
        <input 
            type = 'text'
            placeholder = 'Apartment features'
            name = 'apartment_features'
            onChange={(e) => handleChange(e)}
            required
            />
        <input 
            type = 'text'
            placeholder = 'Apartment Type'
            name = 'apartment_type'
            onChange={(e) => handleChange(e)}
            required
            />
            <button className='btn #42a5f5 blue lighten-1' type='submit'>Add</button>
      </form>
    </div>
  )
}

export default AddApartment;
