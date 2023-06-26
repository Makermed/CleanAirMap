export const QUERY_SOURCE_REPORTS_BY_SOURCE = `
query source_reports_by_source(
  $source_id: String!
) {
  source_reports(
    where: { source_id: {_eq: $source_id} }
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
  }
}`;

export const QUERY_SOURCE_REPORTS_BY_SOURCES = `
query source_reports_by_sources(
  $source_ids: [String!]
) {
  source_reports(
    where: { 
      source_id: {_in: $source_ids},
      approved: {_eq: false}
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
  }
}`;

export const MUTATION_INSERT_SOURCE_REPORT = `
mutation insert_source_report(
    $id: uuid!,
    $source_id: String!,
    $report: String!,
    $reported_by: String!
) {
  insert_source_reports(
    objects: {
      id: $id, 
      source_id: $source_id, 
      report: $report,
      reported_by: $reported_by
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_SOURCE_REPORTS = `
mutation delete_source_reports(
  $source_id: String!
) {
  delete_source_reports(
    where: {
      source_id: {_eq: $source_id}
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_SOURCE_REPORT = `
mutation delete_source_report(
  $id: uuid!
) {
  delete_source_reports(
    where: {
      id: {_eq: $id}
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_SOURCE_REPORT = `
mutation update_source_report(
  $id: uuid!,
  $approved: Boolean!,
  $approved_by: String!,
  $approved_at: timestamptz!
) {
  update_source_reports(
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