import {gql} from '@apollo/client'

export const LOAD_USERS = gql`
    query GetAllUsers{
        users{
            user_id
            user_name
            user_phone
            role
        }   
    }
`;

export const GET_PROFILE = gql`
    query user_profile($user_email: String!){
        user_profile(user_email: $user_email){
            user_id
            user_name
            user_birth_date
            user_phone
            user_email
            role
            apartments{
                apartment_number
            }
        }
}
`;

export const LOAD_APARTMENTS = gql`
    query apartments{
        apartments{
            apartment_id
            apartment_number
            apartment_size
            apartment_features
            users
        }
}
`;

export const LOAD_SHARABLE_APARTMENTS = gql`
   query sharable_apartments{
        sharable_apartments{
   	        apartment_number
            apartment_features
            apartment_size 
    }
}
`; 

export const LOAD_AVAILABLE_APARTMENTS = gql`
    query available_apartments{
        user: available_apartments{
            apartment_number
            apartment_size
            apartment_features
    }
}
`;

export const NOTUSER_APARTMENTS = gql`
    query notuser_apartments($user_id: Int!){
        user: notuser_apartments(user_id: $user_id){
            apartment_id
            apartment_number
            apartment_size
            apartment_features
    }
}
`;

export const BOOKEDUSER_APARTMENTS = gql`
    query bookeduser_apartments($user_id: Int!){
        bookeduser_apartments(user_id: $user_id){
            apartment_id
            apartment_number
            apartment_size
            apartment_features
    }
}
`;

export const BOOKED_APARTMENTS = gql`
    query bookedapartment_details{
        bookedapartment_details{
            apartment_id
            apartment_number
            apartment_size
    }
}
`;