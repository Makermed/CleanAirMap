export const QUERY_CATEGORY_MODERATORS_BY_CATEGORY = `
query category_moderators_by_category(
  $category_id: String!
) {
  category_moderators(
    where: {
      category_id: {_eq: $category_id}}
  ) {
    id
    user_id
    category_id
    created
    approved
    approved_at
    approved_by
    owner
  }
}`;

export const MUTATION_INSERT_CATEGORY_MODERATOR = `
mutation insert_category_moderator(
    $id: uuid!,
    $category_id: String!,
    $user_id: String!
) {
  insert_category_moderators(
    objects: {
      id: $id, 
      category_id: $category_id, 
      user_id: $user_id
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_CATEGORY_MODERATOR = `
mutation delete_category_moderator(
  $id: uuid!
) {
  delete_category_moderators(
    where: {
      id: {_eq: $id}
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_RESIGN_CATEGORY_MODERATOR = `
mutation resign_category_moderator(
  $category_id: String!,
  $user_id: String!
) {
  delete_category_moderators(
    where: {
      category_id: {_eq: $category_id},
      user_id: {_eq: $user_id}
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_CATEGORY_MODERATOR = `
mutation update_category_moderator(
  $id: uuid!,
  $approved: Boolean!,
  $approved_by: String!,
  $approved_at: timestamptz!
) {
  update_category_moderators(
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
  }
}`;