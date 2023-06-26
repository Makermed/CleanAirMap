export const QUERY_CATEGORY_MODERATION_FIELDS = `
query (
  $category_id: String!,
  $category_feed_ids: [String!]!,
  $logtype: Int!,
  $after: timestamptz!
) {
  category_moderators_aggregate(
    where: {
      category_id: {_eq: $category_id},
      approved: {_eq: false}
    }
  ) {
    aggregate {
      count
    }
    nodes {
      id
      category_id
      created
      approved
      approved_at
      approved_by
      user {
        uid
        name
        username
        biography
        image
      }
    }
  }  

  feed_reports_aggregate(
    where: { 
      feed_id: {_in: $category_feed_ids},
    }
  ) {
    aggregate {
      count
    }
    nodes {
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
  }
  activitylogs_aggregate (
    where: {
      type: {_eq: $logtype},
      type_id: {_eq: $category_id},
      logged_at: {_gte: $after},
    },
    order_by: {logged_at: desc}
  ) {
    aggregate {
      count
    }
    nodes {
      id
      type
      type_id
      action
      object
      fromto
      reason
      logged_at
      user {
        username
      }
    }
  }
}`;

export const QUERY_CATEGORY_MODERATION_COUNT = `
query (
  $category_id: String!,
  $category_feed_ids: [String!]!
) {
  category_moderators_aggregate(
    where: {
      category_id: {_eq: $category_id}, 
      approved: {_eq: false}
    }
  ) {
    aggregate {
      count
    }
  }
  feeds_aggregate(
    where: {
      category_id: {_eq: $category_id}, 
      approved: {_eq: false}
    }
  ) {
    aggregate {
      count
    }
  }  
  feed_reports_aggregate(
    where: { 
      feed_id: {_in: $category_feed_ids},
      approved: {_eq: false}
    }
  ) {
    aggregate {
      count
    }
  }
}`;

export const MUTATION_UPDATE_CATEGORY_LASTVIEWLOG = `
mutation (
  $id: String!,
  $viewtime: timestamptz!
) {
  update_categories(
    where: { id: {_eq: $id} },
    _set: { last_viewlog: $viewtime }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_CATEGORY_NOTIFICATIONS = `
mutation (
  $id: String!,
  $notifications: Int!
) {
  update_categories(
    where: {
      id: {_eq: $id}
    }, 
    _set: {
      notifications: $notifications
    }
  ) {
    affected_rows
  }
}`;