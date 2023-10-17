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
            user_name
            user_birth_date
            user_phone
            user_email
            role
        }
}
`;

export const LOAD_APARTMENTS = gql`
    query apartments{
        apartments{
            apartment_number
            apartment_size
            apartment_features
        }
}
`;