// Feed
// export const MUTATION_INSERT_FEED = `
// mutation(
//   $id: String!,
//   $category_id: String!,
//   $name: String!,
//   $description: String,
//   $slug: String!,
//   $image: String!,
//   $sources: jsonb,
//   $tags: jsonb,
//   $created_by: String!,
//   $created_at: Int!,
//   $approved: Boolean!
// ) {
//   insert_feeds(
//     objects: {
//       id: $id, 
//       category_id: $category_id,
//       name: $name, 
//       description: $description,
//       slug: $slug,
//       image: $image,
//       sources: $sources,
//       tags: $tags,
//       created_by: $created_by,
//       created_at: $created_at,
//       approved: $approved
//     }
//   ) {
//     affected_rows
//   }
// }`;

export const MUTATION_INSERT_FEED = `
mutation insert_feed (
  $feed_objects: [feeds_insert_input!]!,
  $feed_sources_objects: [feed_sources_insert_input!]!
) {
  insert_feeds(
    objects: $feed_objects
  ) {
    affected_rows
  }

  insert_feed_sources(
    objects: $feed_sources_objects
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_FEED = `
mutation (
  $id: String!,
  $category_id: String!,
  $name: String!,
  $description: String,
  $slug: String!,
  $image: String!,
  $tags: jsonb,
  $created_by: String!,
  $created_at: Int!,
  $approved: Boolean!,
  $followers: Int!,
  $private: Boolean!,
  $updated_at: Int
) {
  update_feeds(
    where: {
      id: {_eq: $id}
    }, 
    _set: {
      category_id: $category_id,
      name: $name, 
      description: $description,
      slug: $slug,
      image: $image,
      tags: $tags,
      created_by: $created_by,
      created_at: $created_at,
      approved: $approved,
      followers: $followers,
      private: $private,
      updated_at: $updated_at
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_FEED_APPROVED = `
mutation (
  $id: String!,
  $approved: Boolean!,
) {
  update_feeds(
    where: { id: {_eq: $id} }, 
    _set: { 
      approved: $approved,
      private: false
    }
  ) {
    affected_rows
    returning {
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
      op_comments
      op_posts
      op_members
      op_payment
      op_anonymity
      comment_conf
      tg_wallet
      tg_address
      tg_amount
      token_address
      token_amount
      last_viewlog
      private
      article_count
      notifications
      notif_date
      updated_at
      feed_sources {
        id
        feed_id
        source_id
        keyword_filter
        approved
        create_user {
          uid
          username
        }
        source {
          id
          branch
          throttle
          has_articles
          last_updated
        }
      }
      feed_reports {
        id
        report
        approved
      }
      feed_moderators {
        user_id
        feed_id
        approved
        owner
      }
    }
  }
}
`;

export const MUTATION_UPDATE_FEED_FOLLOWERS = `
mutation (
  $id: String!,
  $followers: Int!
) {
  update_feeds(
    where: { id: {_eq: $id} }, 
    _set: { followers: $followers }
  ) {
    affected_rows
  }
}`;

// export const MUTATION_DELETE_FEED = `
// mutation (
//   $id: String!
// ) {
//   delete_feeds(
//     where: {
//       id: {_eq: $id}
//     } 
//   ) {
//     affected_rows
//   }
// }`;

export const MUTATION_DELETE_FEED = `
mutation (
  $id: String!
) {
  update_feeds(
    where: { id: {_eq: $id} },
    _set: { category_id: "deleted" } 
  ) {
    affected_rows
  }
}`;

// export const MUTATION_DELETE_FEEDS = `
// mutation (
//   $ids: [String!]
// ) {
//   delete_feeds(
//     where: {
//       id: {_in: $ids}
//     } 
//   ) {
//     affected_rows
//   }
// }`;

export const MUTATION_DELETE_FEEDS = `
mutation (
  $ids: [String!]
) {
  delete_feeds(
    where: { id: {_in: $ids} },
    _set: { category_id: "deleted" } 
  ) {
    affected_rows
  }
}`;

export const QUERY_FEED_BY_ID = `
query feed_by_id (
  $id: String!
) {
  feeds(
    where: { id: {_eq: $id} }
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
    followers
    op_comments
    op_posts
    op_members
    op_payment
    op_anonymity
    comment_conf
    tg_wallet
    tg_address
    tg_amount
    token_address
    token_amount
    last_viewlog
    private
    article_count
    notifications
    notif_date
    updated_at
    feed_reports {
      id
      report
      approved
      reported_at
      reported_user {
        uid
        username
      }
    }
    feed_sources {
      id
      feed_id
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
        has_articles
        last_updated
      }
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
      }
    }
    banned_users {
      id
      type
      banned_at
      banned_till
      user {
        uid
        username
        image
        biography
      }
    }
    preapproved_users {
      id
      user {
        uid
        username
        image
        biography
      }
    }
  }
}`;

export const QUERY_FEED_BY_SLUG = `
query feed_by_id (
  $slug: String!
) {
  feeds(
    where: { slug: {_eq: $slug} }
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
    followers
    op_comments
    op_posts
    op_members
    op_payment
    op_anonymity
    comment_conf
    tg_wallet
    tg_address
    tg_amount
    token_address
    token_amount
    last_viewlog
    private
    article_count
    notifications
    notif_date
    updated_at
    feed_reports {
      id
      report
      approved
      reported_user {
        uid
        username
      }
    }
    feed_sources {
      id
      feed_id
      source_id
      keyword_filter
      approved
      create_user {
        uid
        username
      }
      source {
        id
        branch
        throttle
        has_articles
        last_updated
      }
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
      }
    }
    banned_users {
      id
      type
      banned_at
      banned_till
      user {
        uid
        username
        image
        biography
      }
    }
    preapproved_users {
      id
      user {
        uid
        username
        image
        biography
      }
    }
  }
}`;

export const QUERY_FEED_EXIST_BY_SLUG = `
query feed_by_id (
  $feed_id: String!,
  $slug: String!
) {
  feeds(
    where: { 
      id: {_neq: $feed_id},
      slug: {_eq: $slug} 
    }
  ) {
    id
    category_id
    name
    description
    slug
  }
}`;


export const QUERY_FEED_MODERATION_COUNT = `
query (
  $feed_id: String!,
  $userpost_source_id: String!,
  $feed_source_ids: [String!]!,
  $after: timestamptz!,
  $logtype: Int!,
  $last_viewtime: timestamptz!
) {
  feed_reports_aggregate(
    where: {
      feed_id: {_eq: $feed_id},
      approved: {_eq: false}
    }
  ) {
    aggregate {
      count
    }
  }
  feed_sources_aggregate(
    where: {
      feed_id: {_eq: $feed_id},
      approved: {_eq: false}
    }
  ) {
    aggregate {
      count
    }
  }
  source_reports_aggregate(
    where: { 
      source_id: {_in: $feed_source_ids},
      approved: {_eq: false}
    }
  ) {
    aggregate {
      count
    }
  }
  articles_aggregate(
    where: {
      source_id: {_eq: $userpost_source_id},
      param1: {_eq: 0}
    }
  ) {
    aggregate {
      count
    }
  }
  feed_posts_aggregate(
    where: {
      feed_id: {_eq: $feed_id},
      approved: {_eq: false}
    }
  ) {
    aggregate {
      count
    }
  }
  article_reports_aggregate(
    where: {
      reported_at: {_gte: $after},
      source_id: {_in: $feed_source_ids},
      approved: {_eq: false}
    }
  ) {
    aggregate {
      count
    }
  }
  threads_aggregate (
    where: {
      _or: [
        { feed_id: {_eq: $feed_id} },
        { article: { source: {id: {_in: $feed_source_ids} } } }
      ],
      approved: {_eq: false}
    },
    order_by: {posted_at: desc},
  ) {
    aggregate {
      count
    }
  }
  thread_reports_aggregate (
    where: { 
      feed_id: {_eq: $feed_id},
    }
  ) {
    aggregate {
      count
    }
  }
  feed_moderators_aggregate(
    where: {
      feed_id: {_eq: $feed_id},
      approved: {_eq: false},
    }
  ) {
    aggregate {
      count
    }
  }
  moderator_reports_aggregate(
    where: { 
      feed_id: {_eq: $feed_id},
      approved: {_eq: false},
    }
  ) {
    aggregate {
      count
    }
  }
}`;

export const QUERY_FEED_MODERATION_FIELDS = `
query (
  $feed_id: String!,
  $userpost_source_id: String!,
  $feed_source_ids: [String!]!,
  $after: timestamptz!,
  $logtype: Int!
) {
  source_reports(
    where: { 
      source_id: {_in: $feed_source_ids},
    }
  ) {
    id
    source_id
    report
    reported_at
    reported_by
    approved
    approved_at
    approved_by
    reported_user {
      uid
      username
    }
  }
  articles(
    where: {
      source_id: {_eq: $userpost_source_id},
      param1: {_eq: 0}
    }
  ) {
    nid
    source_id
    title
    author
    summary
    image
    text
    html
    summarized_text
    tr_title
    tr_summary
    tr_text
    translated
    branch
    country
    crawled_at
    media_url
    url
    author_image
    published
    data
    extra_data
    param1
    param2
    param3
    param4
    param5
    txt_param1
    txt_param2
    image_thumb
    author_image_thumb
    link_preview
    discussion_twitter
    discussion_reddit
    upvotes
    comments_aggregate {
      aggregate {
        count
      }
    }
  }
  feed_posts(
    where: {
      feed_id: {_eq: $feed_id},
      approved: {_eq: false}
    }
  ) {
    article {
      nid
      source_id
      title
      author
      summary
      image
      text
      html
      summarized_text
      tr_title
      tr_summary
      tr_text
      translated
      branch
      country
      crawled_at
      media_url
      url
      author_image
      published
      data
      extra_data
      param1
      param2
      param3
      param4
      param5
      txt_param1
      txt_param2
      image_thumb
      author_image_thumb
      link_preview
      discussion_twitter
      discussion_reddit
      upvotes
      comments_aggregate {
        aggregate {
          count
        }
      }
    }
  }
  article_reports(
    where: {
      reported_at: {_gte: $after},
      source_id: {_in: $feed_source_ids},
    }
  ) {
    id
    source_id
    report
    reported_at
    reported_by
    approved
    approved_at
    approved_by
    reported_user {
      uid
      username
    }
    article {
      nid
      source_id
      title
      author
      summary
      image
      text
      html
      summarized_text
      tr_title
      tr_summary
      tr_text
      translated
      branch
      country
      crawled_at
      media_url
      url
      author_image
      published
      data
      extra_data
      param1
      param2
      param3
      param4
      param5
      txt_param1
      txt_param2
      image_thumb
      author_image_thumb
      link_preview
      discussion_twitter
      discussion_reddit
      upvotes
      comments_aggregate {
        aggregate {
          count
        }
      }
    }
  }
  threads (
    where: {
      _or: [
        { feed_id: {_eq: $feed_id} },
        { article: { source: {id: {_in: $feed_source_ids} } } }
      ],
      approved: {_eq: false}
    },
    order_by: {posted_at: desc},
  ) {
    id
    title
    text
    type
    poster {
      uid
      username
      image
    }
    feed_id
    posted_at
    approved
    upvotes
    article {
      nid
      source {
        id
        name
        image
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
    }
    comments_aggregate {
      aggregate {
        count
      }
    }
  }
  thread_reports(
    where: { 
      feed_id: {_eq: $feed_id},
    }
  ) {
    id
    thread_id
    report
    reported_at
    reported_by
    approved
    approved_at
    approved_by
    reported_user {
      uid
      username
    }
    thread {
      id
      title
      text
      type
      poster {
        uid
        username
        image
      }
      feed_id
      posted_at
      approved
      upvotes
      article {
        nid
        source {
          id
          name
          image
        }
        comments_aggregate {
          aggregate {
            count
          }
        }
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
    }
  }
  feed_moderators(
    where: {
      feed_id: {_eq: $feed_id}}
  ) {
    id
    feed_id
    created
    approved
    approved_at
    approved_by
    owner
    user {
      uid
      name
      username
      biography
      image
    }
  }
  feed_followers(
    where: { 
      feed_id: {_eq: $feed_id} 
    }
  ) {
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
    }
  }
  moderator_reports(
    where: { 
      feed_id: {_eq: $feed_id}
    }
  ) {
    id
    moderator_id
    feed_id
    report
    reported_at
    reported_by
    approved
    approved_at
    approved_by
    reported_user {
      uid
      username
    }
  }
  activitylogs (
    where: {
      type: {_eq: $logtype},
      type_id: {_eq: $feed_id},
      logged_at: {_gte: $after}
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
      uid
      username
    }
  }
}`;

export const QUERY_FEED_MEMBERS = `
query (
  $feed_id: String!,
) {
  feed_moderators(
    where: {
      feed_id: {_eq: $feed_id},
      approved: {_eq: true}
    }
  ) {
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
    }
  }
  feed_followers(
    where: { 
      feed_id: {_eq: $feed_id} 
    }
  ) {
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
    }
  }
}`;

export const MUTATION_UPDATE_FEED_COMMENTCONF = `
mutation (
  $id: String!,
  $conf: Int!
) {
  update_feeds(
    where: { id: {_eq: $id} }, 
    _set: { comment_conf: $conf }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_FEED_OP_VISIBILITY = `
mutation (
  $id: String!,
  $visibility: Boolean!
) {
  update_feeds(
    where: { id: {_eq: $id} }, 
    _set: { private: $visibility }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_FEED_OP_COMMENTS = `
mutation (
  $id: String!,
  $comments: Boolean!
) {
  update_feeds(
    where: { id: {_eq: $id} }, 
    _set: { op_comments: $comments }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_FEED_OP_POSTS = `
mutation (
  $id: String!,
  $posts: Boolean!
) {
  update_feeds(
    where: { id: {_eq: $id} }, 
    _set: { op_posts: $posts }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_FEED_OP_MEMBERS = `
mutation (
  $id: String!,
  $members: Boolean!
) {
  update_feeds(
    where: { id: {_eq: $id} }, 
    _set: { op_members: $members }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_FEED_OP_PAYMENT = `
mutation (
  $id: String!,
  $payment: Boolean!
) {
  update_feeds(
    where: { id: {_eq: $id} }, 
    _set: { op_payment: $payment }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_FEED_OP_ANONYMITY = `
mutation (
  $id: String!,
  $anonymity: Boolean!
) {
  update_feeds(
    where: { id: {_eq: $id} }, 
    _set: { op_anonymity: $anonymity }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_FEED_TG_WALLET = `
mutation (
  $id: String!,
  $tg_wallet: Boolean!
) {
  update_feeds(
    where: { id: {_eq: $id} }, 
    _set: { tg_wallet: $tg_wallet }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_FEED_TG_ADDRESS = `
mutation (
  $id: String!,
  $tg_address: Boolean!
) {
  update_feeds(
    where: { id: {_eq: $id} }, 
    _set: { tg_address: $tg_address }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_FEED_TG_AMOUNT = `
mutation (
  $id: String!,
  $tg_amount: Boolean!
) {
  update_feeds(
    where: { id: {_eq: $id} }, 
    _set: { tg_amount: $tg_amount }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_FEED_TOKEN_ADDRESS = `
mutation (
  $id: String!,
  $token_address: String!
) {
  update_feeds(
    where: { id: {_eq: $id} }, 
    _set: { token_address: $token_address }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_FEED_TOKEN_AMOUNT = `
mutation (
  $id: String!,
  $token_amount: Int!
) {
  update_feeds(
    where: { id: {_eq: $id} }, 
    _set: { token_amount: $token_amount }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_FEED_LASTVIEWLOG = `
mutation (
  $id: String!,
  $viewtime: timestamptz!
) {
  update_feeds(
    where: { id: {_eq: $id} },
    _set: { last_viewlog: $viewtime }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_FEED_NOTIFICATIONS = `
mutation (
  $id: String!,
  $notifications: Int!,
  $notif_date: timestamptz!
) {
  update_feeds(
    where: { id: {_eq: $id} },
    _set: { 
      notifications: $notifications,
      notif_date: $notif_date 
    }
  ) {
    returning {
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
      op_comments
      op_posts
      op_members
      op_payment
      op_anonymity
      comment_conf
      tg_wallet
      tg_address
      tg_amount
      token_address
      token_amount
      last_viewlog
      private
      article_count
      notifications
      notif_date
      updated_at
      feed_reports {
        id
        report
        approved
        reported_user {
          uid
          username
        }
      }
      feed_sources {
        id
        feed_id
        source_id
        keyword_filter
        approved
        create_user {
          uid
          username
        }
        source {
          id
          branch
          throttle
          has_articles
          last_updated
        }
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
        }
      }
      banned_users {
        id
        type
        banned_at
        banned_till
        user {
          uid
          username
          image
          biography
        }
      }
      preapproved_users {
        id
        user {
          uid
          username
          image
          biography
        }
      }
    }
  }
}`;
