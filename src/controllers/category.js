import { GRAPHQL_SUCCESS } from "constants/types";
import { GraphqlService } from "services";


class CategoryController {
    constructor() {
        this.gqlservice = new GraphqlService();
    }

    update_category_notifications = async (category, feeds, token) => {
        this.gqlservice.set_auth_jwt(token, true);

        let result = await this._get_category_moderates(category, feeds);
        if (!result.success) {
            return result;
        }

        const notifications = result.notifications;

        result = await this.gqlservice.update_category_notifications(category.id, notifications);
        if (result.status_code !== GRAPHQL_SUCCESS) {
            return {
                success: false,
                msg: result.msg
            };
        }

        let new_category = category;
        new_category.notifications = notifications;

        return {
            success: true,
            category: new_category 
        };
    }


    _get_category_moderates = async (category, feeds) => {
        const category_feed_ids = feeds.filter(feed => feed.category_id === category.id && feed.approved).map(feed => feed.id);
        
        const result = await this.gqlservice.category_moderation_count(category.id, category_feed_ids);
        if (result.status_code !== GRAPHQL_SUCCESS) {
            return {
                success: false,
                msg: result.msg
            };
        }

        const notifications = result.data.category_moderators_aggregate.aggregate.count +
                                result.data.feeds_aggregate.aggregate.count +
                                result.data.feed_reports_aggregate.aggregate.count;

        // console.log("notifications :", notifications);

        return {
            success: true,
            notifications: notifications
        };
    }
}

export default CategoryController;