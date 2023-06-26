// Reference : https://github.com/hasura/nodejs-graphql-subscriptions-boilerplate/blob/master/index.js

import { execute } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import { 
  SUBSCRIPTION_CATEGORIES, SUBSCRIPTION_CATEGORIES_USER,
  SUBSCRIPTION_FEEDS, SUBSCRIPTION_FEEDS_USER,
  SUBSCRIPTION_SOURCES,
  SUBSCRIPTION_FEED_MODERATORS,
  SUBSCRIPTION_USER,
  SUBSCRIPTION_NOTIFICATIONS
} from './endpoints';


const RAVEN_ENDPOINT = "wss://graphql.raventalk.org/v1/graphql";

const _getWsClient = () => {
  const client = new SubscriptionClient(
    RAVEN_ENDPOINT, 
    { reconnect: true }
  );
  return client;
};

const _createSubscriptionObservable = (query, variables) => {
  const link = new WebSocketLink(_getWsClient());
  return execute(link, {query: query, variables: variables});
};


var categorySubscriber = null;
var feedSubscriber = null;
var sourceSubscriber = null;
var feedModeratorSubscriber = null;
var userSubscriber = null;
var notificationSubscriber = null;

const createCategorySubscriber = (loggedIn) => {
  if (categorySubscriber) {
    return categorySubscriber;
  }
  if (loggedIn) {
    categorySubscriber = _createSubscriptionObservable(SUBSCRIPTION_CATEGORIES_USER, {});
  } else {
    categorySubscriber = _createSubscriptionObservable(SUBSCRIPTION_CATEGORIES, {});
  }
  return categorySubscriber;
}

const createFeedSubscriber = (loggedIn) => {
  if (feedSubscriber) {
    return feedSubscriber;
  }
  if (loggedIn)
  {
    feedSubscriber = _createSubscriptionObservable(SUBSCRIPTION_FEEDS_USER, {});
  } else {
    feedSubscriber = _createSubscriptionObservable(SUBSCRIPTION_FEEDS, {});
  }
  return feedSubscriber;
}

const createSourceSubscriber = (loggedIn) => {
  if (sourceSubscriber) {
    return sourceSubscriber;
  }
  sourceSubscriber = _createSubscriptionObservable(SUBSCRIPTION_SOURCES, {});
  return sourceSubscriber;
}

const createFeedModeratorSubscriber = (feed_id) => {
  const variables = {
    feed_id: feed_id
  };
  if (feedModeratorSubscriber) {
    return feedModeratorSubscriber;
  }
  feedModeratorSubscriber = _createSubscriptionObservable(SUBSCRIPTION_FEED_MODERATORS, variables);
  return feedModeratorSubscriber;
}

const createUserSubscriber = (user_id) => {
  if (userSubscriber) {
    return userSubscriber;
  }

  const variables = {
    uid: user_id
  };
  userSubscriber = _createSubscriptionObservable(SUBSCRIPTION_USER, variables);
  return userSubscriber;
}

const createNotificationSubscriber = (user_id) => {
  if (notificationSubscriber) {
    return notificationSubscriber;
  }

  const variables = {
    uid: user_id
  };
  notificationSubscriber = _createSubscriptionObservable(SUBSCRIPTION_NOTIFICATIONS, variables);
  return notificationSubscriber;
}

export {
  createCategorySubscriber,
  createFeedSubscriber,
  createSourceSubscriber,
  createFeedModeratorSubscriber,
  createUserSubscriber,
  createNotificationSubscriber
};