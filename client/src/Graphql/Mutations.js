import {gql} from '@apollo/client'

export const SIGNUP_USER = gql `
  mutation register($user: AddUser!){
    register(user: $user){
      user_name
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $user_password: String!){
    login(email: $email, user_password: $user_password){
      token
      email
  }
}
`;

export const ADD_BUILDING = gql`
  mutation addBuilding($building: AddBuilding!){
    addBuilding(building: $building){
      user_id
      building_location
  }
}
`;

export const ADD_BOOKING = gql`
  mutation addBooking($booking: AddBooking!){
    addBooking(booking: $booking){
      user_id
      apartment_id
      created_at
  }
}
`;

