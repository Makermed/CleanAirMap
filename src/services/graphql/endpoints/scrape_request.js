export const QUERY_SCRAPE_REQUEST = `
query scrape_request {
  scrape_request(
    order_by: {requested_at: asc}
  ) {
    id
    name
    description
    image
    link
    category_id
    feed_id
    requested_by
    requested_at
    status
  }
}`;

export const MUTATION_INSERT_SCRAPE_REQUEST = `
mutation insert_scrape_request(
    $name: String!,
    $description: String!,
    $image: String,
    $link: String,
    $category_id: String!,
    $feed_id: String,
    $requested_by: String!,
    $requested_at: Int!,
    $status: Int!
) {
  insert_scrape_request(
    objects: {
      name: $name, 
      description: $description,
      image: $image,
      link: $link,
      category_id: $category_id,
      feed_id: $feed_id,
      requested_by: $requested_by,
      requested_at: $requested_at,
      status: $status
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_SCRAPE_REQUEST = `
mutation (
  $id: Int!,
  $name: String!,
  $description: String!,
  $image: String,
  $link: String,
  $category_id: String!,
  $feed_id: String,
  $requested_by: String!,
  $requested_at: Int!,
  $status: Int!
) {
  update_scrape_request (
    where: {
      id: {_eq: $id}
    }, 
    _set: {
      $name: String!,
      $description: String!,
      $image: String,
      $link: String,
      $category_id: String!,
      $feed_id: String,
      $requested_by: String!,
      $requested_at: Int!,
      $status: Int!
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_SCRAPE_REQUEST = `
mutation delete_scrape_request(
  $id: Int!
) {
  delete_scrape_request(
    where: {
      id: {_eq: $id}
    }
  ) {
    affected_rows
  }
}`;