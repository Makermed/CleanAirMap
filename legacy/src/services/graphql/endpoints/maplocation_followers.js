export const QUERY_LOCATION_FOLLOWERS_BY_UID = `
query location_followers_by_uid(
  $user_id: String!
) {
  location_followers(
    where: { user_id: {_eq: $user_id} },
    order_by: { order: asc }
  ) {
    id
    user_id
    location_id
    order
    followed_at
  }
}`;

export const QUERY_LOCATION_FOLLOWERS_BY_LOCATION = `
query feed_followers_by_feed(
  $location_id: Int!
) {
  location_followers(
    where: { location_id: {_eq: $location_id} }
  ) {
    id
    user_id
    location_id
    followed_at
  }
}`;

export const MUTATION_INSERT_LOCATION_FOLLOWER = `
mutation insert_location_follower(
    $location_id: Int!,
    $user_id: String!
) {
  insert_location_followers(
    objects: {
      location_id: $location_id, 
      user_id: $user_id
    }
  ) {
    affected_rows
    returning {
      id
      user_id
      location_id
      followed_at
    }
  }
}`;

export const MUTATION_DELETE_LOCATION_FOLLOWER = `
mutation delete_location_follower(
  $location_id: Int!,
  $user_id: String!
) {
  delete_location_followers(
    where: { 
      location_id: {_eq: $location_id},
      user_id: {_eq: $user_id}
    }
  ) {
    affected_rows
  }
}`;