export const QUERY_FEED_REPORTS_BY_FEED = `
query feed_reports_by_feed(
  $feed_id: String!
) {
  feed_reports(
    where: {
      feed_id: {_eq: $feed_id}}
  ) {
    id
    feed_id
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

export const MUTATION_INSERT_FEED_REPORT = `
mutation insert_feed_report(
    $id: uuid!,
    $feed_id: String!,
    $report: String!,
    $reported_by: String!
) {
  insert_feed_reports(
    objects: {
      id: $id, 
      feed_id: $feed_id, 
      report: $report,
      reported_by: $reported_by
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_FEED_REPORT = `
mutation delete_feed_report(
  $id: uuid!
) {
  delete_feed_reports(
    where: {
      id: {_eq: $id}
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_FEED_REPORT = `
mutation update_feed_report(
  $id: uuid!,
  $approved: Boolean!,
  $approved_by: String!,
  $approved_at: timestamptz!
) {
  update_feed_reports(
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