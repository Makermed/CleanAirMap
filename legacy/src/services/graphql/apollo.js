
import ApolloClient from "apollo-client";       // Remove the apollo-boost import and change to this:
import { WebSocketLink } from 'apollo-link-ws'; // Setup the network "links"
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';

const HASURA_GRAPHQL_ENGINE_HOSTNAME = 'graphql.raventalk.org';

const scheme = (proto) => {
  return window.location.protocol === 'https:' ? `${proto}s` : proto;
}

const wsurl = `${scheme('ws')}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;
const httpurl = `${scheme('http')}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;

const apolloClientCreator = (token) => {
  let headers = token
    ? {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      }
    : {
        "content-type": "application/json"
      }

  const wsLink = new WebSocketLink({
    uri: wsurl,
    options: {
      reconnect: true,
      lazy: true,
      connectionParams: { headers }
    }
  });

  const httpLink = new HttpLink({
    uri: httpurl,
    headers
  });

  const link = split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
  );

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
  });

  return client;
}

export default apolloClientCreator;