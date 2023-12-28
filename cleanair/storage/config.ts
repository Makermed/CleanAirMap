import { ApolloClient, InMemoryCache, makeVar} from '@apollo/client';

export const client = new ApolloClient({
   // uri: "https://graphql.raventalk.org/v1/graphql",
   // uri: "http://localhost:4005",
    cache: new InMemoryCache({})
 });