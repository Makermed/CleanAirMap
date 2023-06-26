export const QUERY_ARTICLE_REPORTS_BY_ARTICLE = `
query article_reports_by_article(
  $article_id: String!
) {
  article_reports(
    where: {
      article_id: {_eq: $article_id}}
  ) {
    id
    article_id
    source_id
    report
    reported_at
    reported_by
    approved
    approved_at
    approved_by
    reported_user {
      username
    }
  }
}`;

export const QUERY_ARTICLE_REPORTS_BY_SOURCES = `
query article_reports_by_sources(
  $source_ids: [String!],
  $after: timestamptz!
) {
  article_reports(
    where: {
      reported_at: {_gte: $after},
      source_id: {_in: $source_ids},
      approved: {_eq: false},
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
    }
  }
}`;

export const MUTATION_INSERT_ARTICLE_REPORT = `
mutation insert_article_report(
    $id: uuid!,
    $article_id: String!,
    $source_id: String!,
    $report: String!,
    $reported_by: String!
) {
  insert_article_reports(
    objects: {
      id: $id, 
      article_id: $article_id,
      source_id: $source_id,
      report: $report,
      reported_by: $reported_by
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_ARTICLE_REPORTS = `
mutation delete_article_reports(
  $article_id: $String!
) {
  delete_article_reports(
    where: {
      article_id: {_eq: $article_id}
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_ARTICLE_REPORT = `
mutation delete_article_report(
  $id: uuid!
) {
  delete_article_reports(
    where: {
      id: {_eq: $id}
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_ARTICLE_REPORT = `
mutation update_article_report(
  $id: uuid!,
  $approved: Boolean!,
  $approved_by: String!,
  $approved_at: timestamptz!
) {
  update_article_reports(
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