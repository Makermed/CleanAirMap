import gql from 'graphql-tag';

export const QUERY_FEED_COMMENTS = `
query feed_comments(
  $feed_id: String!
) {
  feed_comments(
    where: {
      feed_id: {_eq: $feed_id}}
  ) {
    feed_id
    posted_at
    approved
    approved_at
    approved_by
    poster {
      uid
      name
      username
      biography
      image
    }
    comment {
      id
      article_id
      thread_id
      parent_id
      created_at
      modified_at
      status
      text
      author {
        uid
        image
        username
        biography
      }
      recommends
      approved
      children_aggregate ( 
        where: {
          approved: {_eq: $approved}
        },
        order_by: {created_at: desc} 
      ) {
        aggregate { count }
      }
      children (
        where: {
          approved: {_eq: $approved}
        },
        order_by: {created_at: desc},
        limit: 1,
        offset: 0
      ) {
        id
        created_at
        recommends
        approved
        author {
          uid
          image
          username
          biography
        }
      }
    }
  }
}`;

export const QUERY_FEED_COMMENT = `
query feed_comment(
  $feed_id: String!,
  $comment_id: Int!
) {
  feed_comments(
    where: {
      feed_id: {_eq: $feed_id},
      comment_id: {_eq: $comment_id}
    }
  ) {
    feed_id
    posted_at
    approved
    approved_at
    approved_by
    poster {
      uid
      name
      username
      biography
      image
    }
    comment {
      id
      article_id
      thread_id
      parent_id
      created_at
      modified_at
      status
      text
      author {
        uid
        image
        username
        biography
      }
      recommends
      approved
      children_aggregate ( 
        where: {
          approved: {_eq: $approved}
        },
        order_by: {created_at: desc} 
      ) {
        aggregate { count }
      }
      children (
        where: {
          approved: {_eq: $approved}
        },
        order_by: {created_at: desc},
        limit: 1,
        offset: 0
      ) {
        id
        created_at
        recommends
        approved
        author {
          uid
          image
          username
          biography
        }
      }
    }
  }
}`;

export const MUTATION_INSERT_FEED_COMMENT = `
mutation insert_feed_comment(
    $feed_id: String!,
    $comment_id: Int!,
    $posted_by: String!,
    $approved: Boolean,
    $approved_by: String,
    $approved_at: timestamptz,
) {
  insert_feed_comments(
    objects: {
      feed_id: $feed_id, 
      comment_id: $comment_id,
      posted_by: $posted_by,
      approved: $approved,
      approved_by: $approved_by,
      approved_at: $approved_at
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_FEED_COMMENT = `
mutation delete_feed_comment(
  $feed_id: String!,
  $comment_id: Int!
) {
  delete_feed_comments(
    where: {
      feed_id: {_eq: $feed_id}
      comment_id: {_eq: $comment_id}
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_FEED_COMMENT = `
mutation update_feed_comment(
  $feed_id: String!,
  $comment_id: Int!,
  $approved: Boolean!,
  $approved_by: String!,
  $approved_at: timestamptz!
) {
  update_feed_comments(
    where: {
      feed_id: {_eq: $feed_id}
      comment_id: {_eq: $comment_id}
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

export const SUBSCRIPTION_FEED_COMMENTS = gql`
subscription feed_comments(
  $feed_id: String!
) {
  feed_comments(
    where: {
      feed_id: {_eq: $feed_id}}
  ) {
    feed_id
    comment_id
    posted_at
    approved
    approved_at
    approved_by
    poster {
      uid
      name
      username
      biography
      image
    }
    comment {
      id
      article_id
      thread_id
      parent_id
      created_at
      modified_at
      status
      text
      author {
        uid
        image
        username
        biography
      }
      recommends
      approved
      children_aggregate ( 
        where: {
          approved: {_eq: $approved}
        },
        order_by: {created_at: desc} 
      ) {
        aggregate { count }
      }
      children (
        where: {
          approved: {_eq: $approved}
        },
        order_by: {created_at: desc},
        limit: 1,
        offset: 0
      ) {
        id
        created_at
        recommends
        approved
        author {
          uid
          image
          username
          biography
        }
      }
    }
  }
}`;