import { gql } from "@apollo/client";

const getUserProfile = gql`
    query get_user_profile ($user_id: String!) {
        users(where: {id: {_eq: $user_id}}) {
            id
            email
            username
        }
    }
`;


export {getUserProfile};
