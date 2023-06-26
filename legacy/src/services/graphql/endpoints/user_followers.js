export const QUERY_USERS_BY_FOLLOWER = `
query users_by_follower (
  $follwer_id: String!
) {
  user_followers (
    where: {
      follower_id: {_eq: $follower_id}
    }
  ) {
    id
    user_id
    follower_id
    followed_at
    user {
      name
      username
      image
      biography
      approved
      msgToken
    }
  }
}`;

export const MUTATION_INSERT_USER_FOLLOWER = `
mutation insert_user_follower (
    $user_id: String!,
    $follower_id: String!
) {
  insert_user_followers (
    objects: {
      user_id: $user_id,
      follower_id: $follower_id
    }
  ) {
    affected_rows
    returning {
      id
      user_id
      follower_id
      followed_at
      user {
        name
        username
        image
        biography
        approved
        msgToken
      }
    }
  }
}`;

export const MUTATION_DELETE_USER_FOLLOWER = `
mutation delete_user_follower(
  $user_id: String!,
  $follower_id: String!
) {
  delete_user_followers (
    where: {
      user_id: {_eq: $user_id},
      follower_id: {_eq: $follower_id}
    }
  ) {
    affected_rows
  }
}`;
