import { GRAPHQL_SUCCESS } from "constants/types";
import { GraphqlService } from "services";
import { ACTIVITY_TYPE_FEED } from "constants/activity";


class FeedsController {
    constructor() {
        this.gqlservice = new GraphqlService();
    }

    update_feed_notifications = async (feed, token) => {
        this.gqlservice.set_auth_jwt(token, true);
        
        let result = await this._get_feed_moderates(feed);
        if (!result.success) {
            return result;
        }

        const new_feed = result.feed;

        result = await this.gqlservice.update_feed_notifications(
            new_feed.id, new_feed.notifications, new_feed.notif_date);
        if (result.status_code !== GRAPHQL_SUCCESS) {
            return {
                success: false,
                msg: result.msg
            };
        }

        return {
            success: true,
            feed: new_feed
        };
    }


    _get_feed_moderates = async (feed) => {
        let result = await this.gqlservice.feed_by_id(feed.id);
        if (result.status_code !== GRAPHQL_SUCCESS) {
            return {
                success: false,
                msg: result.msg
            };
        }

        const feeds = result.data.feeds;
        if (feeds.length === 0) {
            return {
                success: false,
                msg: `Can't find the feed ${feed.name}`
            };
        } 

        let new_feed = feeds[0];

        const sources2moderate = new_feed.feed_sources.filter(
            (feed_source) => feed_source.approved === false
        );

        const feed_source_ids = new_feed.feed_sources
            .filter((feed_source) => feed_source.approved)
            .map((feed_source) => feed_source.source_id);

        // show only previous 7 day's log
        const timestamp = new Date() - 86400 * 7 * 1000;
        const after = new Date(timestamp).toISOString();

        result = await this.gqlservice.feed_moderation_fields(
                feed.id,
                feed_source_ids,
                after,
                ACTIVITY_TYPE_FEED
            );
        if (result.status_code !== GRAPHQL_SUCCESS) {
            return {
                success: false,
                msg: result.msg
            };
        }

        const source_reports = result.data.source_reports.slice();
        const user_posts = result.data.articles.slice();
        let feed_posts = result.data.feed_posts.slice();
        const article_reports = result.data.article_reports.slice();
        const thread_reports = result.data.thread_reports.slice();
        const threads = result.data.threads.slice();
        const feed_moderators = result.data.feed_moderators.slice();
        const moderator_reports = result.data.moderator_reports.slice();
        const feed_logs = result.data.activitylogs.slice();

        // reports of a feed should be processed by category moderation
        // new_feed.reports = feed_reports_count;

        const source_reports_moderate = source_reports.filter(report => !report.approved);
        const user_posts_moderate = user_posts.filter(post => post.param1 === 0);
        const article_reports_moderate = article_reports.filter(report => !report.approved);
        const threads_moderate = threads.filter(thread => !thread.approved);
        const thread_reports_moderate = thread_reports.filter(report => !report.approved);
        const feed_moderators_moderate = feed_moderators.filter(moderator => !moderator.approved);
        const moderator_reports_moderate = moderator_reports.filter(report => !report.approved);
        feed_posts = feed_posts.map(post => post.article);

        new_feed.proposed_sources = sources2moderate;
        new_feed.source_reports = source_reports;
        new_feed.post_reports = article_reports;
        new_feed.proposed_posts = user_posts;
        new_feed.posted_posts = feed_posts;
        new_feed.threads = threads;
        new_feed.thread_reports = thread_reports;
        new_feed.moderators = feed_moderators;
        new_feed.moderator_reports = moderator_reports;
        new_feed.feed_logs = feed_logs;

        // console.log("feed moderations :", new_feed);

        const notifications = sources2moderate.length +
                                source_reports_moderate.length +
                                user_posts_moderate.length + feed_posts.length +
                                article_reports_moderate.length +
                                threads_moderate.length +
                                thread_reports_moderate.length +
                                feed_moderators_moderate.length +
                                moderator_reports_moderate.length;
                                // new_feed_logs.length;

        let notif_date = null;
        for (let source of sources2moderate) {
            let dt = Date.parse(source.created_at);
            if (notif_date === null || notif_date < dt) {
                notif_date = dt;
            }
        }
        for (let report of source_reports_moderate) {
            let dt = Date.parse(report.reported_at);
            if (notif_date === null || notif_date < dt) {
                notif_date = dt;
            }
        }
        for (let user_post of user_posts_moderate) {
            let dt = new Date(user_post.published * 1000);
            if (notif_date === null || notif_date < dt) {
                notif_date = dt;
            }
        }
        for (let feed_post of feed_posts) {
            let dt = new Date(feed_post.published * 1000);
            if (notif_date === null || notif_date < dt) {
                notif_date = dt;
            }
        }
        for (let report of article_reports_moderate) {
            let dt = Date.parse(report.reported_at);
            if (notif_date === null || notif_date < dt) {
                notif_date = dt;
            }
        }
        for (let thread of threads_moderate) {
            let dt = Date.parse(thread.posted_at);
            if (notif_date === null || notif_date < dt) {
                notif_date = dt;
            }
        }
        for (let report of thread_reports_moderate) {
            let dt = Date.parse(report.reported_at);
            if (notif_date === null || notif_date < dt) {
                notif_date = dt;
            }
        }
        for (let moderator of feed_moderators_moderate) {
            let dt = Date.parse(moderator.created);
            if (notif_date === null || notif_date < dt) {
                notif_date = dt;
            }
        }
        for (let report of moderator_reports_moderate) {
            let dt = Date.parse(report.reported_at);
            if (notif_date === null || notif_date < dt) {
                notif_date = dt;
            }
        }

        if (notif_date !== null) {
            notif_date = new Date(notif_date).toISOString();
        }

        new_feed.notifications = notifications;
        new_feed.notif_date = notif_date;

        // console.log("notifications :", notifications, notif_date);

        return {
            success: true,
            feed: new_feed
        };
    }
}

export default FeedsController;