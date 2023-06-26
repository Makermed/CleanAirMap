export const QUERY_MODERATOR_REPORTS_BY_FEED = `
query moderator_reports_by_feed(
  $feed_id: String!
) {
  moderator_reports(
    where: { feed_id: {_eq: $feed_id} }
  ) {
    id
    moderator_id
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

export const MUTATION_INSERT_MODERATOR_REPORT = `
mutation insert_moderator_report(
    $id: uuid!,
    $moderator_id: String!,
    $feed_id: String!
    $report: String!,
    $reported_by: String!
) {
  insert_moderator_reports(
    objects: {
      id: $id, 
      moderator_id: $moderator_id, 
      feed_id: $feed_id,
      report: $report,
      reported_by: $reported_by
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_MODERATOR_REPORTS = `
mutation delete_moderator_report(
  $feed_id: String!,
  $moderator_id: String!
) {
  delete_moderator_reports(
    where: {
      feed_id: {_eq: $feed_id},
      moderator_id: {_eq: $moderator_id}
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_MODERATOR_REPORT = `
mutation delete_moderator_report(
  $id: uuid!
) {
  delete_moderator_reports(
    where: {
      id: {_eq: $id}
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_MODERATOR_REPORT = `
mutation update_moderator_report(
  $id: uuid!,
  $approved: Boolean!,
  $approved_by: String!,
  $approved_at: timestamptz!
) {
  update_moderator_reports(
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