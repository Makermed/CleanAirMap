export const QUERY_MAP_LOCATION_BY_ID = `
query map_locations_by_id (
  $id: Int!
) {
  locations (
    where: { 
      id: {_eq: $id}
    }
  ) {
    id
    region_id
    type
    suite
    address
    postcode
    latitude
    longitude
    name
    description
    slug
    social_link
    op_readings
    op_imageupload
    op_moderation
    op_description
    op_comments
    reading_conf
    created_at
    created_by
    approved
    approved_at
    approved_by
    region {
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
    location_reports(
      where: { 
        location_id: {_eq: $id}
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
      reported_user {
        uid
        username
      }
    }
    location_moderators (
      where: {
        location_id: {_eq: $id}}
    ) {
      id
      location_id
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
    location_followers(
      where: { 
        location_id: {_eq: $id} 
      }
    ) {
      id
      user_id
      location_id
      followed_at
      user {
        uid
        name
        username
        biography
        image
      }
    }
    readings {
      id
      co2
      ach
      mask
      image
      comment
      reading_at
      reading_by
      reader {
        uid
        name
        biography 
        image
      }
    }
    location_users_banned {
      id
      banned_at
      user {
        uid
        username
        image
        biography
      }
    }
  }
}`;

export const QUERY_MAP_LOCATION_BY_SLUG = `
query map_locations_by_slug (
  $slug: String!
) {
  locations (
    where: { 
      slug: {_eq: $slug}
    }
  ) {
    id
    region_id
    type
    suite
    address
    postcode
    latitude
    longitude
    name
    description
    slug
    social_link
    op_readings
    op_imageupload
    op_moderation
    op_description
    op_comments
    reading_conf
    created_at
    created_by
    approved
    approved_at
    approved_by
    region {
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
    readings {
      id
      co2
      ach
      mask
      image
      comment
      reading_at
      reading_by
      reader {
        uid
        name
        biography 
        image
      }
    }
  }
}`;

export const QUERY_MAP_LOCATIONS_BY_BOX = `
query map_locations_by_box (
  $lng_min: Float!,
  $lng_max: Float!,
  $lat_min: Float!,
  $lat_max: Float!
) {
  locations (
    where: { 
      longitude: {_gte: $lng_min, _lte: $lng_max}, 
      latitude: {_gte: $lat_min, _lte: $lat_max}
    },
    limit: 50
  ) {
    id
    region_id
    type
    suite
    address
    postcode
    latitude
    longitude
    name
    description
    slug
    social_link
    op_readings
    op_imageupload
    op_moderation
    op_description
    op_comments
    reading_conf
    created_at
    created_by
    approved
    approved_at
    approved_by
    region {
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
    readings {
      id
      co2
      ach
      mask
      image
      comment
      reading_at
      reading_by
      reader {
        uid
        name
        biography 
        image
      }
    }
  }
}`;

export const QUERY_MAP_LOCATIONS_BY_BOX_DDAY = `
query map_locations_by_box (
  $lng_min: Float!,
  $lng_max: Float!,
  $lat_min: Float!,
  $lat_max: Float!,
  $dday: !timestamptz,
) {
  locations (
    where: { 
      longitude: {_gte: $lng_min, _lte: $lng_max}, 
      latitude: {_gte: $lat_min, _lte: $lat_max},
      created_at: {_gte: $dday}
    },
    limit: 50
  ) {
    id
    region_id
    type
    suite
    address
    postcode
    latitude
    longitude
    name
    description
    slug
    social_link
    op_readings
    op_imageupload
    op_moderation
    op_description
    op_comments
    reading_conf
    created_at
    created_by
    approved
    approved_at
    approved_by
    region {
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
    readings {
      id
      co2
      ach
      mask
      image
      comment
      reading_at
      reading_by
      reader {
        uid
        name
        biography 
        image
      }
    }
  }
}`;

export const QUERY_MAP_LOCATIONS_BY_REGION = `
query map_locations_by_region (
  $region_id: Int!
) {
  locations (
    where: { 
      region_id: {_eq: $region_id}
    }
  ) {
    id
  }
}`;

export const MUTATION_INSERT_MAP_LOCATION = `
mutation insert_map_location(
  $region_id: Int!,
  $type: Int!,
  $suite: String,
  $address: String!,
  $postcode: String,
  $latitude: Float,
  $longitude: Float,
  $name: String!,
  $description: String,
  $slug: String!,
  $social_link: String,
  $created_at: timestamptz,
  $created_by: String!,
  $approved: Boolean,
  $approved_at: timestamptz,
  $approved_by: String
) {
  insert_locations(
    objects: {
      region_id: $region_id,
      type: $type,
      suite: $suite,
      address: $address,
      postcode: $postcode,
      latitude: $latitude,
      longitude: $longitude,
      name: $name,
      description: $description,
      slug: $slug,
      social_link: $social_link,
      created_at: $created_at,
      created_by: $created_by,
      approved: $approved,
      approved_at: $approved_at,
      approved_by: $approved_by
    }
  ) {
    affected_rows
    returning {
      id
      region_id
      type
      suite
      address
      postcode
      latitude
      longitude
      name
      description
      slug
      social_link
      op_readings
      op_imageupload
      op_moderation
      op_description
      op_comments
      reading_conf
      created_at
      created_by
      approved
      approved_at
      approved_by
      region {
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
  }
}`;

export const MUTATION_UPDATE_MAP_LOCATION = `
mutation update_map_location(
  $id: Int!,
  $region_id: Int!,
  $type: Int!,
  $suite: String,
  $address: String!,
  $postcode: String,
  $latitude: Float,
  $longitude: Float,
  $name: String!,
  $description: String,
  $slug: String!,
  $social_link: String,
  $approved: Boolean,
  $approved_at: timestamptz,
  $approved_by: String
) {
  update_locations(
    where: {
      id: {_eq: $id}, 
    }, 
    _set: {
      region_id: $region_id,
      type: $type,
      suite: $suite,
      address: $address,
      postcode: $postcode,
      latitude: $latitude,
      longitude: $longitude,
      name: $name,
      description: $description,
      slug: $slug,
      social_link: $social_link,
      approved: $approved,
      approved_at: $approved_at,
      approved_by: $approved_by
    }
  ) {
    affected_rows
    returning {
      id
      region_id
      type
      suite
      address
      postcode
      latitude
      longitude
      name
      description
      slug
      social_link
      op_readings
      op_imageupload
      op_moderation
      op_description
      op_comments
      reading_conf
      created_at
      created_by
      approved
      approved_at
      approved_by
      region {
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
      readings {
        id
        co2
        ach
        mask
        image
        comment
        reading_at
        reading_by
        reader {
          uid
          name
          biography 
          image
        }
      }
    }
  }
}`;

export const MUTATION_UPDATE_MAP_LOCATION_OP_READINGS = `
mutation (
  $id: Int!,
  $readings: Boolean!
) {
  update_locations(
    where: { id: {_eq: $id} }, 
    _set: { op_readings: $readings }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_MAP_LOCATION_OP_IMAGEUPLOAD = `
mutation (
  $id: Int!,
  $imageupload: Boolean!
) {
  update_locations(
    where: { id: {_eq: $id} }, 
    _set: { op_imageupload: $imageupload }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_MAP_LOCATION_OP_MODERATION = `
mutation (
  $id: Int!,
  $moderation: Boolean!
) {
  update_locations(
    where: { id: {_eq: $id} }, 
    _set: { op_moderation: $moderation }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_MAP_LOCATION_OP_DESCRIPTION = `
mutation (
  $id: Int!,
  $description: Boolean!
) {
  update_locations(
    where: { id: {_eq: $id} }, 
    _set: { op_description: $description }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_MAP_LOCATION_OP_COMMENTS = `
mutation (
  $id: Int!,
  $comments: Boolean!
) {
  update_locations(
    where: { id: {_eq: $id} }, 
    _set: { op_comments: $comments }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_MAP_LOCATION_READINGCONF = `
mutation (
  $id: String!,
  $conf: Int!
) {
  update_locations(
    where: { id: {_eq: $id} }, 
    _set: { reading_conf: $conf }
  ) {
    affected_rows
    returning {
      id
      region_id
      type
      suite
      address
      postcode
      latitude
      longitude
      name
      description
      slug
      social_link
      op_readings
      op_imageupload
      op_moderation
      op_description
      op_comments
      reading_conf
      created_at
      created_by
      approved
      approved_at
      approved_by
      region {
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
      readings {
        id
        co2
        ach
        mask
        image
        comment
        reading_at
        reading_by
        reader {
          uid
          name
          biography 
          image
        }
      }
    }
  }
}`;

export const MUTATION_DELETE_MAP_LOCATION = `
mutation delete_map_location(
  $id: Int!
) {
  delete_locations(
    where: { id: {_eq: $id} }
  ) {
    affected_rows
  }
}`;


export const QUERY_LOCATION_MODERATION_COUNT = `
query (
  $location_id: Int!
) {
  readings_aggregate(
    where: {
      location_id: {_eq: $location_id},
      approved: {_eq: false}
    }
  ) {
    aggregate {
      count
    }
  }
  reading_reports_aggregate(
    where: { 
      location_id: {_eq: $location_id},
      approved: {_eq: false}
    }
  ) {
    aggregate {
      count
    }
  }
  article_reports_aggregate(
    where: {
      location_id: {_eq: $location_id},
      approved: {_eq: false}
    }
  ) {
    aggregate {
      count
    }
  }
  location_moderator_reports_aggregate(
    where: { 
      location_id: {_eq: $location_id},
      approved: {_eq: false}
    }
  ) {
    aggregate {
      count
    }
  }
}`;

export const QUERY_LOCATION_MODERATION_FIELDS = `
query (
  $location_id: Int!,
  $location_id_str: String!,
  $after: timestamptz!,
  $logtype: Int!
) {
  location_reports(
    where: { 
      location_id: {_eq: $location_id}
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
    reported_user {
      uid
      username
    }
  }
  readings(
    where: {
      location_id: {_eq: $location_id}
    }
  ) {
    id
    location_id
    co2
    ach
    comment
    mask
    image
    reading_at
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
  reading_reports(
    where: { 
      location_id: {_eq: $location_id}
    }
  ) {
    id
    report
    reported_at
    reported_by
    approved
    approved_at
    approved_by
    reported_user {
      uid
      username
    }
    reading{
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
  article_reports(
    where: {
      reported_at: {_gte: $after},
      location_id: {_eq: $location_id},
    }
  ) {
    id
    source_id
    location_id
    report
    reported_at
    reported_by
    approved
    approved_at
    approved_by
    reported_user {
      uid
      username
    }
    article {
      nid
      source_id
      location_id
      title
      author
      summary
      image
      text
      html
      summarized_text
      tr_title
      tr_summary
      tr_text
      translated
      branch
      country
      crawled_at
      media_url
      url
      author_image
      published
      data
      extra_data
      param1
      param2
      param3
      param4
      param5
      txt_param1
      txt_param2
      image_thumb
      author_image_thumb
      link_preview
      discussion_twitter
      discussion_reddit
      upvotes
    }
  }
  location_moderators (
    where: {
      location_id: {_eq: $location_id}}
  ) {
    id
    location_id
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
  location_followers(
    where: { 
      location_id: {_eq: $location_id} 
    }
  ) {
    id
    user_id
    location_id
    followed_at
    user {
      uid
      name
      username
      biography
      image
    }
  }
  location_moderator_reports(
    where: { 
      location_id: {_eq: $location_id}
    }
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
      uid
      username
    }
  }
  location_users_banned {
    id
    banned_at
    user {
      uid
      username
      image
      biography
    }
  }
  activitylogs (
    where: {
      type: {_eq: $logtype},
      type_id: {_eq: $location_id_str},
      logged_at: {_gte: $after}
    },
    order_by: {logged_at: desc}
  ) {
    id
    type
    type_id
    action
    object
    fromto
    reason
    logged_at
    user {
      uid
      username
    }
  }
}`;
