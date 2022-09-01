export const QUERY_ACTIVITYLOGS_BY_USER = `
query activitylogs_by_user (
  $uid: String!
) {
  activitylogs (
    where: {
      user_id: {_eq: $uid}
    },
    order_by: {logged_at: desc}
  ) {
    id
    type
    type_id
    action
    object
    fromto
    reason
    logged_at
    user {
      username
    }
  }
}`;

export const QUERY_ACTIVITYLOGS_BY_TYPE = `
query activitylogs_by_type (
  $type: Int!
) {
  activitylogs (
    where: {
      type: {_eq: $type}
    },
    order_by: {logged_at: desc}
  ) {
    id
    type
    type_id
    action
    object
    fromto
    reason
    logged_at
    user {
      username
    }
  }
}`;

export const QUERY_ACTIVITYLOGS_BY_TYPEID = `
query activitylogs_by_typeid (
  $type: Int!,
  $type_id: String!
) {
  activitylogs (
    where: {
      type: {_eq: $type},
      type_id: {_eq: $type_id}
    },
    order_by: {logged_at: desc}
  ) {
    id
    type
    type_id
    action
    object
    fromto
    reason
    logged_at
    user {
      username
    }
  }
}`;

export const MUTATION_INSERT_ACTIVITYLOG = `
mutation(
  $user_id: String!,
  $type: Int,
  $type_id: String,
  $action: Int!,
  $object: String,
  $fromto: String,
  $reason: String
) {
  insert_activitylogs (
    objects: {
      user_id: $user_id, 
      type: $type,
      type_id: $type_id,
      action: $action, 
      object: $object, 
      fromto: $fromto, 
      reason: $reason
    }
  ) {
    affected_rows
  }
}`;
