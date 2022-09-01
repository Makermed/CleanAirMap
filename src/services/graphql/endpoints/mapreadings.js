export const QUERY_MAP_READINGS_BY_LOCATION = `
query map_readings_by_location (
  $location_id: Int!
) {
  readings (
    where: { 
      location_id: {_eq: $location_id}
    }
  ) {
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
}`;

export const MUTATION_INSERT_MAP_READING = `
mutation insert_map_reading(
  $location_id: Int!,
  $co2: Int,
  $ach: Int,
  $image: String,
  $comment: String,
  $mask: Int!,
  $reading_at: timestamptz,
  $reading_by: String!,
  $approved: Boolean,
  $approved_at: timestamptz,
  $approved_by: String
) {
  insert_readings(
    objects: {
      location_id: $location_id,
      co2: $co2,
      ach: $ach,
      image: $image,
      comment: $comment,
      mask: $mask,
      reading_at: $reading_at,
      reading_by: $reading_by,
      approved: $approved,
      approved_at: $approved_at,
      approved_by: $approved_by
    }
  ) {
    affected_rows
    returning {
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

export const MUTATION_UPDATE_MAP_READING = `
mutation update_map_reading(
  $id: Int!,
  $location_id: Int!,
  $co2: Int,
  $ach: Int,
  $image: String,
  $comment: String,
  $mask: Int!,
  $reading_at: timestamptz,
  $reading_by: String!,
  $approved: Boolean,
  $approved_at: timestamptz,
  $approved_by: String
) {
  update_readings(
    where: {
      id: {_eq: $id}, 
    }, 
    _set: {
      location_id: $location_id,
      co2: $co2,
      ach: $ach,
      image: $image,
      comment: $comment,
      mask: $mask,
      reading_at: $reading_at,
      reading_by: $reading_by,
      approved: $approved,
      approved_at: $approved_at,
      approved_by: $approved_by
    }
  ) {
    affected_rows
    returning {
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

export const MUTATION_APPROVE_MAP_READING = `
mutation update_map_reading(
  $id: Int!,
  $approved: Boolean!,
  $approved_at: timestamptz!,
  $approved_by: String!
) {
  update_readings(
    where: {
      id: {_eq: $id}, 
    }, 
    _set: {
      approved: $approved,
      approved_at: $approved_at,
      approved_by: $approved_by
    }
  ) {
    affected_rows
    returning {
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

export const MUTATION_DELETE_MAP_READING = `
mutation delete_map_reading(
  $id: Int!
) {
  delete_readings(
    where: { id: {_eq: $id} }
  ) {
    affected_rows
  }
}`;