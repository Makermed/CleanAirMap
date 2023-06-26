export const QUERY_FEED_SOURCE_SHOWRETWEETS = `
query feed_source_showretweets {
  feed_source_showretweet {
    id
    feed_id
    source_id
    user_id
    created_at
  }
}`;

export const QUERY_FEED_SOURCE_SHOWRETWEETS_BY_FEED = `
query feed_source_showretweets_by_feed(
  $feed_id: String!
) {
  feed_source_showretweet (
    where: { feed_id: {_eq: $feed_id} }
  ) {
    id
    feed_id
    source_id
    user_id
    created_at
  }
}`;

export const MUTATION_INSERT_FEED_SOURCE_SHOWRETWEET = `
mutation insert_feed_source_showretweet (
    $feed_id: String!,
    $source_id: String!,
    $user_id: String!
) {
  insert_feed_source_showretweet (
    objects: {
      feed_id: $feed_id,
      source_id: $source_id, 
      user_id: $user_id
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_FEED_SOURCE_SHOWRETWEET = `
mutation delete_feed_source_showretweet (
  $feed_id: String!,
  $source_id: String!,
  $user_id: String!
) {
  delete_feed_source_showretweet (
    where: {
      feed_id: {_eq: $feed_id},
      source_id: {_eq: $source_id},
      user_id: {_eq: $user_id}
    }
  ) {
    affected_rows
  }
}`;