export const QUERY_ARTICLE_MOVETOPS_IN_FEEDS = `
query article_movetops_in_feeds(
  $feed_ids: [String!],
) {
  article_movetops(
    where: {
      feed_id: {_in: $feed_ids}
    },
    order_by: {moved_at: asc}
  ) {
    id
    feed_id
    moved_at
    moved_by
    article {
      nid
      source_id
      title
      author
      summary
      image
      text
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

export const MUTATION_INSERT_ARTICLE_MOVETOP = `
mutation insert_article_movetop(
    $id: uuid!,
    $article_id: String!,
    $feed_id: String!,
    $moved_by: String!
) {
  insert_article_movetops(
    objects: {
      id: $id, 
      article_id: $article_id,
      feed_id: $feed_id,
      moved_by: $moved_by
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_ARTICLE_MOVETOP = `
mutation delete_article_movetop(
  $article_id: String!,
  $feed_id: String!
) {
  delete_article_movetops(
    where: {
      article_id: {_eq: $article_id},
      feed_id: {_eq: $feed_id}
    } 
  ) {
    affected_rows
  }
}`;