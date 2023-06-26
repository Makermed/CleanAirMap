export const QUERY_SHOWFIRST_FEEDS = `
query showfirst_feeds_by_user (
  $user_id: String!
) {
  user_feed_showfirst (
    where: {
      user_id: {_eq: $user_id}
    }
  ) {
    feed_id
  }
}`;

export const MUTATION_INSERT_USER_FEED_SHOWFIRST = `
mutation insert_user_feed_showfirst (
    $user_id: String!,
    $feed_id: String!
) {
  insert_user_feed_showfirst (
    objects: {
      user_id: $user_id,
      feed_id: $feed_id
    }
  ) {
    affected_rows
    returning {
      user_id
      feed_id
    }
  }
}`;

export const MUTATION_DELETE_USER_FEED_SHOWFIRST = `
mutation delete_user_feed_showfirst (
  $user_id: String!,
  $feed_id: String!
) {
  delete_user_feed_showfirst (
    where: {
      user_id: {_eq: $user_id},
      feed_id: {_eq: $feed_id}
    }
  ) {
    affected_rows
  }
}`;
