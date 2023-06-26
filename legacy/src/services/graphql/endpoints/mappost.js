export const QUERY_MAPPOST_BY_NID = `
query mappost_by_nid(
  $nid: String!
) {
  articles(
    where: {
      nid: {_eq: $nid}
    }
  ) {
    nid
    source_id
    location_id
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
  }
}`;

export const QUERY_MAPPOSTS_BY_LOCATION = `
query articles(
  $location_id: Int!,
  $pagesize: Int!,
  $offset: Int!
) {
  articles(
    where: {
      location_id: {_eq: $location_id}
    },
    order_by: {published: desc},
    limit: $pagesize,
    offset: $offset
  ) {
    nid
    source_id
    location_id
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
  }
}`;
