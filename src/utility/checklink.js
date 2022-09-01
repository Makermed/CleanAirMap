import { 
    ARTICLE_BRANCH_YOUTUBE,
    ARTICLE_BRANCH_TWITTER,
    ARTICLE_BRANCH_INSTAGRAM,
    ARTICLE_BRANCH_TIKTOK,
    ARTICLE_BRANCH_PINTEREST,
    ARTICLE_BRANCH_TWITCH,
    ARTICLE_BRANCH_MEDIUM,
    ARTICLE_BRANCH_REDDIT,
    ARTICLE_BRANCH_VSCO,
    ARTICLE_BRANCH_SPOTIFY,
    ARTICLE_BRANCH_QUORA,
    ARTICLE_BRANCH_FACEBOOK,
    ARTICLE_BRANCH_VIMEO,
    ARTICLE_BRANCH_WEBSITE,
    ARTICLE_BRANCH_SUBSTACK,
    ARTICLE_BRANCH_PODCAST
} from "constants/branches";
import { get_substring } from "utility/utils";


const PINTEREST_STATIC_LINK = "pinterest_static_link";
const TWITTER_STATIC_LINK   = "twitter_static_link";
const YOUTUBE_STATIC_LINK   = "youtube_static_link";
const TIKTOK_STATIC_LINK    = "tiktok_static_link";
const INSTAGRAM_STATIC_LINK = "instagram_static_link";


function is_youtube_static_link(link) {
    const static_link = link.trim();
    if (!get_substring(static_link, "https://youtube.com") && !get_substring(static_link, "https://youtu.be")) {
        return false;
    }
    
    if (get_substring(static_link, "/channel/"))
        return false;
    
    if (get_substring(static_link, "/user/"))
        return false;
    
    if (get_substring(static_link, "list="))
        return false;
    
    if (get_substring(static_link, "youtu.be/"))
        return true;

    return false;
}

function check_youtube_link(link) {
    let url = link.trim();
    if (!get_substring(url, "youtube.com") && !get_substring(url, "youtu.be")) {
        return null;
    }

    if (get_substring(url, "https://")) {
        url = "https://" + url;
    }
    
    let tag = get_substring(url, "/channel/", "/");
    if (tag) {
        return {
            branch: ARTICLE_BRANCH_YOUTUBE,
            type  : "youtube_channel_feed",
            tag   : tag,
            url   : url
        }
    }
    
    tag = get_substring(url, "/user/", "/");
    if (tag) {
        return {
            branch: ARTICLE_BRANCH_YOUTUBE,
            type  : "youtube_user_id",
            tag   : tag,
            url   : url
        }
    }
    
    tag = get_substring(url, "list=", "/");
    if (tag) {
        return {
            branch: ARTICLE_BRANCH_YOUTUBE,
            type  : "youtube_playlist_feed",
            tag   : tag,
            url   : url
        }
    }
    
    tag = get_substring(url, "youtu.be/", "/");
    if (tag) {
        return {
            branch: ARTICLE_BRANCH_YOUTUBE,
            type  : "youtube_static_link",
            tag   : tag,
            url   : url
        }
    }

    return {
        branch: ARTICLE_BRANCH_YOUTUBE,
        type  : "youtube_static_link",
        tag   : url,
        url   : url
    }
}


function is_twitter_static_link(link) {
    const static_link = link.trim();
    if (!get_substring(static_link, "https://twitter.com"))
        return false;
    
    if (get_substring(static_link, "/status/", "?"))
        return true;
    
    // if (get_substring(static_link, "/lists/", "?"))
    //     return false;
        
    // const tag = get_substring(static_link, "twitter.com/", "?");
    // if (tag) {
    //     if (tag.indexOf('/') >= 0) {
    //         return false;
    //     }
    //     return true;
    // }
    
    return false;
}

function check_twitter_link(link) {
    let url = link.trim();
    if (url[0] !== '@' && !get_substring(url, "twitter.com"))
        return null;
    
    if (url[0] === '@') {
        return {
            branch: ARTICLE_BRANCH_TWITTER,
            type  : "twitter_api_userid",
            tag   : url.slice(1),
            url   : "https://twitter.com/" + url
        }
    }

    if (!get_substring(url, "https://")) {
        url = "https://" + url;
    }

    let tag = get_substring(url, "/lists/", "?");
    if (tag) {
        return {
            branch: ARTICLE_BRANCH_TWITTER,
            type  : "twitter_api_list",
            tag   : tag,
            url   : url
        }
    }
    
    tag = get_substring(url, "/status/", "?");
    if (tag) {
        return {
            branch: ARTICLE_BRANCH_TWITTER,
            type  : "twitter_static_link",
            tag   : tag,
            url   : url
        }
    }

    tag = get_substring(url, "twitter.com/", "?");
    if (tag) {
        if (tag.indexOf('/') >= 0) {
            return null;
        }
        return {
            branch: ARTICLE_BRANCH_TWITTER,
            type  : "twitter_api_userid",
            tag   : tag,
            url   : url
        }
    }

    return null;
}


function is_pinterest_static_link(link) {
    const static_link = link.trim();
    if (!get_substring(static_link, "https://pin.it/"))
        return false;
    return true;
}

function check_pinterest_link(link) {
    let url = link.trim();
    if (!get_substring(url, "pin.it/"))
        return null;

    if (!get_substring(url, "https://")) {
        url = "https://" + url;
    }

    let tag = get_substring(url, "pin.it/", "/");
    if (!tag) {
        return null;
    }
    return {
        branch: ARTICLE_BRANCH_PINTEREST,
        type  : "pinterest_static_link",
        tag   : tag,
        url   : url
    }
}


function is_tiktok_static_link(link) {
    const static_link = link.trim();
    if (!get_substring(static_link, "https://vm.tiktok.com/"))
        return false;
    return true;
}

function is_instagram_static_link(link) {
    return false;
}

function check_instagram_link(link) {
    let url = link.trim();
    if (!get_substring(url, "instagram.com"))
        return null;

    if (!get_substring(url, "https://")) {
        url = "https://" + url;
    }

    let tag = get_substring(url, "instagram.com/explore/tags/", "/");
    if (tag) {
        return {
            branch: ARTICLE_BRANCH_INSTAGRAM,
            type  : "instagram_hashtag_feed",
            tag   : tag,
            url   : url
        }
    }

    tag = get_substring(url, "instagram.com/", "/");
    if (tag) {
        return {
            branch: ARTICLE_BRANCH_INSTAGRAM,
            type  : "instagram_user_feed",
            tag   : tag,
            url   : url
        }
    }
    return null;
}


function check_twitch_link(link) {
    let url = link.trim();
    if (!get_substring(url, "twitch.tv") && get_substring(url, "twitch.com"))
        return null;

    if (!get_substring(url, "https://")) {
        url = "https://" + url;
    }

    let tag = get_substring(url, "twitch.tv/", "/");
    if (!tag) {
        return null;
    }
    return {
        branch: ARTICLE_BRANCH_TWITCH,
        type  : "twitch_user_video",
        tag   : tag,
        url   : url
    }
}


function check_medium_link(link) {
    let url = link.trim();
    if (!get_substring(url, "medium.com"))
        return null;

    if (!get_substring(url, "https://")) {
        url = "https://" + url;
    }

    let tag = get_substring(url, "medium.com/@", "/");
    if (tag) {
        return {
            branch: ARTICLE_BRANCH_MEDIUM,
            type  : "medium_userprofile_feed",
            tag   : tag,
            url   : url
        }
    }

    tag = get_substring(url, "medium.com/topic/", "/");
    if (tag) {
        return {
            branch: ARTICLE_BRANCH_MEDIUM,
            type  : "medium_topic_feed",
            tag   : tag,
            url   : url
        }
    }

    tag = get_substring(url, "medium.com/", "/");
    if (tag) {
        return {
            branch: ARTICLE_BRANCH_MEDIUM,
            type  : "medium_publication_feed",
            tag   : tag,
            url   : url
        }
    }

    return null;
}


function check_reddit_link(link) {
    let url = link.trim();
    if (!get_substring(url, "reddit.com"))
        return null;

    if (!get_substring(url, "https://")) {
        url = "https://" + url;
    }

    let tag = get_substring(url, "reddit.com/r/", "/")
    if (!tag) {
        return null;
    }
    return {
        branch: ARTICLE_BRANCH_REDDIT,
        type  : "reddit_api_category",
        tag   : tag,
        url   : url
    }
}


function check_tiktok_link(link) {
    let url = link.trim();
    if (!get_substring(url, "tiktok.com"))
        return null;

    if (!get_substring(url, "https://")) {
        url = "https://" + url;
    }

    let tag = get_substring(url, "tiktok.com/@", "/");
    if (tag) {
        return {
            branch: ARTICLE_BRANCH_TIKTOK,
            type  : "tiktok_user_feed",
            tag   : tag,
            url   : url
        }
    }

    tag = get_substring(url, "tiktok.com/tag/", "/");
    if (tag) {
        return {
            branch: ARTICLE_BRANCH_TIKTOK,
            type  : "tiktok_hashtag_feed",
            tag   : tag,
            url   : url
        }
    }
    
    return null;
}


function check_vsco_link(link) {
    let url = link.trim();
    if (!get_substring(url, "vsco.co"))
        return null;

    if (!get_substring(url, "https://")) {
        url = "https://" + url;
    }

    let tag = get_substring(url, "vsco.co/", "/");
    if (!tag) {
        return null;
    }
    return {
        branch: ARTICLE_BRANCH_VSCO,
        type  : "vsco_user_images",
        tag   : tag,
        url   : url
    }
}


function check_spotify_link(link) {
    let url = link.trim();
    if (!get_substring(url, "open.spotify.com"))
        return null;

    if (!get_substring(url, "https://")) {
        url = "https://" + url;
    }

    let tag = get_substring(url, "open.spotify.com/user/", "/");
    if (tag) {
        return {
            branch: ARTICLE_BRANCH_SPOTIFY,
            type  : "spotify_user_playlists",
            tag   : tag,
            url   : url
        }
    }

    tag = get_substring(url, "open.spotify.com/playlist/", "/");
    if (tag) {
        return {
            branch: ARTICLE_BRANCH_SPOTIFY,
            type  : "spotify_playlists",
            tag   : tag,
            url   : url
        }
    }
    
    return null;
}


function check_quora_link(link) {
    let url = link.trim();
    if (!get_substring(url, "quora.com"))
        return null;

    if (!get_substring(url, "https://")) {
        url = "https://" + url;
    }

    let tag = get_substring(url, "quora.com/topic/", "/");
    if (tag) {
        return {
            branch: ARTICLE_BRANCH_QUORA,
            type  : "quora_topic_feed",
            tag   : tag,
            url   : url
        }
    }

    tag = get_substring(url, "quora.com/q/", "/");
    if (tag) {
        return {
            branch: ARTICLE_BRANCH_QUORA,
            type  : "quora_space_feed",
            tag   : tag,
            url   : url
        }
    }
    
    return null;
}


function check_facebook_link(link) {
    let url = link.trim();
    if (!get_substring(url, "facebook.com"))
        return null;

    if (!get_substring(url, "https://")) {
        url = "https://" + url;
    }

    let tag = get_substring(url, "facebook.com/", "/");
    if (!tag) {
        return null;
    }
    return {
        branch: ARTICLE_BRANCH_FACEBOOK,
        type  : "facebook_user_feed",
        tag   : tag,
        url   : url
    }
}


function check_vimeo_link(link) {
    let url = link.trim();
    if (!get_substring(url, "vimeo.com"))
        return null;

    if (!get_substring(url, "https://")) {
        url = "https://" + url;
    }

    let tag = get_substring(url, "/channels/", "/");
    if (tag) {
        return {
            branch: ARTICLE_BRANCH_VIMEO,
            type  : "vimeo_channel_videos",
            tag   : tag,
            url   : url
        }
    }

    tag = get_substring(url, "/categories/", "/");
    if (tag) {
        return {
            branch: ARTICLE_BRANCH_VIMEO,
            type  : "vimeo_category_videos",
            tag   : tag,
            url   : url
        }
    }

    tag = get_substring(url, "/groups/", "/");
    if (tag) {
        return {
            branch: ARTICLE_BRANCH_VIMEO,
            type  : "vimeo_group_videos",
            tag   : tag,
            url   : url
        }
    }

    tag = get_substring(url, "vimeo.com/", "/")
    if (tag) {
        return {
            branch: ARTICLE_BRANCH_FACEBOOK,
            type  : "vimeo_user_videos",
            tag   : tag,
            url   : url
        }
    }

    return null;
}


function check_substack_link(link) {
    let url = link.trim();
    const url_string = url.toLowerCase();
    // if (!get_substring(url, "", ".substack.com"))
    if (!url_string.includes(".substack.com"))
        return null;

    if (!get_substring(url, "https://")) {
        url = "https://" + url;
    }

    const tag = get_substring(url, "https://", ".substack.com");
    if (tag) {
        return {
            branch: ARTICLE_BRANCH_SUBSTACK,
            type  : "substack_user_archive",
            tag   : tag,
            url   : url
        }
    }
    
    return null;
}


function check_podcast_link(link) {
    let url = link.trim();
    const url_string = url.toLowerCase();
    if (!url_string.includes("podcasts.apple.com"))
        return null;

    if (!get_substring(url, "https://")) {
        url = "https://" + url;
    }

    const tag = get_substring(url, "/id", "/");
    if (tag) {
        return {
            branch: ARTICLE_BRANCH_PODCAST,
            type  : "podcast_channel_feed",
            tag   : tag,
            url   : url
        }
    }
    
    return null;
}


function check_other_links(link) {
    let url = link.trim();
    if (!url)
        return null;

    if (!get_substring(url, "https://") && !get_substring(url, "http://")) {
        url = "https://" + url;
    }

    return {
        branch: ARTICLE_BRANCH_WEBSITE,
        type  : "website_static_link",
        tag   : url,
        url   : url
    }
}


export const check_static_link = (link, branch) => {
    if (branch === ARTICLE_BRANCH_YOUTUBE && is_youtube_static_link(link)) {
        return YOUTUBE_STATIC_LINK;
    } else if (branch === ARTICLE_BRANCH_TWITTER && is_twitter_static_link(link)) {
        return TWITTER_STATIC_LINK;
    } else if (branch === ARTICLE_BRANCH_PINTEREST && is_pinterest_static_link(link)) {
        return PINTEREST_STATIC_LINK;
    } else if (branch === ARTICLE_BRANCH_TIKTOK && is_tiktok_static_link(link)) {
        return TIKTOK_STATIC_LINK;
    } else if (branch === ARTICLE_BRANCH_INSTAGRAM && is_instagram_static_link(link)) {
        return INSTAGRAM_STATIC_LINK;
    }

    return null;
};


export const check_source_link = (link) => {
    let source_link = null;

    source_link = check_youtube_link(link);
    if (source_link) {
        return source_link;
    }

    source_link = check_twitter_link(link);
    if (source_link) {
        return source_link;
    }

    source_link = check_pinterest_link(link);
    if (source_link) {
        return source_link;
    }

    source_link = check_instagram_link(link);
    if (source_link) {
        return source_link;
    }

    source_link = check_twitch_link(link);
    if (source_link) {
        return source_link;
    }

    source_link = check_medium_link(link);
    if (source_link) {
        return source_link;
    }

    source_link = check_reddit_link(link);
    if (source_link) {
        return source_link;
    }

    source_link = check_tiktok_link(link);
    if (source_link) {
        return source_link;
    }

    source_link = check_vsco_link(link);
    if (source_link) {
        return source_link;
    }

    source_link = check_spotify_link(link);
    if (source_link) {
        return source_link;
    }

    source_link = check_quora_link(link);
    if (source_link) {
        return source_link;
    }

    source_link = check_facebook_link(link);
    if (source_link) {
        return source_link;
    }

    source_link = check_vimeo_link(link);
    if (source_link) {
        return source_link;
    }

    source_link = check_substack_link(link);
    if (source_link) {
        return source_link;
    }

    source_link = check_podcast_link(link);
    if (source_link) {
        return source_link;
    }

    return check_other_links(link);
};
