export const QUERY_TOP_ARTICLE_COMMENTS_BY_NEWEST = `
query top_article_comments_by_newest(
  $article_id: String!,
  $approved: Boolean,
  $pagesize: Int!,
  $offset: Int!
) {
  comments (
    where: {
      article_id: {_eq: $article_id},
      parent_id: {_is_null: true},
      approved: {_eq: $approved}
    },
    order_by: {created_at: desc},
    limit: $pagesize,
    offset: $offset
  ) {
    id
    article_id
    thread_id
    parent_id
    created_at
    modified_at
    status
    text
    author {
      uid
      image
      username
      biography
    }
    recommends
    approved
    children_aggregate ( 
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc} 
    ) {
      aggregate { count }
    }
    children (
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc},
      limit: 1,
      offset: 0
    ) {
      id
      created_at
      recommends
      approved
      author {
        uid
        image
        username
        biography
      }
    }
  }
}`;

export const QUERY_TOP_ARTICLE_COMMENTS_BY_OLDEST = `
query top_article_comments_by_oldest(
  $article_id: String!,
  $approved: Boolean,
  $pagesize: Int!,
  $offset: Int!
) {
  comments (
    where: {
      article_id: {_eq: $article_id},
      parent_id: {_is_null: true},
      approved: {_eq: $approved}
    },
    order_by: {created_at: asc},
    limit: $pagesize,
    offset: $offset
  ) {
    id
    article_id
    thread_id
    parent_id
    created_at
    modified_at
    status
    text
    author {
      uid
      image
      username
      biography
    }
    recommends
    approved
    children_aggregate ( 
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc} 
    ) {
      aggregate { count }
    }
    children (
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc},
      limit: 1,
      offset: 0
    ) {
      id
      created_at
      recommends
      approved
      author {
        uid
        image
        username
        biography
      }
    }
  }
}`;

export const QUERY_TOP_ARTICLE_COMMENTS_BY_RECOMMENDS = `
query top_article_comments_by_recommends(
  $article_id: String!,
  $approved: Boolean,
  $pagesize: Int!,
  $offset: Int!
) {
  comments (
    where: {
      article_id: {_eq: $article_id},
      parent_id: {_is_null: true},
      approved: {_eq: $approved}
    },
    order_by: {recommends: desc},
    limit: $pagesize,
    offset: $offset
  ) {
    id
    article_id
    thread_id
    parent_id
    created_at
    modified_at
    status
    text
    author {
      uid
      image
      username
      biography
    }
    recommends
    approved
    children_aggregate ( 
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc} 
    ) {
      aggregate { count }
    }
    children (
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc},
      limit: 1,
      offset: 0
    ) {
      id
      created_at
      recommends
      approved
      author {
        uid
        image
        username
        biography
      }
    }
  }
}`;

export const QUERY_TOP_ARTICLE_COMMENTS_BY_REPLIES = `
query top_article_comments_by_replies(
  $article_id: String!,
  $approved: Boolean,
  $pagesize: Int!,
  $offset: Int!
) {
  comments (
    where: {
      article_id: {_eq: $article_id},
      parent_id: {_is_null: true},
      approved: {_eq: $approved}
    },
    order_by: {children_aggregate: {count: desc}},
    limit: $pagesize,
    offset: $offset
  ) {
    id
    article_id
    thread_id
    parent_id
    created_at
    modified_at
    status
    text
    author {
      uid
      image
      username
      biography
    }
    recommends
    approved
    children_aggregate ( 
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc} 
    ) {
      aggregate { count }
    }
    children (
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc},
      limit: 1,
      offset: 0
    ) {
      id
      created_at
      recommends
      approved
      author {
        uid
        image
        username
        biography
      }
    }
  }
}`;

export const QUERY_TOP_THREAD_COMMENTS_BY_NEWEST = `
query top_thread_comments_by_newest(
  $thread_id: Int!,
  $approved: Boolean,
  $pagesize: Int!,
  $offset: Int!
) {
  comments (
    where: {
      thread_id: {_eq: $thread_id},
      parent_id: {_is_null: true},
      approved: {_eq: $approved}
    },
    order_by: {created_at: desc},
    limit: $pagesize,
    offset: $offset
  ) {
    id
    article_id
    thread_id
    parent_id
    created_at
    modified_at
    status
    text
    author {
      uid
      image
      username
      biography
    }
    recommends
    approved
    children_aggregate ( 
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc} 
    ) {
      aggregate { count }
    }
    children (
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc},
      limit: 1,
      offset: 0
    ) {
      id
      created_at
      recommends
      approved
      author {
        uid
        image
        username
        biography
      }
    }
  }
}`;

export const QUERY_TOP_THREAD_COMMENTS_BY_OLDEST = `
query top_thread_comments_by_oldest(
  $thread_id: Int!,
  $approved: Boolean,
  $pagesize: Int!,
  $offset: Int!
) {
  comments (
    where: {
      thread_id: {_eq: $thread_id},
      parent_id: {_is_null: true},
      approved: {_eq: $approved}
    },
    order_by: {created_at: asc},
    limit: $pagesize,
    offset: $offset
  ) {
    id
    article_id
    thread_id
    parent_id
    created_at
    modified_at
    status
    text
    author {
      uid
      image
      username
      biography
    }
    recommends
    approved
    children_aggregate ( 
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc} 
    ) {
      aggregate { count }
    }
    children (
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc},
      limit: 1,
      offset: 0
    ) {
      id
      created_at
      recommends
      approved
      author {
        uid
        image
        username
        biography
      }
    }
  }
}`;

export const QUERY_TOP_THREAD_COMMENTS_BY_RECOMMENDS = `
query top_thread_comments_by_recommends(
  $thread_id: Int!,
  $approved: Boolean,
  $pagesize: Int!,
  $offset: Int!
) {
  comments (
    where: {
      thread_id: {_eq: $thread_id},
      parent_id: {_is_null: true},
      approved: {_eq: $approved}
    },
    order_by: {recommends: desc},
    limit: $pagesize,
    offset: $offset
  ) {
    id
    article_id
    thread_id
    parent_id
    created_at
    modified_at
    status
    text
    author {
      uid
      image
      username
      biography
    }
    recommends
    approved
    children_aggregate ( 
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc} 
    ) {
      aggregate { count }
    }
    children (
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc},
      limit: 1,
      offset: 0
    ) {
      id
      created_at
      recommends
      approved
      author {
        uid
        image
        username
        biography
      }
    }
  }
}`;

export const QUERY_TOP_THREAD_COMMENTS_BY_REPLIES = `
query top_thread_comments_by_replies(
  $thread_id: Int!,
  $approved: Boolean,
  $pagesize: Int!,
  $offset: Int!
) {
  comments (
    where: {
      thread_id: {_eq: $thread_id},
      parent_id: {_is_null: true},
      approved: {_eq: $approved}
    },
    order_by: {children_aggregate: {count: desc}},
    limit: $pagesize,
    offset: $offset
  ) {
    id
    article_id
    thread_id
    parent_id
    created_at
    modified_at
    status
    text
    author {
      uid
      image
      username
      biography
    }
    recommends
    approved
    children_aggregate ( 
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc} 
    ) {
      aggregate { count }
    }
    children (
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc},
      limit: 1,
      offset: 0
    ) {
      id
      created_at
      recommends
      approved
      author {
        uid
        image
        username
        biography
      }
    }
  }
}`;


export const QUERY_ARTICLE_COMMENTS_BY_NEWEST = `
query article_comments_by_newest(
  $article_id: String!,
  $parent_id: Int!,
  $approved: Boolean,
  $pagesize: Int!,
  $offset: Int!
) {
  comments (
    where: {
      article_id: {_eq: $article_id},
      parent_id: {_eq: $parent_id},
      approved: {_eq: $approved}
    },
    order_by: {created_at: desc},
    limit: $pagesize,
    offset: $offset
  ) {
    id
    article_id
    thread_id
    parent_id
    created_at
    modified_at
    status
    text
    author {
      uid
      image
      username
      biography
    }
    recommends
    approved
    children_aggregate ( 
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc} 
    ) {
      aggregate { count }
    }
    children (
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc},
      limit: 1,
      offset: 0
    ) {
      id
      created_at
      recommends
      approved
      author {
        uid
        image
        username
        biography
      }
    }
  }
}`;

export const QUERY_ARTICLE_COMMENTS_BY_OLDEST = `
query comments_by_oldest(
  $article_id: String!,
  $parent_id: Int!,
  $approved: Boolean,
  $pagesize: Int!,
  $offset: Int!
) {
  comments (
    where: {
      article_id: {_eq: $article_id},
      parent_id: {_eq: $parent_id},
      approved: {_eq: $approved}
    },
    order_by: {created_at: asc},
    limit: $pagesize,
    offset: $offset
  ) {
    id
    article_id
    thread_id
    parent_id
    created_at
    modified_at
    status
    text
    author {
      uid
      image
      username
      biography
    }
    recommends
    approved
    children_aggregate ( 
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc} 
    ) {
      aggregate { count }
    }
    children (
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc},
      limit: 1,
      offset: 0
    ) {
      id
      created_at
      recommends
      approved
      author {
        uid
        image
        username
        biography
      }
    }
  }
}`;

export const QUERY_ARTICLE_COMMENTS_BY_RECOMMENDS = `
query article_comments_by_recommends(
  $article_id: String!,
  $parent_id: Int!,
  $approved: Boolean,
  $pagesize: Int!,
  $offset: Int!
) {
  comments (
    where: {
      article_id: {_eq: $article_id},
      parent_id: {_eq: $parent_id},
      approved: {_eq: $approved}
    },
    order_by: {recommends: desc},
    limit: $pagesize,
    offset: $offset
  ) {
    id
    article_id
    thread_id
    parent_id
    created_at
    modified_at
    status
    text
    author {
      uid
      image
      username
      biography
    }
    recommends
    approved
    children_aggregate ( 
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc} 
    ) {
      aggregate { count }
    }
    children (
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc},
      limit: 1,
      offset: 0
    ) {
      id
      created_at
      recommends
      approved
      author {
        uid
        image
        username
        biography
      }
    }
  }
}`;

export const QUERY_ARTICLE_COMMENTS_BY_REPLIES = `
query article_comments_by_replies(
  $article_id: String!,
  $parent_id: Int!,
  $approved: Boolean,
  $pagesize: Int!,
  $offset: Int!
) {
  comments (
    where: {
      article_id: {_eq: $article_id},
      parent_id: {_eq: $parent_id},
      approved: {_eq: $approved}
    },
    order_by: {children_aggregate: {count: desc}},
    limit: $pagesize,
    offset: $offset
  ) {
    id
    article_id
    thread_id
    parent_id
    created_at
    modified_at
    status
    text
    author {
      uid
      image
      username
      biography
    }
    recommends
    approved
    children_aggregate ( 
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc} 
    ) {
      aggregate { count }
    }
    children (
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc},
      limit: 1,
      offset: 0
    ) {
      id
      created_at
      recommends
      approved
      author {
        uid
        image
        username
        biography
      }
    }
  }
}`;


export const QUERY_THREAD_COMMENTS_BY_NEWEST = `
query thread_comments_by_newest(
  $thread_id: Int!,
  $parent_id: Int!,
  $approved: Boolean,
  $pagesize: Int!,
  $offset: Int!
) {
  comments (
    where: {
      thread_id: {_eq: $thread_id},
      parent_id: {_eq: $parent_id},
      approved: {_eq: $approved}
    },
    order_by: {created_at: desc},
    limit: $pagesize,
    offset: $offset
  ) {
    id
    article_id
    thread_id
    parent_id
    created_at
    modified_at
    status
    text
    author {
      uid
      image
      username
      biography
    }
    recommends
    approved
    children_aggregate ( 
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc} 
    ) {
      aggregate { count }
    }
    children (
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc},
      limit: 1,
      offset: 0
    ) {
      id
      created_at
      recommends
      approved
      author {
        uid
        image
        username
        biography
      }
    }
  }
}`;

export const QUERY_THREAD_COMMENTS_BY_OLDEST = `
query comments_by_oldest(
  $thread_id: Int!,
  $parent_id: Int!,
  $approved: Boolean,
  $pagesize: Int!,
  $offset: Int!
) {
  comments (
    where: {
      thread_id: {_eq: $thread_id},
      parent_id: {_eq: $parent_id},
      approved: {_eq: $approved}
    },
    order_by: {created_at: asc},
    limit: $pagesize,
    offset: $offset
  ) {
    id
    article_id
    thread_id
    parent_id
    created_at
    modified_at
    status
    text
    author {
      uid
      image
      username
      biography
    }
    recommends
    approved
    children_aggregate ( 
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc} 
    ) {
      aggregate { count }
    }
    children (
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc},
      limit: 1,
      offset: 0
    ) {
      id
      created_at
      recommends
      approved
      author {
        uid
        image
        username
        biography
      }
    }
  }
}`;

export const QUERY_THREAD_COMMENTS_BY_RECOMMENDS = `
query thread_comments_by_recommends(
  $thread_id: Int!,
  $parent_id: Int!,
  $approved: Boolean,
  $pagesize: Int!,
  $offset: Int!
) {
  comments (
    where: {
      thread_id: {_eq: $thread_id},
      parent_id: {_eq: $parent_id},
      approved: {_eq: $approved}
    },
    order_by: {recommends: desc},
    limit: $pagesize,
    offset: $offset
  ) {
    id
    article_id
    thread_id
    parent_id
    created_at
    modified_at
    status
    text
    author {
      uid
      image
      username
      biography
    }
    recommends
    approved
    children_aggregate ( 
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc} 
    ) {
      aggregate { count }
    }
    children (
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc},
      limit: 1,
      offset: 0
    ) {
      id
      created_at
      recommends
      approved
      author {
        uid
        image
        username
        biography
      }
    }
  }
}`;

export const QUERY_THREAD_COMMENTS_BY_REPLIES = `
query thread_comments_by_replies(
  $thread_id: Int!,
  $parent_id: Int!,
  $approved: Boolean,
  $pagesize: Int!,
  $offset: Int!
) {
  comments (
    where: {
      thread_id: {_eq: $thread_id},
      parent_id: {_eq: $parent_id},
      approved: {_eq: $approved}
    },
    order_by: {children_aggregate: {count: desc}},
    limit: $pagesize,
    offset: $offset
  ) {
    id
    article_id
    thread_id
    parent_id
    created_at
    modified_at
    status
    text
    author {
      uid
      image
      username
      biography
    }
    recommends
    approved
    children_aggregate ( 
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc} 
    ) {
      aggregate { count }
    }
    children (
      where: {
        approved: {_eq: $approved}
      },
      order_by: {created_at: desc},
      limit: 1,
      offset: 0
    ) {
      id
      created_at
      recommends
      approved
      author {
        uid
        image
        username
        biography
      }
    }
  }
}`;

export const MUTATION_INSERT_COMMENT = `
mutation (
  $article_id: String,
  $thread_id: Int,
  $parent_id: Int,
  $text: String!,
  $author_id: String!,
  $approved: Boolean,
  $approved_by: String,
  $approved_at: timestamptz
) {
  insert_comments(
    objects: {
      article_id: $article_id,
      thread_id: $thread_id,
      parent_id: $parent_id, 
      text: $text,
      author_id: $author_id,
      approved: $approved,
      approved_by: $approved_by,
      approved_at: $approved_at
    }
  ) {
    affected_rows
    returning {
      id
      article_id
      thread_id
      parent_id
      created_at
      modified_at
      status
      text
      author {
        uid
        image
        username
        biography
      }
      recommends
      approved
      children_aggregate { 
        aggregate { count }
      }
      children {
        id
      }
    }
  }
}`;

export const MUTATION_UPDATE_COMMENT = `
mutation (
  $id: Int!
  $text: String!,
  $modified_at: timestamptz!
) {
  update_comments(
    where: {
      id: {_eq: $id}
    }, 
    _set: {
      text: $text,
      modified_at: $modified_at,
    }
  ) {
    affected_rows
    returning {
      id
      thread_id
      parent_id
      created_at
      modified_at
      status
      text
      author {
        uid
        image
        username
        biography
      }
      recommends
      approved
    }
  }
}`;

export const MUTATION_APPROVE_COMMENT = `
mutation (
  $id: Int!
  $approved: Boolean!,
  $approved_by: String!,
  $approved_at: timestamptz!
) {
  update_comments(
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

export const MUTATION_DELETE_COMMENT = `
mutation (
  $id: Int!
) {
  delete_comments(
    where: {
      id: {_eq: $id}
    } 
  ) {
    affected_rows
  }
}`;

export const MUTATION_DELETEALL_COMMENTS = `
mutation (
  $thread_id: Int!
) {
  delete_comments(
    where: {
      thread_id: {_eq: $thread_id}
    } 
  ) {
    affected_rows
  }
}
`;

export const QUERY_COMMENT_RECOMMENDER = `
query comment_recommmender(
  $comment_id: Int!,
  $user_id: String!
) {
  comment_recommenders(
    where: {
      comment_id: {_eq: $comment_id},
      user_id: {_eq: $user_id} 
    }
  ) {
    id
  }
}`;

export const MUTATION_COMMENT_INC_RECOMMENDS = `
mutation comment_inc_recommends(
  $comment_id: Int!,
  $user_id: String!,
) {
  update_comments(
    where: {
      id: {_eq: $comment_id}
    },
    _inc: {recommends: 1}
  ) {
    affected_rows
    returning {
      recommends
    }
  }

  insert_comment_recommenders(
    objects: {
      comment_id: $comment_id, 
      user_id: $user_id
    }
  ) {
    affected_rows
  }
}`;

export const MUTATION_COMMENT_DEC_RECOMMENDS = `
mutation comment_dec_recommends(
  $comment_id: Int!,
  $user_id: String!,
) {
  delete_comment_recommenders(
    where: {
      comment_id: {_eq: $comment_id}, 
      user_id: {_eq: $user_id}
    }
  ) {
    affected_rows
  }

  update_comments(
    where: {
      id: {_eq: $comment_id}
    },
    _inc: {recommends: -1}
  ) {
    affected_rows
    returning {
      recommends
    }
  }

}`;