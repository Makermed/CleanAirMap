import gql from 'graphql-tag';


export const QUERY_NOTIFICATIONS_TO_USER = `
query notifications_to_user (
  $user_id: String!
) {
  notifications (
    where: {
      to: {_eq: $user_id},
      confirmed: {_eq: false}
    },
    order_by: {created_at: desc}
  ) {
    id
    type
    object
    in_which
    created_at
    created_by
    to
    confirmed
    creator {
      name
      username
    }
  }
}`;

export const MUTATION_INSERT_NOTIFICATION = `
mutation insert_notification (
  $type: Int!,
  $object: String!,
  $in_which: String,
  $to: String,
  $created_by: String!
) {
  insert_notifications (
    objects: {
      type: $type, 
      object: $object, 
      in_which: $in_which,
      to: $to,
      created_by: $created_by
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_CONFIRM_NOTIFICATION = `
mutation update_notification (
  $id: Int!,
) {
  update_notifications (
    where: { id: {_eq: $id} },
    _set: { confirmed: true }
  ) {
    affected_rows
  }
}`;



export const SUBSCRIPTION_NOTIFICATIONS = gql`
subscription NotificationSubscription(
  $user_id: String!
) {
  notifications (
    where: {
      to: {_eq: $user_id},
      confirmed: {_eq: false}
    },
    order_by: {created_at: desc}
  ){
    id
    type
    object
    in_which
    created_at
    created_by
    to
    confirmed
    creator {
      name
      username
    }
  }
}
`;
