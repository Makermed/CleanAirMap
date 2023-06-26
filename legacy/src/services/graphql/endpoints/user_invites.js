export const QUERY_INVITES_BY_USER = `
query invites_by_user (
  $invitee: String!
) {
  user_invites (
    where: {
      invitee: {_eq: $invitee},
      is_phone: {_eq: false}
    }
  ) {
    id
    invitee
    invited_to
    invited_at
    phoneno
    is_phone
    inviter {
      name
      username
      image
      biography
      approved
      msgToken
    }
  }
}`;

export const QUERY_INVITES_BY_PHONE = `
query invites_by_phone (
  $phone: String!
) {
  user_invites (
    where: {
      phoneno: {_eq: $phone},
      is_phone: {_eq: true}
    }
  ) {
    id
    invitee
    invited_to
    invited_at
    phoneno
    is_phone
    inviter {
      name
      username
      image
      biography
      approved
      msgToken
    }
  }
}`;

export const MUTATION_INSERT_USER_INVITE = `
mutation insert_user_invite (
    $invitee: String!,
    $is_phone: Boolean!,
    $invited_by: String!,
    $invited_to: String,
) {
  insert_user_invites (
    objects: {
      invitee: $invitee,
      is_phone: $is_phone,
      invited_by: $invited_by,
      invited_to: $invited_to
    }
  ) {
    affected_rows
    returning {
      id
      invitee
      phoneno
      invited_to
      invited_at
      is_phone
      inviter {
        name
        username
        image
        biography
        approved
        msgToken
      }
    }
  }
}`;

export const MUTATION_INSERT_USER_INVITE_BYPHONE = `
mutation insert_user_invite (
    $phoneno: String!,
    $is_phone: Boolean!,
    $invited_by: String!,
    $invited_to: String,
) {
  insert_user_invites (
    objects: {
      phoneno: $phoneno,
      is_phone: $is_phone,
      invited_by: $invited_by,
      invited_to: $invited_to
    }
  ) {
    affected_rows
    returning {
      id
      invitee
      phoneno
      invited_to
      invited_at
      is_phone
      inviter {
        name
        username
        image
        biography
        approved
        msgToken
      }
    }
  }
}`;

export const MUTATION_DELETE_USER_INVITE = `
mutation delete_user_invites(
  $invitee: String!,
  $invited_by: String!
) {
  delete_user_invites (
    where: {
      invitee: {_eq: $invitee},
      invited_by: {_eq: $invited_by}
    }
  ) {
    affected_rows
  }
}`;
