import gql from 'graphql-tag';

export const QUERY_USER_BY_ID = `
query user_by_id(
  $uid: String!
) {
  users(
    where: {
      uid: {_eq: $uid}
    }
  ) {
    uid
    name
    username
    biography
    image
    provider
    email
    emailVerified
    phone
    phoneVerified
    state
    country
    links
    role
    approved
    signMethod
    skipProfile
    msgToken
    cryptoAddress
    cryptoENS
    cryptoAmount
    paid
    paid_until
    subscribe_email
    created_at
    categories_moderated {
      category_id
      approved
      owner
    }
    feeds_created {
      id
    }
    feeds_followed {
      feed_id
    }
    feeds_moderated {
      feed_id
      approved
      owner
    }
    sources_created {
      id
    }
    sources_followed {
      source_id
    }
    tags {
      tag {
        name
        tag_categories {
          category_id
        }
      }
    }
    banned {
      id
      user_id
      feed_id
      type
      banned_at
      banned_till
    }
    preapproved {
      id
      feed_id
    }
    users_followed {
      id
      user_id
      followed_at
      user {
        uid
        name
        username
        image
        biography
        approved
        msgToken
      }
    }
    user_followers {
      id
      follower_id
      followed_at
      follower {
        uid
        name
        username
        image
        biography
        approved
        msgToken
      }
    }
    users_invites {
      id
      invitee
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
    feeds_subscribed {
      feed_id
    }
    user_feed_showfirst {
      feed_id
    }
    regions_moderated {
      id
      region_id
      approved
    }
    locations_moderated {
      id
      location_id
      approved
    }
    locations_followed {
      location_id
    }
    location_banned {
      id
      user_id
      location_id
      banned_at
      user {
        uid
        username
      }
    }
  }
}`;

export const QUERY_USER_BY_USERNAME = `
query user_by_username(
  $username: String!
) {
  users(
    where: {
      username: {_eq: $username}
    }
  ) {
    uid
    name
    username
    biography
    image
    provider
    email
    emailVerified
    phone
    phoneVerified
    state
    country
    links
    role
    approved
    signMethod
    skipProfile
    msgToken
    cryptoAddress
    cryptoENS
    cryptoAmount
    paid
    paid_until
    subscribe_email
    created_at
    categories_moderated {
      category_id
      approved
      owner
    }
    feeds_created {
      id
    }
    feeds_followed {
      feed_id
    }
    feeds_moderated {
      feed_id
      approved
      owner
    }
    sources_created {
      id
    }
    sources_followed {
      source_id
    }
    tags {
      tag {
        name
        tag_categories {
          category_id
        }
      }
    }
    banned {
      id
      user_id
      feed_id
      type
      banned_at
      banned_till
    }
    preapproved {
      id
      feed_id
    }
    users_followed {
      id
      user_id
      followed_at
      user {
        name
        username
        image
        biography
        approved
        msgToken
      }
    }
    user_followers {
      id
      follower_id
      followed_at
      follower {
        name
        username
        image
        biography
        approved
        msgToken
      }
    }
    users_invites {
      id
      invitee
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
    feeds_subscribed {
      feed_id
    }
    user_feed_showfirst {
      feed_id
    }
    regions_moderated {
      id
      region_id
      approved
    }
    locations_moderated {
      id
      location_id
      approved
    }
    locations_followed {
      location_id
    }
    location_banned {
      id
      user_id
      location_id
      banned_at
      user {
        uid
        username
      }
    }
  }
}`;

export const QUERY_USERS_BY_SEARCHKEY = `
query user_by_searchkey(
  $searchkey: String!
) {
  users(
    where: {
      _or: {
        name: {_ilike: $searchkey}, 
        username: {_ilike: $searchkey}
      }
    }
  ) {
    uid
    name
    username
    biography
    image
    provider
    email
    emailVerified
    phone
    phoneVerified
    state
    country
    links
    role
    approved
    signMethod
    skipProfile
    msgToken
    cryptoAddress
    cryptoENS
    cryptoAmount
    paid
    paid_until
    subscribe_email
  }
}`;



// User
export const MUTATION_INSERT_USER = `
mutation(
  $uid: String!,
  $name: String,
  $username: String,
  $biography: String,
  $image: String,
  $provider: String,
  $email: String,
  $emailVerified: Boolean!,
  $phone: String,
  $phoneVerified: Boolean!
  $state: String,
  $country: String,
  $links: jsonb,
  $role: Int!,
  $approved: Boolean!,
  $signMethod: Int!,
  $msgToken: String
) {
  insert_users(
    objects: {
      uid: $uid, 
      name: $name, 
      username: $username,
      biography: $biography,
      image: $image,
      provider: $provider,
      email: $email,
      emailVerified: $emailVerified,
      phone: $phone,
      phoneVerified: $phoneVerified,
      state: $state,
      country: $country,
      links: $links,
      role: $role,
      approved: $approved,
      signMethod: $signMethod,
      msgToken: $msgToken
    }
  ) {
    affected_rows
    returning {
      uid
      name
      username
      biography
      image
      provider
      email
      emailVerified
      phone
      phoneVerified
      state
      country
      links
      role
      approved
      signMethod
      skipProfile
      msgToken
      cryptoAddress
      cryptoENS
      cryptoAmount
      paid
      paid_until
      subscribe_email
      created_at
    }
  }
}`;

export const MUTATION_UPDATE_USER = `
mutation (
  $uid: String!,
  $name: String,
  $username: String,
  $biography: String,
  $image: String,
  $provider: String,
  $email: String,
  $emailVerified: Boolean,
  $phone: String,
  $phoneVerified: Boolean,
  $cryptoAddress: String,
  $cryptoENS: String,
  $cryptoAmount: Float,
  $state: String,
  $country: String,  
  $links: jsonb,
  $role: Int,
  $approved: Boolean,
  $skipProfile: Boolean
) {
  update_users(
    where: {
      uid: {_eq: $uid}
    }, 
    _set: {
      name: $name, 
      username: $username,
      biography: $biography,
      image: $image,
      provider: $provider,
      email: $email,
      emailVerified: $emailVerified,
      phone: $phone,
      phoneVerified: $phoneVerified,
      cryptoAddress: $cryptoAddress,
      cryptoENS: $cryptoENS,
      cryptoAmount: $cryptoAmount,
      state: $state,
      country: $country,
      links: $links,
      role: $role,
      approved: $approved,
      skipProfile: $skipProfile
    }
  ) {
    affected_rows
    returning {
      uid
      name
      username
      biography
      image
      provider
      email
      emailVerified
      phone
      phoneVerified
      state
      country
      links
      role
      approved
      signMethod
      skipProfile
      msgToken
      cryptoAddress
      cryptoENS
      cryptoAmount
      paid
      paid_until
      subscribe_email
      created_at
    }
  }
}`;

export const MUTATION_UPDATE_USER_PHONE = `
mutation (
  $uid: String!,
  $phone: String!
) {
  update_users(
    where: {
      uid: {_eq: $uid}
    }, 
    _set: {
      phone: $phone
    }
  ) {
    affected_rows
    returning {
      uid
      name
      username
      biography
      image
      provider
      email
      emailVerified
      phone
      phoneVerified
      state
      country
      links
      role
      approved
      signMethod
      skipProfile
      msgToken
      cryptoAddress
      cryptoENS
      cryptoAmount
      paid
      paid_until
      subscribe_email
      created_at
    }
  }
}`;

export const MUTATION_UPDATE_USER_LINKS = `
mutation (
  $uid: String!,
  $links: jsonb!
) {
  update_users(
    where: {
      uid: {_eq: $uid}
    }, 
    _set: {
      links: $links
    }
  ) {
    affected_rows
    returning {
      uid
      name
      username
      biography
      image
      provider
      email
      emailVerified
      phone
      phoneVerified
      state
      country
      links
      role
      approved
      signMethod
      skipProfile
      msgToken
      cryptoAddress
      cryptoENS
      cryptoAmount
      paid
      paid_until
      subscribe_email
      created_at
    }
  }
}`;

export const MUTATION_UPDATE_USER_MSGTOKEN = `
mutation (
  $uid: String!,
  $msgToken: String
) {
  update_users(
    where: {
      uid: {_eq: $uid}
    }, 
    _set: {
      msgToken: $msgToken
    }
  ) {
    affected_rows
    returning {
      uid
      name
      username
      biography
      image
      provider
      email
      emailVerified
      phone
      phoneVerified
      state
      country
      links
      role
      approved
      signMethod
      skipProfile
      msgToken
      cryptoAddress
      cryptoENS
      cryptoAmount
      paid
      paid_until
      subscribe_email
      created_at
    }
  }
}`;

export const MUTATION_UPDATE_USER_SKIPPROFILE = `
mutation (
  $uid: String!,
  $skipProfile: Boolean!
) {
  update_users(
    where: {
      uid: {_eq: $uid}
    }, 
    _set: {
      skipProfile: $skipProfile
    }
  ) {
    affected_rows
    returning {
      uid
      name
      username
      biography
      image
      provider
      email
      emailVerified
      phone
      phoneVerified
      state
      country
      links
      role
      approved
      signMethod
      skipProfile
      msgToken
      cryptoAddress
      cryptoENS
      cryptoAmount
      paid
      paid_until
      subscribe_email
      created_at
    }
  }
}`;

export const MUTATION_UPDATE_USER_SUBSCRIBE_EMAIL = `
mutation (
  $uid: String!,
  $subscribe_email: String!
) {
  update_users(
    where: {
      uid: {_eq: $uid}
    }, 
    _set: {
      subscribe_email: $subscribe_email
    }
  ) {
    affected_rows
    returning {
      uid
      name
      username
      biography
      image
      provider
      email
      emailVerified
      phone
      phoneVerified
      state
      country
      links
      role
      approved
      signMethod
      skipProfile
      msgToken
      cryptoAddress
      cryptoENS
      cryptoAmount
      paid
      paid_until
      subscribe_email
      created_at
    }
  }
}`;

export const MUTATION_DELETE_USER_SUBSCRIBE_EMAIL = `
mutation (
  $uid: String!
) {
  update_users (
    where: {
      uid: {_eq: $uid}
    }, 
    _set: {
      subscribe_email: null
    }
  ) {
    affected_rows
    returning {
      uid
      name
      username
      biography
      image
      provider
      email
      emailVerified
      phone
      phoneVerified
      state
      country
      links
      role
      approved
      signMethod
      skipProfile
      msgToken
      cryptoAddress
      cryptoENS
      cryptoAmount
      paid
      paid_until
      subscribe_email
      created_at
    }
  }
}`;

export const QUERY_TAG_USER_BY_REF = `
query tag_user_by_ref (
  $tag_name: String!
  $user_id: String!
) {
  tag_user (
    where: {
      tag_name: {_eq: $tag_name},
      user_id: {_eq: $user_id}
    }
  ) {
    id
    tag_name
    user_id
  }
}`;

export const MUTATION_ADD_TAG_USER = `
mutation (
  $id: uuid!
  $tag_name: String!,
  $user_id: String!
) {
  insert_tag_user (
    objects: {
      id: $id,
      tag_name: $tag_name,
      user_id: $user_id
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_TAG_USER = `
mutation (
  $tag_name: String!,
  $user_id: String!
) {
  delete_tag_user (
    where: {
      tag_name: {_eq: $tag_name},
      user_id: {_eq: $user_id}
    }
  ) {
    affected_rows
  }
}`;

export const SUBSCRIPTION_USER = gql`
subscription UserSubscription(
  $uid: String!
) {
  users(
    where: {
      uid: {_eq: $uid}
    }
  ) {
    uid
    name
    username
    biography
    image
    provider
    email
    emailVerified
    phone
    phoneVerified
    state
    country
    links
    role
    approved
    signMethod
    skipProfile
    msgToken
    cryptoAddress
    cryptoENS
    cryptoAmount
    paid
    paid_until
    subscribe_email
    created_at
    categories_moderated {
      category_id
      approved
      owner
    }
    feeds_created {
      id
    }
    feeds_followed {
      feed_id
    }
    feeds_moderated {
      feed_id
      approved
      owner
    }
    sources_created {
      id
    }
    sources_followed {
      source_id
    }
    tags {
      tag {
        name
        tag_categories {
          category_id
        }
      }
    }
    banned {
      id
      user_id
      feed_id
      type
      banned_at
      banned_till
    }
    preapproved {
      id
      feed_id
    }
    users_followed {
      id
      user_id
      followed_at
      user {
        name
        username
        image
        biography
        approved
        msgToken
      }
    }
    user_followers {
      id
      follower_id
      followed_at
      follower {
        name
        username
        image
        biography
        approved
        msgToken
      }
    }
    users_invites {
      id
      invitee
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
    feeds_subscribed {
      feed_id
    }
    user_feed_showfirst {
      feed_id
    }
    regions_moderated {
      id
      region_id
      approved
    }
    locations_moderated {
      id
      location_id
      approved
    }
    locations_followed {
      location_id
    }
    location_banned {
      id
      user_id
      location_id
      banned_at
      user {
        uid
        username
      }
    }
  }
}`;