import { gql } from "@apollo/client";

const createNewUser = gql`
    mutation create_user($email: String, $username: String) {
        insert_users(objects: {email: $email, username: $username}) {
        affected_rows
        returning {
            id
            email
            username
        }
      }
    }
`
export {createNewUser}
