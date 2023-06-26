export const QUERY_READING_REPORTS_BY_READING = `
query reading_reports_by_reading(
  $reading_id: Int!
) {
  reading_reports(
    where: {
      reading_id: {_eq: $reading_id}}
  ) {
    id
    reading_id
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

export const QUERY_READING_REPORTS_BY_LOCATION = `
query reading_reports_by_location(
  $location_id: Int!,
  $after: timestamptz!
) {
  reading_reports(
    where: {
      reported_at: {_gte: $after},
      location_id: {_in: $location_id},
      approved: {_eq: false},
    }
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
    reading {
      id
      location_id
      co2
      ach
      image
      comment
      mask
      reading_at
      reading_by
      approved
      approved_at
      approved_by
      reader {
        uid
        name
        biography 
        image
      }
    }
  }
}`;


export const MUTATION_INSERT_READING_REPORT = `
mutation insert_reading_report(
    $reading_id: Int!,
    $location_id: Int,
    $report: String!,
    $reported_by: String!
) {
  insert_reading_reports(
    objects: {
      reading_id: $reading_id, 
      location_id: $location_id,
      report: $report,
      reported_by: $reported_by
    }
  ) {
    affected_rows
    returning {
      id
      reading_id
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

export const MUTATION_DELETE_READING_REPORT = `
mutation delete_reading_report(
  $id: Int!
) {
  delete_reading_reports(
    where: {
      id: {_eq: $id}
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_APPROVE_READING_REPORT = `
mutation update_reading_report(
  $id: Int!,
  $approved: Boolean!,
  $approved_by: String!,
  $approved_at: timestamptz!
) {
  update_reading_reports(
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
      reading_id
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
