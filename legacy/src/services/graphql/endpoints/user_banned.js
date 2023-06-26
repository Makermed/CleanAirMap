export const QUERY_BANNED_USERS_BY_FEED = `
query banned_users_by_feed (
  $feed_id: String!
) {
  users_banned (
    where: {
      feed_id: {_eq: $feed_id}}
  ) {
    id
    user_id
    feed_id
    type
    banned_at
    banned_till
    user {
      username
    }
  }
}`;

export const MUTATION_INSERT_BANNED_USER = `
mutation insert_banned_user (
    $user_id: String!,
    $feed_id: String!,
    $banned_at: timestamptz!,
    $banned_till: timestamptz!,
    $type: Int!,
    $banned_by: String!
) {
  insert_users_banned (
    objects: {
      user_id: $user_id,
      feed_id: $feed_id,
      banned_at: $banned_at,
      banned_till: $banned_till,
      type: $type,
      banned_by: $banned_by
    }
  ) {
    affected_rows
    returning {
      id
      user_id
      feed_id
      type
      banned_at
      banned_till
    }
  }

  delete_users_preapproved (
    where: {
      user_id: {_eq: $user_id},
      feed_id: {_eq: $feed_id}
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_BANNED_USER = `
mutation update_banned_user (
    $user_id: String!,
    $feed_id: String!,
    $banned_at: timestamptz!,
    $banned_till: timestamptz!,
    $type: Int!,
    $banned_by: String!
) {
  update_users_banned (
    where: {
      user_id: {_eq: $user_id},
      feed_id: {_eq: $feed_id}
    },
    _set: {
      user_id: $user_id,
      feed_id: $feed_id,
      banned_at: $banned_at,
      banned_till: $banned_till,
      type: $type,
      banned_by: $banned_by
    }
  ) {
    affected_rows
    returning {
      id
      user_id
      feed_id
      type
      banned_at
      banned_till
    }
  }
}`;

export const MUTATION_DELETE_BANNED_USER = `
mutation delete_banned_user(
  $id: uuid!
) {
  delete_users_banned (
    where: {
      id: {_eq: $id}
    }
  ) {
    affected_rows
  }
}`;
