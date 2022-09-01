import { conf_social_types } from "constants/socialtypes";
import { 
    get_substring, 
    // get_hostname 
} from "utility/utils";
import { check_source_link } from "utility/checklink";


export const build_source_link = (socialtype, tag, param = null) => {
    const social_type = conf_social_types.find(social_type => social_type.type === socialtype);

    // check if it has urlpattern
    if (!social_type) {
        return null;
    }

    if (!social_type.url) {
        if (socialtype === "gmail_subscribe") {
            return null;
        } else if (socialtype === "youtube_playlist_feed") {
            return null;
        }
        return tag;
    }

    // this is a full url tag
    if (tag.indexOf("http") === 0) {
        if (socialtype === "podcast_channel_feed") {
            let base_link = get_substring(tag, "", "/feed/");
            return base_link;
        } else if (socialtype === "pinterest_rss_feed") {
            return "https://www.pinterest.com/" + tag;
        }
        return tag;
    }

    // build url
    let url = social_type.url;
    if (socialtype === "youtube_playlist_feed") {
        url = url + "watch?v=" + param + "&list=" + tag;
    } else if (socialtype === "facebook_user_feed") {
        url = url + tag + "/posts/?ref=page_internal";
    } else if (socialtype === "vsco_user_images") {
        url = url + tag + "/gallery";
    } else {
        url = url + tag;
    }
    return url;
}


export const get_source_links = (sourcesTxt) => {
    let source_links = [];
    const sources_txt = sourcesTxt.trim();
    if (sources_txt.length === 0) {
      return source_links;
    }

    let sources = sourcesTxt.split(/\r?\n/);
    sources = sources.filter(source => source.trim().length > 0);
    if (sources.length === 0) {
      return source_links;
    }

    // get uniq sources
    sources = Array.from(new Set(sources));

    source_links = sources
      .map(link => check_source_link(link))
      .filter(source => source !== null);
    // console.log("source links :", source_links);

    return source_links;

    // // remove duplicate links from the same site
    // let hostnames = [];
    // let new_source_links = [];
    // for (let link of source_links) {
    //   let hostname = get_hostname(link.url);
    //   if (hostnames.includes(hostname)) {
    //     continue;
    //   } else {
    //     hostnames.push(hostname);
    //     new_source_links.push(link);
    //   }
    // }

    // return new_source_links;
}