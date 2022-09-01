export const QUERY_TRENDING_SOURCES = `
query sources {
  sources(
    where: {category_id: {_eq: "trending"}},
    order_by: {created_at: asc}
  ) {
    id
    category_id
    name
    description
    slug
    image
    branch
    translate
    translateLang
    translateAPI
    followers
    upvotes
    throttle
    disableFullText
    last_updated
    created_at
    created_by
    approved
    private
    socialtags {
      tag
      type
    }
  }
}`;

export const QUERY_TRENDING_ARTICLES_OF_BRANCH = `
query articles_eq_branch(
  $branch: Int!,
  $source_ids: [String!],
  $last_time : Int!
) {
  articles(
    where: {
      branch: {_eq: $branch},
      crawled_at: {_gte: $last_time},
      source_id: {_in: $source_ids}
    },
    order_by: {crawled_at: asc},
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
}`;


export const QUERY_TRENDING_ARTICLES_OF_BRANCH_COUNTRY = `
query newspapers_eq_country_in_sources(
  $country: Int!,
  $branch: Int!,
  $source_ids: [String!],
  $last_time : Int!
) {
  articles(
    where: {
      branch: {_eq: $branch},
      country: {_eq: $country},
      crawled_at: {_gte: $last_time},
      source_id: {_in: $source_ids}
    },
    order_by: {crawled_at: asc}
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
}`;