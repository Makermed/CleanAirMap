export const QUERY_FEED_SUBSCRIBERS_BY_UID = `
query feed_subscribers_by_uid(
  $user_id: String!
) {
  feed_subscribers(
    where: { user_id: {_eq: $user_id} }
  ) {
    id
    feed_id
    user_id
    subscribed_at
  }
}`;

export const QUERY_FEED_SUBSCRIBERS_BY_FEED = `
query feed_subscribers_by_feed(
  $feed_id: String!
) {
  feed_subscribers(
    where: { feed_id: {_eq: $feed_id} }
  ) {
    id
    feed_id
    user_id
    subscribed_at
  }
}`;

export const MUTATION_INSERT_FEED_SUBSCRIBER = `
mutation insert_feed_subscriber(
    $feed_id: String!,
    $user_id: String!
) {
  insert_feed_subscribers(
    objects: {
      feed_id: $feed_id, 
      user_id: $user_id
    }
  ) {
    affected_rows
    returning {
      feed_id
    }
  }
}`;

export const MUTATION_DELETE_FEED_SUBSCRIBER = `
mutation delete_feed_subscriber(
  $feed_id: String!,
  $user_id: String!
) {
  delete_feed_subscribers(
    where: { 
      feed_id: {_eq: $feed_id},
      user_id: {_eq: $user_id}
    }
  ) {
    affected_rows
    returning {
      feed_id
    }
  }
}`;

export const MUTATION_DELETE_FEED_SUBSCRIBERS = `
mutation delete_feed_subscriber(
  $user_id: String!
) {
  delete_feed_subscribers(
    where: { 
      user_id: {_eq: $user_id}
    }
  ) {
    affected_rows
    returning {
      feed_id
    }
  }
}`;