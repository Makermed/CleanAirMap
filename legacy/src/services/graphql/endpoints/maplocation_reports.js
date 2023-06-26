export const QUERY_LOCATION_REPORTS_BY_LOCATION = `
query location_reports_by_location(
  $location_id: Int!
) {
  location_reports(
    where: {
      location_id: {_eq: $location_id}}
  ) {
    id
    location_id
    report
    reported_at
    reported_by
    approved
    approved_at
    approved_by
    reporter {
      username
    }
  }
}`;

export const MUTATION_INSERT_LOCATION_REPORT = `
mutation insert_location_report(
    $location_id: Int!,
    $report: String!,
    $reported_by: String!
) {
  insert_location_reports(
    objects: {
      location_id: $location_id, 
      report: $report,
      reported_by: $reported_by
    }
  ) {
    affected_rows
    returning {
      id
      location_id
      report
      reported_at
      reported_by
      approved
      approved_at
      approved_by
      reporter {
        username
      }
    }
  }
}`;

export const MUTATION_DELETE_LOCATION_REPORT = `
mutation delete_location_report(
  $id: Int!
) {
  delete_location_reports(
    where: {
      id: {_eq: $id}
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_APPROVE_LOCATION_REPORT = `
mutation update_location_report(
  $id: Int!,
  $approved: Boolean!,
  $approved_by: String!,
  $approved_at: timestamptz!
) {
  update_location_reports(
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
    returning {
      id
      location_id
      report
      reported_at
      reported_by
      approved
      approved_at
      approved_by
      reporter {
        username
      }
    }
  }
}`;
