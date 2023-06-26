export const QUERY_COMMENT_REPORTS_BY_COMMENT = `
query comment_reports_by_comment(
  $comment_id: Int!
) {
  comment_reports(
    where: {
      comment_id: {_eq: $comment_id}}
  ) {
    id
    comment_id
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

export const MUTATION_INSERT_COMMENT_REPORT = `
mutation insert_comment_report(
    $id: uuid!,
    $comment_id: Int!,
    $report: String!,
    $reported_by: String!
) {
  insert_comment_reports(
    objects: {
      id: $id, 
      comment_id: $comment_id,
      report: $report,
      reported_by: $reported_by
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_COMMENT_REPORT = `
mutation delete_comment_report(
  $id: uuid!
) {
  delete_comment_reports(
    where: {
      id: {_eq: $id}
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_COMMENT_REPORT = `
mutation update_comment_report(
  $id: uuid!,
  $approved: Boolean!,
  $approved_by: String!,
  $approved_at: timestamptz!
) {
  update_comment_reports(
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