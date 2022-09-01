import gql from 'graphql-tag';

export const QUERY_LOCATION_MODERATORS_BY_LOCATION = `
query feed_moderators_by_feed(
  $location_id: Int!
) {
  location_moderators(
    where: {
      location_id: {_eq: $location_id}}
  ) {
    id
    location_id
    created_at
    approved
    approved_at
    approved_by
    user {
      uid
      name
      username
      biography
      image
    }
  }
}`;

export const QUERY_LOCATION_MODERATOR = `
query location_moderator(
  $location_id: Int!,
  $user_id: String!
) {
  location_moderators(
    where: {
      location_id: {_eq: $location_id},
      user_id: {_eq: $user_id}
    }
  ) {
    id
    location_id
    created_at
    approved
    approved_at
    approved_by
    user {
      uid
      name
      username
      biography
      image
    }
  }
}`;

export const MUTATION_INSERT_LOCATION_MODERATOR = `
mutation insert_location_moderator(
    $user_id: String!,
    $location_id: Int!,
    $approved: Boolean
    $approved_by: String,
    $approved_at: timestamptz
) {
  insert_location_moderators(
    objects: {
      user_id: $user_id,
      location_id: $location_id, 
      approved: $approved,
      approved_by: $approved_by,
      approved_at: $approved_at
    }
  ) {
    affected_rows
    returning {
      id
      location_id
      created_at
      approved
      approved_at
      approved_by
      user {
        uid
        name
        username
        biography
        image
      }
    }
  }
}`;

export const MUTATION_DELETE_LOCATION_MODERATOR = `
mutation delete_location_moderator(
  $id: Int!
) {
  delete_location_moderators(
    where: {
      id: {_eq: $id}
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_APPROVE_LOCATION_MODERATOR = `
mutation approve_location_moderator(
  $id: Int!,
  $approved: Boolean!,
  $approved_by: String!,
  $approved_at: timestamptz!
) {
  update_location_moderators(
    where: {
      id: {_eq: $id}
    }, 
    _set: {
      approved: $approved,
      approved_by: $approved_by,
      approved_at: $approved_at
    }
  ) {
    affected_rows
    returning {
      id
      location_id
      created_at
      approved
      approved_at
      approved_by
      user {
        uid
        name
        username
        biography
        image
      }
    }
  }
}`;

export const SUBSCRIPTION_LOCATION_MODERATORS = gql`
subscription location_moderators_by_location(
  $location_id: Int!
) {
  location_moderators(
    where: {
      location_id: {_eq: $location_id}}
  ) {
    id
    location_id
    created_at
    approved
    approved_at
    approved_by
    user {
      uid
      name
      username
      biography
      image
    }
  }
}`;