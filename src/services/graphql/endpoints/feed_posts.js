import gql from 'graphql-tag';

export const QUERY_FEED_POSTS = `
query feed_posts(
  $feed_id: String!
) {
  feed_posts(
    where: {
      feed_id: {_eq: $feed_id},
      approved: {_eq: true}
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
}`;

export const QUERY_FEED_POST = `
query feed_post(
  $feed_id: String!,
  $article_id: String!
) {
  feed_posts(
    where: {
      feed_id: {_eq: $feed_id},
      article_id: {_eq: $article_id}
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
}`;

export const MUTATION_INSERT_FEED_POST = `
mutation insert_feed_post(
    $feed_id: String!,
    $article_id: String!,
    $posted_by: String!,
    $approved: Boolean,
    $approved_by: String,
    $approved_at: timestamptz,
) {
  insert_feed_posts(
    objects: {
      feed_id: $feed_id, 
      article_id: $article_id,
      posted_by: $posted_by,
      approved: $approved,
      approved_by: $approved_by,
      approved_at: $approved_at
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_FEED_POST = `
mutation delete_feed_post(
  $feed_id: String!,
  $article_id: String!
) {
  delete_feed_posts(
    where: {
      feed_id: {_eq: $feed_id}
      article_id: {_eq: $article_id}
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_FEED_POST = `
mutation update_feed_post(
  $feed_id: String!,
  $article_id: String!,
  $approved: Boolean!,
  $approved_by: String!,
  $approved_at: timestamptz!
) {
  update_feed_posts(
    where: {
      feed_id: {_eq: $feed_id}
      article_id: {_eq: $article_id}
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

export const SUBSCRIPTION_FEED_POSTS = gql`
subscription feed_posts_by_feed(
  $feed_id: String!
) {
  feed_posts(
    where: {
      feed_id: {_eq: $feed_id}}
  ) {
    feed_id
    article_id
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
}`;