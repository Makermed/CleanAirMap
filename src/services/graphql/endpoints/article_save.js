export const QUERY_ARTICLE_SAVE_BY_USER = `
query article_save_by_user(
  $user_id: String!
) {
  article_save(
    where: { user_id: {_eq: $user_id} },
    order_by: {saved_at: desc}
  ) {
    id
    article_id
    saved_at
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

export const QUERY_ARTICLE_SAVE = `
query article_save_by_user(
    $article_id: String!,
  $user_id: String!
) {
  article_save(
    where: { 
        user_id: {_eq: $user_id},
        article_id: {_eq: $article_id}
    }
  ) {
    id
    article_id
    saved_at
  }
}`;

export const MUTATION_INSERT_ARTICLE_SAVE = `
mutation insert_article_save(
    $article_id: String!,
    $user_id: String!
) {
  insert_article_save(
    objects: {
      article_id: $article_id,
      user_id: $user_id
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_ARTICLE_SAVE = `
mutation delete_article_save(
    $id: uuid!
) {
  delete_article_save(
    where: {
      id: {_eq: $id}
    } 
  ) {
    affected_rows
  }
}`;