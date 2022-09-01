export const QUERY_PREAPPROVED_USERS_BY_FEED = `
query preapproved_users_by_feed (
  $feed_id: String!
) {
  users_preapproved (
    where: {
      feed_id: {_eq: $feed_id}}
  ) {
    id
    user_id
    feed_id
    type
    approved_at
    user {
      username
    }
  }
}`;

export const MUTATION_INSERT_PREAPPROVED_USER = `
mutation insert_preapproved_user (
    $user_id: String!,
    $feed_id: String!,
    $approved_by: String!
) {
  insert_users_preapproved (
    objects: {
      user_id: $user_id,
      feed_id: $feed_id,
      approved_by: $approved_by
    }
  ) {
    affected_rows
    returning {
      id
      user_id
      feed_id
    }
  }

  delete_users_banned (
    where: {
      user_id: {_eq: $user_id},
      feed_id: {_eq: $feed_id}
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_PREAPPROVED_USER = `
mutation delete_preapproved_user(
  $id: uuid!
) {
  delete_users_preapproved (
    where: {
      id: {_eq: $id}
    }
  ) {
    affected_rows
  }
}`;
