export const QUERY_FEED_ORDER_BY_USER = `
query feed_order_by_user(
  $user_id: String!
) {
  feed_order(
    where: { user_id: {_eq: $user_id} },
    order_by: { order: asc }
  ) {
    user_id
    feed_id
    order
  }
}`;

export const MUTATION_INSERT_FEED_ORDER = `
mutation insert_feed_order(
    $feed_id: String!,
    $user_id: String!,
    $order: Int!
) {
  insert_feed_order(
    objects: {
      feed_id: $feed_id, 
      user_id: $user_id
      order: $order
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_INSERT_FEED_ORDERS = `
mutation(
    $orders: [feed_order_insert_input!]!
) {
  insert_feed_order(
    objects: $orders,
    on_conflict: {
      constraint: feed_order_pkey,
      update_columns: [
        user_id
        feed_id
        order
      ]
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_FEED_ORDER = `
mutation update_feed_order(
  $feed_id: String!,
  $user_id: String!,
  $order: Int!
) {
  update_feed_order(
    where: {
      feed_id: {_eq: $feed_id}, 
      user_id: {_eq: $user_id}
    }, 
    _set: {
      order: $order
    }
  ) {
    affected_rows
  }
}`;


export const MUTATION_DELETE_FEED_ORDER = `
mutation delete_feed_order(
  $user_id: String!,
  $feed_id: String!
) {
  delete_feed_order(
    where: { 
      user_id: {_eq: $user_id},
      feed_id: {_eq: $feed_id}
    }
  ) {
    affected_rows
  }
}`;