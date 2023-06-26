import gql from 'graphql-tag';

export const QUERY_FEED_MODERATORS_BY_FEED = `
query feed_moderators_by_feed(
  $feed_id: String!
) {
  feed_moderators(
    where: {
      feed_id: {_eq: $feed_id}}
  ) {
    id
    feed_id
    created
    approved
    approved_at
    approved_by
    owner
    user {
      uid
      name
      username
      biography
      image
    }
  }
}`;

export const QUERY_FEED_MODERATOR = `
query feed_moderator(
  $feed_id: String!,
  $user_id: String!
) {
  feed_moderators(
    where: {
      feed_id: {_eq: $feed_id},
      user_id: {_eq: $user_id}
    }
  ) {
    id
    feed_id
    created
    approved
    approved_at
    approved_by
    owner
    user {
      uid
      name
      username
      biography
      image
    }
  }
}`;

export const MUTATION_INSERT_FEED_MODERATOR = `
mutation insert_feed_moderator(
    $id: uuid!,
    $feed_id: String!,
    $user_id: String!,
    $approved: Boolean,
    $approved_by: String,
    $owner: Boolean
) {
  insert_feed_moderators(
    objects: {
      id: $id, 
      feed_id: $feed_id, 
      user_id: $user_id,
      approved: $approved,
      approved_by: $approved_by,
      owner: $owner
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_FEED_MODERATOR = `
mutation delete_feed_moderator(
  $id: uuid!
) {
  delete_feed_moderators(
    where: {
      id: {_eq: $id}
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_RESIGN_FEED_MODERATOR = `
mutation resign_feed_moderator(
  $feed_id: String!,
  $user_id: String!
) {
  delete_feed_moderators(
    where: {
      feed_id: {_eq: $feed_id},
      user_id: {_eq: $user_id}
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_FEED_MODERATOR = `
mutation update_feed_moderator(
  $id: uuid!,
  $approved: Boolean!,
  $approved_by: String!,
  $approved_at: timestamptz!,
  $owner: Boolean
) {
  update_feed_moderators(
    where: {
      id: {_eq: $id}
    }, 
    _set: {
      approved: $approved,
      approved_by: $approved_by,
      approved_at: $approved_at,
      owner: $owner
    }
  ) {
    affected_rows
  }
}`;

export const SUBSCRIPTION_FEED_MODERATORS = gql`
subscription feed_moderators_by_feed(
  $feed_id: String!
) {
  feed_moderators(
    where: {
      feed_id: {_eq: $feed_id}}
  ) {
    id
    feed_id
    created
    approved
    approved_at
    approved_by
    owner
    user {
      uid
      name
      username
      biography
      image
    }
  }
}`;