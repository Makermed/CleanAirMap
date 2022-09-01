export const QUERY_MAP_REGIONS = `
query map_regions {
  region {
    id
    place
    locality
    district
    region
    country
    slug
    created_at
    created_by
    locations(where: {approved: {_eq: false}}) {
      id
      name
      slug
      region_id
    }
    locations_aggregate(where: {approved: {_eq: true}}) {
      aggregate {
        count
      }
      nodes {
        id
        latitude
        longitude
      }
    }
    region_moderators {
      id
      region_id
      created_at
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
}`;

export const QUERY_MAP_REGION_BY_ID = `
query map_region_by_id (
  $id: Int!
) {
  region (
    where: { 
      id: {_eq: $id}
    }
  ) {
    id
    locality
    place
    district
    region
    country
    slug
    created_at
    created_by
    locations {
      id
      name
      type
      suite
      address
      created_at
      approved
      user {
        uid
        name
        username
        biography
        image
      }
      location_followers_aggregate {
        aggregate {
          count
        }
      }
      readings(order_by: {reading_at: desc}, limit: 1) {
        reading_at
      }
      notifications
      notif_date      
    }
    region_moderators {
      id
      region_id
      created_at
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
}`;

export const QUERY_MAP_REGION_BY_SLUG = `
query map_region_by_slug (
  $slug: String!
) {
  region (
    where: { 
      slug: {_eq: $slug}
    }
  ) {
    id
    locality
    place
    district
    region
    country
    slug
    created_at
    created_by
    locations {
      id
      name
      type
      suite
      address
      created_at
      approved
      user {
        uid
        name
        username
        biography
        image
      }
      notifications
      notif_date      
    }
    region_moderators {
      id
      region_id
      created_at
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
}`;

export const MUTATION_INSERT_MAP_REGION = `
mutation insert_map_region(
  $locality: String,
  $place: String,
  $district: String,
  $region: String,
  $country: String!,
  $slug: String!,
  $created_at: timestamptz,
  $created_by: String!
) {
  insert_region(
    objects: {
      locality: $locality,
      place: $place,
      district: $district,
      region: $region,
      country: $country,
      slug: $slug,
      created_at: $created_at,
      created_by: $created_by
    }
  ) {
    affected_rows
    returning {
      id
      locality
      place
      district
      region
      country
      slug
      created_at
      created_by
    }
  }
}`;

export const MUTATION_DELETE_MAP_REGION = `
mutation delete_map_region(
  $id: Int!
) {
  delete_region(
    where: { id: {_eq: $id} }
  ) {
    affected_rows
  }
}`;

export const MUTATION_INSERT_REGION_MODERATOR = `
mutation insert_region_moderator(
  $region_id: Int!,
  $user_id: String!,
  $approved: Boolean,
  $approved_by: String,
  $approved_at: timestamptz
) {
  insert_region_moderators(
    objects: {
      region_id: $region_id,
      user_id: $user_id,
      approved: $approved,
      approved_by: $approved_by,
      approved_at: $approved_at
    }
  ) {
    affected_rows
    returning {
      id
      region_id
      created_at
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
}`;

export const MUTATION_APPROVE_REGION_MODERATOR = `
mutation approve_region_moderator(
  $id: Int!,
  $approved: Boolean!,
  $approved_by: String!,
  $approved_at: timestamptz!
) {
  update_region_moderators(
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
      region_id
      created_at
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
}`;

export const MUTATION_DELETE_REGION_MODERATOR = `
mutation delete_region_moderator(
  $id: Int!
) {
  delete_region_moderators(
    where: {
      id: {_eq: $id}
    }
  ) {
    affected_rows
    returning {
      id
      region_id
      created_at
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
}`;