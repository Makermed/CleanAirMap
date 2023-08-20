import { ApolloClient, InMemoryCache} from '@apollo/client';
import { avgAirQualityRatingFieldPolicy, locationTypeFieldPolicy } from 'storage/resolvers';

export const client = new ApolloClient({
    uri: "https://graphql.raventalk.org/v1/graphql",
   // uri: "http://localhost:4000",
    cache: new InMemoryCache({
        typePolicies: {
            locations: {
                fields: {
                    avgAirQualityRating: avgAirQualityRatingFieldPolicy,
                    locationType: locationTypeFieldPolicy,
                } 
            }
        }
    })
 });