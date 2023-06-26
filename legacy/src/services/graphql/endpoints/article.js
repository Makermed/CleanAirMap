export const QUERY_ARTICLE_BY_NID = `
query article_by_nid(
  $nid: String!
) {
  articles(
    where: {
      nid: {_eq: $nid}
    }
  ) {
    nid
    source_id
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
    comments_aggregate {
      aggregate {
        count
      }
    }
  }
}`;

export const QUERY_ARTICLES = `
query articles(
  $pagesize: Int!,
  $offset: Int!
) {
  articles(
    order_by: {published: desc},
    limit: $pagesize,
    offset: $offset
  ) {
    nid
    source_id
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
    comments_aggregate {
      aggregate {
        count
      }
    }
  }
}`;

export const QUERY_NEWSPAPERS_EQ_COUNTRY = `
query newspapers_eq_country(
  $country: Int!,
  $pagesize: Int!,
  $offset: Int!
) {
  articles(
    where: {
      country: {_eq: $country}
    },
    order_by: {published: desc},
    limit: $pagesize,
    offset: $offset
  ) {
    nid
    source_id
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
    comments_aggregate {
      aggregate {
        count
      }
    }
  }
}`;

export const QUERY_ARTICLES_EQ_BRANCH = `
query articles_eq_branch(
  $branch: Int!,
  $pagesize: Int!,
  $offset: Int!
) {
  articles(
    where: {
      branch: {_eq: $branch}
    },
    order_by: {published: desc},
    limit: $pagesize,
    offset: $offset
  ) {
    nid
    source_id
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
    comments_aggregate {
      aggregate {
        count
      }
    }
  }
}`;

export const QUERY_ARTICLES_EQ_SOURCE = `
query articles_eq_source(
  $source_id: String!,
  $pagesize: Int!,
  $offset: Int!
) {
  articles(
    where: {
      source_id: {_eq: $source_id}
    },
    order_by: {published: desc},
    limit: $pagesize,
    offset: $offset
  ) {
    nid
    source_id
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
    comments_aggregate {
      aggregate {
        count
      }
    }
  }
}`;

export const QUERY_ARTICLES_IN_SOURCES = `
query articles_in_sources(
  $source_ids: [String!],
  $pagesize: Int!,
  $offset: Int!
) {
  articles(
    where: {
      source_id: {_in: $source_ids}
    }, 
    order_by: {published: desc},
    limit: $pagesize, 
    offset: $offset
  ) {
    nid
    source_id
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
    comments_aggregate {
      aggregate {
        count
      }
    }
  }
}`;


// Hasura function
// CREATE FUNCTION articles_in_sources(source_ids text[])
// RETURNS SETOF articles AS $$
//     SELECT *
//     FROM articles
//     WHERE
//       source_id = ANY (source_ids)
// $$ LANGUAGE sql STABLE;

export const QUERY_ARTICLES_IN_SOURCES_BYFUNC = (source_ids, pagesize, offset) => {
  return `
  query articles_in_sources {
    articles_in_sources_aggregate(
      args: {
        source_ids: "{${source_ids.join(",")}}",
      }, 
      order_by: {published: desc},
      limit: ${pagesize}, 
      offset: ${offset}
    ) {
      nodes {
        nid
        source_id
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
        comments_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }`;
};


export const QUERY_ARTICLES_IN_SOURCES_OF_BRANCH = `
query articles_in_sources_of_branch(
  $branch: Int!,
  $source_ids: [String!],
  $pagesize: Int!,
  $offset: Int!
) {
  articles(
    where: {
      branch: {_eq: $branch},
      source_id: {_in: $source_ids}
  	}, 
    order_by: {published: desc},
    limit: $pagesize, 
    offset: $offset
  ) {
    nid
    source_id
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
    comments_aggregate {
      aggregate {
        count
      }
    }
  }
}`;


// Hasura function
// CREATE FUNCTION articles_in_sources_of_branch(article_branch integer, source_ids text[])
// RETURNS SETOF articles AS $$
//     SELECT *
//     FROM articles
//     WHERE
//         branch = article_branch AND source_id = ANY (source_ids)
// $$ LANGUAGE sql STABLE;
export const QUERY_ARTICLES_IN_SOURCES_OF_BRANCH_BYFUNC = (branch, source_ids, pagesize, offset) => {
  return `
  query articles_in_sources_of_branch {
    articles_in_sources_of_branch_aggregate(
      args: {
        article_branch: ${branch},
        source_ids: "{${source_ids.join(",")}}",
      }, 
      order_by: {published: desc},
      limit: ${pagesize}, 
      offset: ${offset}
    ) {
      nodes {
        nid
        source_id
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
        comments_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }`;
};


export const QUERY_NEWSPAPERS_IN_SOURCES_OF_COUNTRY = `
query newspapers_eq_country_in_sources(
  $country: Int!,
  $source_ids: [String!],
  $pagesize: Int!,
  $offset: Int!  
) {
  articles(
    where: {
      country: {_eq: $country},
      source_id: {_in: $source_ids}
    },
    order_by: {published: desc},
    limit: $pagesize,
    offset: $offset
  ) {
    nid
    source_id
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
    comments_aggregate {
      aggregate {
        count
      }
    }
  }
}`;



// Hasura function
// CREATE FUNCTION articles_in_sources_of_country(article_country integer, source_ids text[])
// RETURNS SETOF articles AS $$
//     SELECT *
//     FROM articles
//     WHERE
//         country = article_country AND source_id = ANY (source_ids)
// $$ LANGUAGE sql STABLE;
export const QUERY_ARTICLES_IN_SOURCES_OF_COUNTRY_BYFUNC = (country, source_ids, pagesize, offset) => {
  return `
  query articles_in_sources_of_country {
    articles_in_sources_of_country_aggregate(
      args: {
        article_country: ${country},
        source_ids: "{${source_ids.join(",")}}",
      }, 
      order_by: {published: desc},
      limit: ${pagesize}, 
      offset: ${offset}
    ) {
      nodes {
        nid
        source_id
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
        comments_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }`;
};

export const MUTATION_DELETE_ARTICLE = `
mutation (
  $nid: String!
) {
  delete_articles(
    where: {
      nid: {_eq: $nid}
    } 
  ) {
    affected_rows
  }
}`;

export const QUERY_ARTICLE_VOTER = `
query article_voter(
  $article_id: String!,
  $user_id: String!
) {
  article_voter(
    where: {
      article_id: {_eq: $article_id},
      user_id: {_eq: $user_id} 
    }
  ) {
    id
  }
}`;

export const MUTATION_ARTICLE_INC_UPVOTES = `
mutation article_inc_upvotes(
  $article_id: String!,
  $user_id: String!,
) {
  update_articles(
    where: {
      id: {_eq: $article_id}
    },
    _inc: {upvotes: 1}
  ) {
    affected_rows
    returning {
      upvotes
    }
  }

  insert_article_voter(
    objects: {
      article_id: $article_id, 
      user_id: $user_id
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_ARTICLE_DEC_UPVOTES = `
mutation article_dec_upvotes(
  $article_id: String!,
  $user_id: String!,
) {
  update_articles(
    where: {
      id: {_eq: $article_id}
    },
    _inc: {upvotes: -1}
  ) {
    affected_rows
    returning {
      upvotes
    }
  }
  
  delete_article_voter(
    where: {
      article_id: {_eq: $article_id}, 
      user_id: {_eq: $user_id}
    }
  ) {
    affected_rows
  }
}`;

// insert article mutation for user post
// param1 : approved (0: non-approved(default), 1: approved)
export const MUTATION_INSERT_USERPOST = `
mutation insert_userpost (
  $nid: String!,
  $source_id: String!,
  $author: String,
  $title: String,
  $summary: String,
  $text: String,
  $branch: Int!,
  $url: String,
  $author_image: String,
  $published: Int!,
  $param1: Int,
  $param2: Int,
  $txt_param1: String,
  $link_preview: jsonb
) {
  insert_articles(
    objects: {
      nid: $nid,
      source_id: $source_id,
      author: $author,
      title: $title,
      summary: $summary,
      text: $text,
      branch: $branch,
      url: $url,
      author_image: $author_image,
      published: $published,
      param1: $param1,
      param2: $param2,
      txt_param1: $txt_param1,
      link_preview: $link_preview,
    }
  ) {
    affected_rows
    returning {
      nid
      source_id
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
      comments_aggregate {
        aggregate {
          count
        }
      }
    }
  }
}`;

export const MUTATION_UPDATE_USERPOST = `
mutation upate_userpost (
  $nid: String!,
  $summary: String!,
  $text: String!,
  $published: Int!,
  $link_preview: jsonb
) {
  update_articles(
    where: {
      nid: {_eq: $nid}
    },
    _set: {
      summary: $summary,
      text: $text,
      published: $published,
      link_preview: $link_preview
    }
  ) {
    affected_rows
    returning {
      nid
      source_id
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
      comments_aggregate {
        aggregate {
          count
        }
      }
    }
  }
}`;

export const MUTATION_APPROVE_USERPOST = `
mutation approve_userpost (
  $nid: String!,
  $approved: Int!
) {
  update_articles(
    where: {
      nid: {_eq: $nid}
    },
    _set: {
      param1: $approved
    }
  ) {
    affected_rows
  }
}`;