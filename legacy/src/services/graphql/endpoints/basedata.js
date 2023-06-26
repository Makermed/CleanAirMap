import gql from 'graphql-tag';

export const QUERY_BASE_DATA = `
query base_data {
  newssite(order_by: {id: asc}) {
    id
    name
    country
    lang
    engine
  }
  socialtype(order_by: {branch: asc}) {
    id
    name
    hint
    branch
  }
  socialtags {
    id
    tag
    type
  }
  categories(
    where: {id: {_neq: "deleted"}},
    order_by: {name: asc}
  ) {
    id
    name
    description
    image
    coverImage
    emoji
    created_at
    created_by
    approved
    notifications
    updated_at
  }
  feeds(
    where: {category_id: {_neq: "deleted"}}
  ) {
    id
    category_id
    name
    description
    slug
    image
    tags
    followers
    created_at
    created_by
    approved
    last_viewlog
    private
    op_comments
    op_posts
    op_members
    op_payment
    op_anonymity
    tg_wallet
    tg_address
    tg_amount
    token_address
    token_amount
    article_count
    notifications
    notif_date
    updated_at
    feed_sources {
      id
      source_id
      keyword_filter
      approved
      created_at
      create_user {
        uid
        username
      }
      source {
        id
        branch
        throttle
        last_updated
        has_articles
      }
    }
    feed_reports {
      id
      report
      approved
      reported_at
    }
    feed_moderators {
      id
      feed_id
      user_id
      created
      owner
      approved
      user {
        uid
        name
        username
        biography
        image
        msgToken
      }
    }
    feed_followers {
      id
      user_id
      feed_id
      created
      user {
        uid
        name
        username
        biography
        image
        msgToken
      }
    }
  }
  tags {
    name
    tag_categories {
      category_id
    }
    tag_users {
      user_id
    }
  }
}`;

export const QUERY_BASE_DATA_USER = `
query base_data {
  newssite(order_by: {id: asc}) {
    id
    name
    country
    lang
    engine
  }
  socialtype(order_by: {branch: asc}) {
    id
    name
    hint
    branch
  }
  socialtags {
    id
    tag
    type
  }
  categories(
    where: {id: {_neq: "deleted"}},
    order_by: {updated_at: desc}
  ) {
    id
    name
    description
    image
    coverImage
    emoji
    created_at
    created_by
    approved
    notifications
    last_viewlog
    updated_at
    category_moderators {
      id
      category_id
      approved
      owner
      created
    }
  }
  feeds (
    where: {category_id: {_neq: "deleted"}}
  ){
    id
    category_id
    name
    description
    slug
    image
    tags
    followers
    created_at
    created_by
    approved
    comment_conf
    last_viewlog
    private
    op_comments
    op_posts
    op_members
    op_payment
    op_anonymity
    tg_wallet
    tg_address
    tg_amount
    token_address
    token_amount
    article_count
    notifications
    notif_date
    updated_at
    feed_sources {
      id
      source_id
      keyword_filter
      approved
      created_at
      create_user {
        uid
        username
      }
      source {
        id
        branch
        throttle
        last_updated
        has_articles
      }
    }
    feed_reports {
      id
      report
      approved
      reported_at
    }
    feed_moderators {
      id
      feed_id
      user_id
      created
      owner
      approved
      user {
        uid
        name
        username
        biography
        image
        msgToken
      }
    }
    feed_followers {
      id
      user_id
      feed_id
      created
      user {
        uid
        name
        username
        biography
        image
        msgToken
      }
    }
  }
  tags {
    name
    tag_categories {
      category_id
    }
    tag_users {
      user_id
    }
  }
}`;

export const QUERY_BASE_DATA_PAIDUSER = `
query base_data {
  newssite(order_by: {id: asc}) {
    id
    name
    country
    lang
    engine
  }
  socialtype(order_by: {branch: asc}) {
    id
    name
    hint
    branch
  }
  socialtags {
    id
    tag
    type
  }
  categories(
    where: {id: {_neq: "deleted"}},
    order_by: {created_at: asc}
  ) {
    id
    name
    description
    image
    coverImage
    emoji
    created_at
    created_by
    approved
    notifications
    last_viewlog
    updated_at
    category_moderators {
      id
      category_id
      approved
      owner
      created
    }
  }
  feeds (
    where: {category_id: {_neq: "deleted"}}
  ){
    id
    category_id
    name
    description
    slug
    image
    tags
    followers
    created_at
    created_by
    approved
    comment_conf
    last_viewlog
    private
    op_comments
    op_posts
    op_members
    op_payment
    op_anonymity
    tg_wallet
    tg_address
    tg_amount
    token_address
    token_amount
    article_count
    notifications
    notif_date
    updated_at
    feed_sources {
      id
      source_id
      keyword_filter
      approved
      created_at
      create_user {
        uid
        username
      }
      source {
        id
        branch
        throttle
        last_updated
        has_articles
      }
    }
    feed_reports {
      id
      report
      approved
      reported_at
    }
    feed_moderators {
      id
      feed_id
      user_id
      created
      owner
      approved
      user {
        uid
        name
        username
        biography
        image
        msgToken
      }
    }
    feed_followers {
      id
      user_id
      feed_id
      created
      user {
        uid
        name
        username
        biography
        image
        msgToken
      }
    }
  }
  tags {
    name
    tag_categories {
      category_id
    }
    tag_users {
      user_id
    }
  }
}`;

export const QUERY_LISTS = `
query {
  lists(order_by: {order: asc}) {
    id
    name
    order
    created_at
    created_by
    list_feeds {
      id
      feed {
        id
        name
        description
        image
      }
    }
    list_sources {
      id
      source {
        id
        branch
        name
        image
        description
        branch
        has_articles
      }
    }
  }
}`;


export const SUBSCRIPTION_CATEGORIES = gql`
subscription CategorySubscription {
  categories(
    where: {id: {_neq: "deleted"}},
    order_by: {name: asc}
  ) {
    id
    name
    description
    image
    coverImage
    emoji
    created_at
    created_by
    approved
    notifications
    updated_at
  }
}
`;

export const SUBSCRIPTION_CATEGORIES_USER = gql`
subscription CategorySubscription {
  categories(
    where: {id: {_neq: "deleted"}},
    order_by: {name: asc}
  ) {
    id
    name
    description
    image
    coverImage
    emoji
    created_at
    created_by
    approved
    notifications
    last_viewlog
    updated_at
    category_moderators {
      id
      category_id
      approved
      owner
    }
  }
}
`;


export const SUBSCRIPTION_FEEDS = gql`
subscription FeedsSubscription {
  feeds (
    where: {category_id: {_neq: "deleted"}}
  ){
    id
    category_id
    name
    description
    slug
    image
    tags
    followers
    created_at
    created_by
    approved
    last_viewlog
    private
    op_comments
    op_posts
    op_members
    op_payment
    op_anonymity
    tg_wallet
    tg_address
    tg_amount
    token_address
    token_amount
    article_count
    notifications
    notif_date
    updated_at
    feed_sources {
      id
      source_id
      keyword_filter
      approved
      created_at
      create_user {
        uid
        username
      }
      source {
        id
        branch
        throttle
        last_updated
        has_articles
      }
    }
    feed_reports {
      id
      report
      approved
      reported_at
    }
    feed_moderators {
      id
      feed_id
      user_id
      created
      owner
      approved
      user {
        uid
        name
        username
        biography
        image
        msgToken
      }
    }
    feed_followers {
      id
      user_id
      feed_id
      created
      user {
        uid
        name
        username
        biography
        image
        msgToken
      }
    }
  }
}
`;

export const SUBSCRIPTION_FEEDS_USER = gql`
subscription FeedsSubscription {
  feeds (
    where: {category_id: {_neq: "deleted"}}
  ){
    id
    category_id
    name
    description
    slug
    image
    tags
    followers
    created_at
    created_by
    approved
    comment_conf
    last_viewlog
    private
    op_comments
    op_posts
    op_members
    op_payment
    op_anonymity
    tg_wallet
    tg_address
    tg_amount
    token_address
    token_amount
    article_count
    notifications
    notif_date
    updated_at
    feed_sources {
      id
      source_id
      keyword_filter
      approved
      created_at
      create_user {
        uid
        username
      }
      source {
        id
        branch
        throttle
        last_updated
        has_articles
      }
    }
    feed_reports {
      id
      report
      approved
      reported_at
    }
    feed_moderators {
      id
      feed_id
      user_id
      created
      owner
      approved
      user {
        uid
        name
        username
        biography
        image
        msgToken
      }
    }
    feed_followers {
      id
      user_id
      feed_id
      created
      user {
        uid
        name
        username
        biography
        image
        msgToken
      }
    }
  }
}
`;