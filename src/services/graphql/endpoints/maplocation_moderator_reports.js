export const QUERY_MAPLOCATION_MODERATOR_REPORTS_BY_LOCATION = `
query maplocation_moderator_reports_by_location(
  $location_id: Int!
) {
  location_moderator_reports(
    where: { location_id: {_eq: $location_id} }
  ) {
    id
    moderator_id
    location_id
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

export const MUTATION_INSERT_MAPLOCATION_MODERATOR_REPORT = `
mutation insert_maplocation_moderator_report(
    $id: uuid!,
    $moderator_id: String!,
    $location_id: Int!
    $report: String!,
    $reported_by: String!
) {
  insert_location_moderator_reports(
    objects: {
      id: $id, 
      moderator_id: $moderator_id, 
      location_id: $location_id,
      report: $report,
      reported_by: $reported_by
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_MAPLOCATION_MODERATOR_REPORTS = `
mutation delete_maplocation_moderator_reports(
  $location_id: Int!,
  $moderator_id: String!
) {
  delete_location_moderator_reports(
    where: {
      location_id: {_eq: $location_id}
      moderator_id: {_eq: $moderator_id}
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_MAPLOCATION_MODERATOR_REPORT = `
mutation delete_maplocation_moderator_report(
  $id: uuid!
) {
  delete_location_moderator_reports(
    where: {
      id: {_eq: $id}
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_MAPLOCATION_MODERATOR_REPORT = `
mutation update_maplocation_moderator_report(
  $id: uuid!,
  $approved: Boolean!,
  $approved_by: String!,
  $approved_at: timestamptz!
) {
  update_location_moderator_reports(
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