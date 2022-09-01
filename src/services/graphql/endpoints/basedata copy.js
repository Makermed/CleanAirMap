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
    where: {id: {_neq: "trending"}},
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
  }
  feeds (
    where: {category_id: {_neq: "trending"}}
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
    article_count
    feed_sources {
      id
      source_id
      approved
      create_user {
        uid
        username
      }
      source {
        id
        throttle
        last_updated
      }
    }
    feed_reports {
      id
      report
      approved
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
    where: {id: {_neq: "trending"}},
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
    last_viewlog
    category_moderators {
      id
      category_id
      approved
      owner
    }
  }
  feeds (
    where: {category_id: {_neq: "trending"}}
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
    article_count
    feed_sources {
      id
      source_id
      approved
      create_user {
        uid
        username
      }
      source {
        id
        throttle
        last_updated
      }
    }
    feed_reports {
      id
      report
      approved
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
    where: {id: {_neq: "trending"}},
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
    last_viewlog
    category_moderators {
      id
      category_id
      approved
      owner
    }
  }
  feeds (
    where: {category_id: {_neq: "trending"}}
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
    article_count
    feed_sources {
      id
      source_id
      approved
      create_user {
        uid
        username
      }
      source {
        id
        throttle
        last_updated
      }
    }
    feed_reports {
      id
      report
      approved
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
        name
        image
        description
        branch
      }
    }
  }
}`;
