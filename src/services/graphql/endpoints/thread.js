export const QUERY_THREADS_BY_FEEDS = `
query threads_by_feeds (
  $feed_id: String!,
  $source_ids: [String!]!,
  $approved: Boolean,
  $pagesize: Int!,
  $offset: Int!
) {
  threads (
    where: {
      _or: [
        { 
          feed_id: {_eq: $feed_id}, 
          approved: {_eq: $approved } 
        },
        { 
          article: { source: {id: {_in: $source_ids} } },
          approved: {_eq: $approved } 
        }
      ],
    },
    order_by: {posted_at: desc},
    limit: $pagesize,
    offset: $offset
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
    closed
    article {
      nid
      source {
        id
        name
        image
      }
      comments_aggregate(where: {approved: {_eq: $approved}}) {
        aggregate {
          count
        }
      }
    }
    comments_aggregate(where: {approved: {_eq: $approved}}) {
      aggregate {
        count
      }
    }
  }
}`;

export const QUERY_THREAD_BY_ID = `
query thread_by_id (
  $thread_id: Int!,
  $approved: Boolean
) {
  threads (
    where: {
      id: {_eq: $thread_id},
      approved: {_eq: $approved}
    }
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
    closed
    article {
      nid
      source {
        id
        name
        image
      }
      comments_aggregate(where: {approved: {_eq: $approved}}) {
        aggregate {
          count
        }
      }
    }
    comments_aggregate(where: {approved: {_eq: $approved}}) {
      aggregate {
        count
      }
    }
  }
}`;

export const QUERY_THREAD_BY_ARTICLE = `
query thread_by_article (
  $article_id: String!,
  $approved: Boolean
) {
  threads (
    where: {
      from: {_eq: $article_id},
      approved: {_eq: $approved}
    }
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
    closed
    article {
      nid
      source {
        id
        name
        image
      }
      comments_aggregate(where: {approved: {_eq: $approved}}) {
        aggregate {
          count
        }
      }
    }
    comments_aggregate(where: {approved: {_eq: $approved}}) {
      aggregate {
        count
      }
    }
  }
}`;

export const MUTATION_INSERT_THREAD = `
mutation (
  $title: String!,
  $text: String!,
  $type: Int!,
  $posted_by: String,
  $feed_id: String,
  $from: String,
  $approved: Boolean,
  $approved_by: String,
  $approved_at: timestamptz,
) {
  insert_threads (
    objects: {
      title: $title,
      text: $text, 
      type: $type,
      posted_by: $posted_by,
      feed_id: $feed_id,
      from: $from,
      approved: $approved,
      approved_by: $approved_by,
      approved_at: $approved_at
    }
  ) {
    affected_rows
    returning {
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
}`;

export const MUTATION_APPROVE_THREAD = `
mutation (
  $id: Int!
  $approved: Boolean!,
  $approved_by: String!,
  $approved_at: timestamptz!
) {
  update_threads (
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

export const MUTATION_CLOSE_THREAD = `
mutation (
  $id: Int!
  $closed: Boolean!,
  $closed_by: String!,
  $closed_at: timestamptz!
) {
  update_threads (
    where: {
      id: {_eq: $id}
    }, 
    _set: {
      closed: $closed,
      closed_by: $closed_by,
      closed_at: $closed_at
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_THREAD = `
mutation (
  $id: Int!
) {
  delete_threads (
    where: {
      id: {_eq: $id}
    } 
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_THREAD_BY_FROM = `
mutation (
  $article_id: String!
) {
  delete_threads (
    where: {
      from: {_eq: $article_id}
    } 
  ) {
    affected_rows
  }
}`;


export const QUERY_THREAD_VOTER = `
query thread_voter(
  $thread_id: Int!,
  $user_id: String!
) {
  thread_voter(
    where: {
      thread_id: {_eq: $thread_id},
      user_id: {_eq: $user_id} 
    }
  ) {
    id
  }
}`;

export const MUTATION_THREAD_INC_UPVOTES = `
mutation thread_inc_upvotes(
  $thread_id: Int!,
  $user_id: String!,
) {
  update_threads(
    where: {
      id: {_eq: $thread_id}
    },
    _inc: {upvotes: 1}
  ) {
    affected_rows
    returning {
      upvotes
    }
  }

  insert_thread_voter(
    objects: {
      thread_id: $thread_id, 
      user_id: $user_id
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_THREAD_DEC_UPVOTES = `
mutation thread_dec_upvotes(
  $thread_id: Int!,
  $user_id: String!,
) {
  update_threads(
    where: {
      id: {_eq: $thread_id}
    },
    _inc: {upvotes: -1}
  ) {
    affected_rows
    returning {
      upvotes
    }
  }
  
  delete_thread_voter(
    where: {
      thread_id: {_eq: $thread_id}, 
      user_id: {_eq: $user_id}
    }
  ) {
    affected_rows
  }
}`;