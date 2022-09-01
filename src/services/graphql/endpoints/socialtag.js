// Socialtag
export const MUTATION_INSERT_SOCIALTAG = `
mutation(
  $id: String!,
  $tag: String!,
  $type: String!
) {
  insert_socialtags(
    objects: {
      id: $id, 
      tag: $tag, 
      type: $type
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_SOCIALTAG = `
mutation (
  $id: String!,
  $tag: String!,
  $type: String!
) {
  update_socialtags(
    where: {
      id: {_eq: $id}
    }, 
    _set: {
      tag: $tag, 
      type: $type
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_SOCIALTAG = `
mutation (
  $id: String!
) {
  delete_socialtags(
    where: {
      id: {_eq: $id}
    } 
  ) {
    affected_rows
  }
}`;