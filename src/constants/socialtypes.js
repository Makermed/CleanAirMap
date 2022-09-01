import {
    ARTICLE_BRANCH_YOUTUBE,
    ARTICLE_BRANCH_TWITTER,
    ARTICLE_BRANCH_INSTAGRAM,
    ARTICLE_BRANCH_TWITCH,
    ARTICLE_BRANCH_MEDIUM,
    ARTICLE_BRANCH_REDDIT,
    ARTICLE_BRANCH_HACKERNEWS,
    ARTICLE_BRANCH_SLASHDOT,
    ARTICLE_BRANCH_PODCAST,
    ARTICLE_BRANCH_RSSFEED,
    ARTICLE_BRANCH_TIKTOK,
    ARTICLE_BRANCH_PINTEREST,
    ARTICLE_BRANCH_VSCO,
    ARTICLE_BRANCH_SPOTIFY,
    ARTICLE_BRANCH_QUORA,
    ARTICLE_BRANCH_FACEBOOK,
    ARTICLE_BRANCH_SUBSTACK,
    ARTICLE_BRANCH_GMAIL,
    ARTICLE_BRANCH_VIMEO,
    ARTICLE_BRANCH_WEBSITE,
    ARTICLE_BRANCH_USERPOST
} from "constants/branches";


export const conf_social_types = [
    {
        "type": "youtube_channel_feed",
        "branch": ARTICLE_BRANCH_YOUTUBE,
        "url": "https://www.youtube.com/channel/"
    },
    {
        "type": "youtube_user_id",
        "branch": ARTICLE_BRANCH_YOUTUBE,
        "url": "https://www.youtube.com/user/"
    },
    {
        "type": "youtube_playlist_feed",
        "branch": ARTICLE_BRANCH_YOUTUBE,
        "url": null
    },
    {
        "type": "youtube_static_link",
        "branch": ARTICLE_BRANCH_YOUTUBE,
        "url": null
    },
    {
        "type": "twitter_api_userid",
        "branch": ARTICLE_BRANCH_TWITTER,
        "url": "https://twitter.com/"
    },
    {
        "type": "twitter_api_query",
        "branch": ARTICLE_BRANCH_TWITTER,
        "url": "https://twitter.com/search?q=&src=typed_query"
    },
    {
        "type": "twitter_api_list",
        "branch": ARTICLE_BRANCH_TWITTER,
        "url": "https://twitter.com/i/lists/"
    },
    {
        "type": "twitter_static_link",
        "branch": ARTICLE_BRANCH_TWITTER,
        "url": null
    },
    {
        "type": "instagram_user_feed",
        "branch": ARTICLE_BRANCH_INSTAGRAM,
        "url": "https://www.instagram.com/"
    },
    {
        "type": "instagram_hashtag_feed",
        "branch": ARTICLE_BRANCH_INSTAGRAM,
        "url": "https://www.instagram.com/explore/tags/"
    },
    {
        "type": "twitch_user_video",
        "branch": ARTICLE_BRANCH_TWITCH,
        "url": "https://www.twitch.tv/"
    },
    {
        "type": "medium_userprofile_feed",
        "branch": ARTICLE_BRANCH_MEDIUM,
        "url": "https://medium.com/@"
    },
    {
        "type": "medium_publication_feed",
        "branch": ARTICLE_BRANCH_MEDIUM,
        "url": "https://medium.com/"
    },
    {
        "type": "medium_topic_feed",
        "branch": ARTICLE_BRANCH_MEDIUM,
        "url": "https://medium.com/topic/"
    },
    {
        "type": "reddit_api_category",
        "branch": ARTICLE_BRANCH_REDDIT,
        "url": "https://www.reddit.com/r/"
    },
    {
        "type": "hackernews_api_story",
        "branch": ARTICLE_BRANCH_HACKERNEWS,
        "url": "https://hn.algolia.com/?q="
    },
    {
        "type": "slashdot_topic_feed",
        "branch": ARTICLE_BRANCH_SLASHDOT,
        "url": "https://slashdot.org/?fhfilter="
    },
    {
        "type": "podcast_channel_feed",
        "branch": ARTICLE_BRANCH_PODCAST,
        "url": null
    },
    {
        "type": "rss_url_feed",
        "branch": ARTICLE_BRANCH_RSSFEED,
        "url": null
    },
    {
        "type": "tiktok_user_feed",
        "branch": ARTICLE_BRANCH_TIKTOK,
        "url": "https://www.tiktok.com/@"
    },
    {
        "type": "tiktok_hashtag_feed",
        "branch": ARTICLE_BRANCH_TIKTOK,
        "url": "https://www.tiktok.com/tag/"
    },
    {
        "type": "tiktok_static_link",
        "branch": ARTICLE_BRANCH_TIKTOK,
        "url": null
    },
    {
        "type": "pinterest_rss_feed",
        "branch": ARTICLE_BRANCH_PINTEREST,
        "url": null
    },
    {
        "type": "pinterest_static_link",
        "branch": ARTICLE_BRANCH_PINTEREST,
        "url": null
    },
    {
        "type": "vsco_user_images",
        "branch": ARTICLE_BRANCH_VSCO,
        "url": "https://vsco.co/"
    },
    {
        "type": "spotify_user_playlists",
        "branch": ARTICLE_BRANCH_SPOTIFY,
        "url": "https://open.spotify.com/user/"
    },
    {
        "type": "spotify_playlists",
        "branch": ARTICLE_BRANCH_SPOTIFY,
        "url": "https://open.spotify.com/playlist/"
    },
    {
        "type": "quora_topic_feed",
        "branch": ARTICLE_BRANCH_QUORA,
        "url": "https://www.quora.com/topic/"
    },
    {
        "type": "quora_space_feed",
        "branch": ARTICLE_BRANCH_QUORA,
        "url": "https://www.quora.com/q/"
    },
    {
        "type": "facebook_user_feed",
        "branch": ARTICLE_BRANCH_FACEBOOK,
        "url": "https://www.facebook.com/"
    },
    {
        "type": "substack_user_archive",
        "branch": ARTICLE_BRANCH_SUBSTACK,
        "url": null
    },
    {
        "type": "gmail_subscribe",
        "branch": ARTICLE_BRANCH_GMAIL,
        "url": null
    },
    {
        "type": "vimeo_channel_videos",
        "branch": ARTICLE_BRANCH_VIMEO,
        "url": "https://vimeo.com/channels/"
    },
    {
        "type": "vimeo_category_videos",
        "branch": ARTICLE_BRANCH_VIMEO,
        "url": "https://vimeo.com/categories/"
    },
    {
        "type": "vimeo_group_videos",
        "branch": ARTICLE_BRANCH_VIMEO,
        "url": "https://vimeo.com/groups/"
    },
    {
        "type": "vimeo_user_videos",
        "branch": ARTICLE_BRANCH_VIMEO,
        "url": "https://vimeo.com/"
    },
    {
        "type": "website_static_link",
        "branch": ARTICLE_BRANCH_WEBSITE,
        "url": null
    },
    {
        "type": "user_post_feed",
        "branch": ARTICLE_BRANCH_USERPOST,
        "url": null
    }
]