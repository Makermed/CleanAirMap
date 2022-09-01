export const QUERY_FEED_SOURCES_BY_FEED = `
query feed_sources_by_feed(
  $feed_id: String!
) {
  feed_sources(
    where: {
      feed_id: {_eq: $feed_id}}
  ) {
    id
    feed_id
    source_id
    keyword_filter
    created_at
    created_by
    approved
    approved_at
    approved_by
  }
}`;

export const MUTATION_INSERT_FEED_SOURCES = `
mutation insert_feed_sources(
  $objects: [feed_sources_insert_input!]!
) {
  insert_feed_sources(
    objects: $objects
  ) {
    affected_rows
    returning {
      feed {
        feed_sources {
          id
          feed_id
          source_id
          keyword_filter
          approved
          create_user {
            uid
            username
          }
          source {
            id
            branch
            throttle
            has_articles
            last_updated
          }
        }
      }
    }
  }
}`;

export const MUTATION_DELETE_FEED_SOURCE = `
mutation delete_feed_source(
  $feed_id: String!,
  $source_id: String!
) {
  delete_feed_sources(
    where: {
      feed_id: {_eq: $feed_id},
      source_id: {_eq: $source_id}
    }
  ) {
    affected_rows
    returning {
      feed {
        feed_sources {
          id
          feed_id
          source_id
          keyword_filter
          approved
          create_user {
            uid
            username
          }
          source {
            id
            branch
            throttle
            has_articles
            last_updated
          }
        }
      }
    }
  }
}`;

export const MUTATION_UPDATE_FEED_SOURCE = `
mutation update_feed_source(
  $id: uuid!,
  $source_id: String!,
  $approved: Boolean!,
  $approved_by: String!,
  $approved_at: timestamptz!
) {
  update_feed_sources(
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

  update_sources(
    where: {
      id: {_eq: $source_id}
    },
    _set: {
      approved: $approved
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_FEED_SOURCE_KEYWORD = `
mutation update_feed_source_keyword(
  $feed_id: String!,
  $source_id: String!,
  $keyword: String!
) {
  update_feed_sources(
    where: {
      feed_id: {_eq: $feed_id},
      source_id: {_eq: $source_id}
    }, 
    _set: {
      keyword_filter: $keyword
    }
  ) {
    affected_rows
    returning {
      feed {
        feed_sources {
          id
          feed_id
          source_id
          keyword_filter
          approved
          create_user {
            uid
            username
          }
          source {
            id
            branch
            throttle
            has_articles
            last_updated
          }
        }
      }
    }
  }
}`;