import gql from 'graphql-tag';


// Source
export const QUERY_SOURCES = `
query sources{
  sources (
    where: {category_id: {_neq: "deleted"}}
  ) {
    id
    category_id
    name
    description
    slug
    image
    branch
    weblink
    translate
    translateLang
    translateAPI
    followers
    upvotes
    throttle
    disableFullText
    created_at
    created_by
    approved
    private
    last_updated
    updated_at
    socialtags {
      tag
      type
    }
  }
}
`;

export const QUERY_SOURCE_BY_ID = `
query source_by_id (
  $id: String!
) {
  sources(
    where: { id: {_eq: $id} }
  ) {
    id
    category_id
    name
    description
    slug
    image
    branch
    weblink
    translate
    translateLang
    translateAPI
    followers
    upvotes
    throttle
    disableFullText
    created_at
    created_by
    approved
    private
    last_updated
    updated_at
    socialtags {
      tag
      type
    }
  }
}`;

export const QUERY_SOURCE_BY_SLUG = `
query source_by_id (
  $slug: String!
) {
  sources(
    where: { slug: {_eq: $slug} }
  ) {
    id
    category_id
    name
    description
    slug
    image
    branch
    weblink
    translate
    translateLang
    translateAPI
    followers
    upvotes
    throttle
    disableFullText
    created_at
    created_by
    approved
    private
    last_updated
    updated_at
    socialtags {
      tag
      type
    }
  }
}`;

export const QUERY_EXIST_SOURCE_BY_SLUG = `
query source_by_id (
  $id: String!,
  $slug: String!
) {
  sources(
    where: { 
      id: {_neq: $id},
      slug: {_eq: $slug} 
    }
  ) {
    id
    category_id
    name
    description
    slug
  }
}`;

export const MUTATION_INSERT_SOURCE = `
mutation(
  $id: String!,
  $category_id: String!,
  $name: String!,
  $description: String,
  $slug: String!,
  $image: String!,
  $branch: Int!,
  $weblink: String,
  $translateLang: String!,
  $translateAPI: String,
  $translate: Boolean!,
  $frequency: Int!,
  $disableFullText: Boolean!,
  $followers: Int!,
  $created_by: String!,
  $created_at: Int!,
  $approved: Boolean!
) {
  insert_sources(
    objects: {
      id: $id, 
      category_id: $category_id,
      name: $name, 
      description: $description,
      slug: $slug,
      image: $image,
      branch: $branch,
      weblink: $weblink,
      translateLang: $translateLang,
      translateAPI: $translateAPI,
      translate: $translate,
      frequency: $frequency,  
      disableFullText: $disableFullText,
      followers: $followers,
      created_by: $created_by,
      created_at: $created_at,
      approved: $approved,
      updated_at: $created_at
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_SOURCE = `
mutation (
  $id: String!,
  $category_id: String!,
  $name: String!,
  $description: String,
  $slug: String!,
  $image: String!,
  $branch: Int!,
  $weblink: String,
  $translateLang: String!,
  $translateAPI: String,
  $translate: Boolean!,
  $disableFullText: Boolean!,
  $followers: Int!,
  $created_by: String!,
  $created_at: Int!,
  $approved: Boolean!,
  $updated_at: Int
) {
  update_sources(
    where: {
      id: {_eq: $id}
    }, 
    _set: {
      category_id: $category_id,
      name: $name, 
      description: $description,
      slug: $slug,
      image: $image,
      branch: $branch,
      weblink: $weblink,
      translateLang: $translateLang,
      translateAPI: $translateAPI,
      translate: $translate,
      disableFullText: $disableFullText,
      followers: $followers,
      created_by: $created_by,
      created_at: $created_at,
      approved: $approved,
      updated_at: $updated_at
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETE_SOURCE = `
mutation (
  $id: String!
) {
  delete_sources(
    where: {
      id: {_eq: $id}
    } 
  ) {
    affected_rows
  }
}`;

// export const MUTATION_DELETE_SOURCE = `
// mutation (
//   $id: String!
// ) {
//   update_sources(
//     where: { id: {_eq: $id} },
//     _set: { category_id: "deleted" }  
//   ) {
//     affected_rows
//   }
// }`;

export const MUTATION_UPDATE_SOURCE_FOLLOWERS = `
mutation update_source_followers(
  $id: String!,
  $followers: Int!
) {
  update_sources(
    where: {
      id: {_eq: $id}
    }, 
    _set: {
      followers: $followers
    }
  ) {
    affected_rows
  }
}`;

export const QUERY_SOURCE_VOTER = `
query source_voter(
  $source_id: String!,
  $user_id: String!
) {
  source_voter(
    where: {
      source_id: {_eq: $source_id},
      user_id: {_eq: $user_id} 
    }
  ) {
    id
  }
}`;

export const MUTATION_SOURCE_INC_UPVOTES = `
mutation source_inc_upvotes(
  $source_id: String!,
  $user_id: String!,
) {
  update_sources(
    where: {
      id: {_eq: $source_id}
    },
    _inc: {upvotes: 1}
  ) {
    affected_rows
    returning {
      upvotes
    }
  }

  insert_source_voter(
    objects: {
      source_id: $source_id, 
      user_id: $user_id
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_SOURCE_DEC_UPVOTES = `
mutation source_dec_upvotes(
  $source_id: String!,
  $user_id: String!,
) {
  update_sources(
    where: {
      id: {_eq: $source_id}
    },
    _inc: {upvotes: -1}
  ) {
    affected_rows
    returning {
      upvotes
    }
  }
  
  delete_source_voter(
    where: {
      source_id: {_eq: $source_id}, 
      user_id: {_eq: $user_id}
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_UPDATE_SOURCE_THROTTLE = `
mutation update_source_throttle(
  $id: String!,
  $throttle: Int!
) {
  update_sources(
    where: {
      id: {_eq: $id}
    }, 
    _set: {
      throttle: $throttle
    }
  ) {
    affected_rows
    returning {
      id
      category_id
      name
      description
      slug
      image
      branch
      weblink
      translate
      translateLang
      translateAPI
      followers
      disableFullText
      created_at
      created_by
      approved
      private
      upvotes
      throttle
      last_updated
      updated_at
      socialtags {
        tag
        type
      }
    }
  }
}`;


export const MUTATION_UPDATE_SOURCE_LASTUPDATED = `
mutation update_source_hasarticle(
  $id: String!,
  $last_updated: timestamptz!
) {
  update_sources(
    where: {
      id: {_eq: $id}
    }, 
    _set: {
      last_updated: $last_updated
    }
  ) {
    affected_rows
    returning {
      id
      category_id
      name
      description
      slug
      image
      branch
      weblink
      translate
      translateLang
      translateAPI
      followers
      disableFullText
      created_at
      created_by
      approved
      private
      upvotes
      throttle
      last_updated
      updated_at
      socialtags {
        tag
        type
      }
    }
  }
}`;


export const SUBSCRIPTION_SOURCES = gql`
subscription SourceSubscription {
  sources (
    where: {category_id: {_neq: "deleted"}}
  ){
    id
    category_id
    name
    description
    slug
    image
    branch
    weblink
    translate
    translateLang
    translateAPI
    followers
    upvotes
    throttle
    disableFullText
    created_at
    created_by
    approved
    private
    last_updated
    updated_at
    socialtags {
      tag
      type
    }
  }
}
`;