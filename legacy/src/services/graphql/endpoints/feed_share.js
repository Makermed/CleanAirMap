export const QUERY_FEED_SHARE_BY_ID = `
query feed_share_by_id(
  $id: String!
) {
  feed_share(
    where: { id: {_eq: $id} }
  ) {
    id
    feed_id
    created_at
    created_by
    expired_at
  }
}`;

export const QUERY_FEED_SHARE_BY_FEED = `
query feed_share_by_feed(
  $feed_id: String!,
  $after: timestamptz!
) {
  feed_share(
    where: {
      feed_id: {_eq: $feed_id}},
      expired_at: {_lte: $after}
  ) {
    id
    feed_id
    created_at
    created_by
    expired_at
  }
}`;

export const MUTATION_INSERT_FEED_SHARE = `
mutation insert_feed_share(
    $id: String!,
    $feed_id: String!,
    $created_by: String!,
    $expired_at: timestamptz!
) {
  insert_feed_share(
    objects: {
      id: $id, 
      feed_id: $feed_id, 
      created_by: $created_by,
      expired_at: $expired_at
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_FEED_SHARE = `
mutation delete_feed_share(
  $id: String!
) {
  delete_feed_share(
    where: {
      id: {_eq: $id}
    }
  ) {
    affected_rows
  }
}`;
