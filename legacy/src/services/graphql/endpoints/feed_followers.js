export const QUERY_FEED_FOLLOWERS_BY_UID = `
query feed_followers_by_uid(
  $user_id: String!
) {
  feed_followers(
    where: { user_id: {_eq: $user_id} },
    order_by: { order: asc }
  ) {
    id
    user_id
    feed_id
    order
    created
  }
}`;

export const QUERY_FEED_FOLLOWERS_BY_FEED = `
query feed_followers_by_feed(
  $feed_id: String!
) {
  feed_followers(
    where: { feed_id: {_eq: $feed_id} }
  ) {
    id
    user_id
    feed_id
    order
    created
  }
}`;

export const MUTATION_INSERT_FEED_FOLLOWER = `
mutation insert_feed_follower(
    $id: String!,
    $feed_id: String!,
    $user_id: String!,
    $order: Int
) {
  insert_feed_followers(
    objects: {
      id: $id, 
      feed_id: $feed_id, 
      user_id: $user_id
      order: $order
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_FEED_FOLLOWER_ORDER = `
mutation update_feed_follower(
  $feed_id: String!,
  $user_id: String!,
  $order: Int!
) {
  update_feed_followers(
    where: {
      feed_id: {_eq: $feed_id}, 
      user_id: {_eq: $user_id}
    }, 
    _set: {
      order: $order
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_FEED_FOLLOWER = `
mutation delete_feed_follower(
  $id: String!
) {
  delete_feed_followers(
    where: { id: {_eq: $id} }
  ) {
    affected_rows
  }
}`;