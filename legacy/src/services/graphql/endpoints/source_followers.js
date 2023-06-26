export const QUERY_SOURCE_FOLLOWERS_BY_SOURCE = `
query source_followers_by_source(
  $source_id: String!
) {
  source_followers(
    where: {
      source_id: {_eq: $source_id}
    }
  ) {
    id
    user_id
    source_id
  }
}`;

export const MUTATION_INSERT_SOURCE_FOLLOWER = `
mutation insert_source_follower(
  $id: String!,
  $source_id: String!,
  $user_id: String!
) {
insert_source_followers(
  objects: {
    id: $id, 
    source_id: $source_id, 
    user_id: $user_id
  }
) {
  affected_rows
}
}`;

export const MUTATION_DELETE_SOURCE_FOLLOWER = `
mutation delete_source_follower(
  $id: String!
) {
  delete_source_followers(
    where: {
      id: {_eq: $id}
    }
  ) {
    affected_rows
  }
}`;
