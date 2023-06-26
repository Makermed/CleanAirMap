export const QUERY_MAPLOCATION_BANNED_USERS_BY_LOCATION = `
query maplocation_banned_users_by_location (
  $location_id: String!
) {
  location_users_banned (
    where: {
      location_id: {_eq: $location_id}}
  ) {
    id
    user_id
    location_id
    banned_at
    user {
      username
    }
  }
}`;

export const MUTATION_INSERT_MAPLOCATION_BANNED_USER = `
mutation insert_maplocation_banned_user (
    $user_id: String!,
    $location_id: String!,
    $banned_at: timestamptz!,
    $banned_by: String!
) {
  insert_location_users_banned (
    objects: {
      user_id: $user_id,
      location_id: $location_id,
      banned_at: $banned_at,
      banned_by: $banned_by
    }
  ) {
    affected_rows
    returning {
      id
      user_id
      location_id
      banned_at
      user {
        username
      }
    }
  }
}`;

export const MUTATION_UPDATE_MAPLOCATION_BANNED_USER = `
mutation update_maplocation_banned_user (
    $user_id: String!,
    $location_id: String!,
    $banned_at: timestamptz!,
    $banned_by: String!
) {
  update_location_users_banned (
    where: {
      user_id: {_eq: $user_id},
      location_id: {_eq: $location_id}
    },
    _set: {
      user_id: $user_id,
      location_id: $location_id,
      banned_at: $banned_at,
      banned_by: $banned_by
    }
  ) {
    affected_rows
    returning {
      id
      user_id
      location_id
      banned_at
      user {
        username
      }
    }
  }
}`;

export const MUTATION_DELETE_MAPLOCATION_BANNED_USER = `
mutation delete_banned_user(
  $id: uuid!
) {
  delete_location_users_banned (
    where: {
      id: {_eq: $id}
    }
  ) {
    affected_rows
  }
}`;
