export const QUERY_FEED_SOURCE_UNFOLLOWERS = `
query feed_source_unfollowers {
  feed_source_unfollowers {
    id
    feed_id
    source_id
    user_id
    created
  }
}`;

export const QUERY_FEED_SOURCE_UNFOLLOWERS_BY_FEED = `
query feed_source_unfollowers_by_feed(
  $feed_id: String!
) {
  feed_source_unfollowers (
    where: { feed_id: {_eq: $feed_id} }
  ) {
    id
    feed_id
    source_id
    user_id
    created
  }
}`;

export const MUTATION_INSERT_FEED_SOURCE_UNFOLLOWER = `
mutation insert_feed_source_unfollower (
    $id: uuid!,
    $feed_id: String!,
    $source_id: String!,
    $user_id: String!
) {
  insert_feed_source_unfollowers (
    objects: {
      id: $id, 
      feed_id: $feed_id,
      source_id: $source_id, 
      user_id: $user_id
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_FEED_SOURCE_UNFOLLOWER = `
mutation delete_feed_source_unfollower (
  $feed_id: String!,
  $source_id: String!,
  $user_id: String!
) {
  delete_feed_source_unfollowers (
    where: {
      feed_id: {_eq: $feed_id},
      source_id: {_eq: $source_id},
      user_id: {_eq: $user_id}
    }
  ) {
    affected_rows
  }
}`;