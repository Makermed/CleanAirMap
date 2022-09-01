export const QUERY_ARTICLE_PINS_IN_FEEDS = `
query article_pins_in_feeds(
  $feed_ids: [String!]
) {
  article_pins(
    where: {
      feed_id: {_in: $feed_ids}
    },
    order_by: {pinned_at: asc}
  ) {
    id
    feed_id
    pinned_at
    pinned_by
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

export const MUTATION_INSERT_ARTICLE_PIN = `
mutation insert_article_pin(
    $id: uuid!,
    $article_id: String!,
    $feed_id: String!,
    $pinned_by: String!
) {
  insert_article_pins(
    objects: {
      id: $id, 
      article_id: $article_id,
      feed_id: $feed_id,
      pinned_by: $pinned_by
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_ARTICLE_PIN = `
mutation delete_article_pin(
  $article_id: String!,
  $feed_id: String!
) {
  delete_article_pins(
    where: {
      article_id: {_eq: $article_id},
      feed_id: {_eq: $feed_id}
    } 
  ) {
    affected_rows
  }
}`;