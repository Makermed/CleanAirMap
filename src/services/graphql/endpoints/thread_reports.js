export const QUERY_THREAD_REPORT_BY_THREAD = `
query thread_reports_by_thread(
  $thread_id: Int!
) {
  thread_reports(
    where: {
      thread_id: {_eq: $thread_id}}
  ) {
    id
    report
    reported_at
    reported_by
    approved
    approved_at
    approved_by
    reported_user {
      username
    }
    thread {
      id
      title
      text
      type
      poster {
        uid
        username
        image
      }
      posted_at
      approved
      upvotes
      feed_id
      closed
      article {
        nid
        source {
          id
          name
          image
        }
        comments_aggregate(where: {approved: {_eq: $approved}}) {
          aggregate {
            count
          }
        }
      }
      comments_aggregate(where: {approved: {_eq: $approved}}) {
        aggregate {
          count
        }
      }
    }
  }
}`;

export const MUTATION_INSERT_THREAD_REPORT = `
mutation insert_thread_report(
    $feed_id: String!,
    $thread_id: Int!,
    $report: String!,
    $reported_by: String!
) {
  insert_thread_reports(
    objects: {
      feed_id: $feed_id,
      thread_id: $thread_id,
      report: $report,
      reported_by: $reported_by
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_THREAD_REPORT = `
mutation delete_thread_report(
  $id: uuid!
) {
  delete_thread_reports(
    where: {
      id: {_eq: $id}
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_APPROVE_THREAD_REPORT = `
mutation approve_thread_report(
  $id: uuid!,
  $approved: Boolean!,
  $approved_by: String!,
  $approved_at: timestamptz!
) {
  update_thread_reports(
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