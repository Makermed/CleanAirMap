import { ApolloClient, InMemoryCache} from '@apollo/client';
import {resolveAirQualityRating} from 'storage/resolvers/airQualityRatingResolver';
import {resolveLocationIdToType} from 'storage/resolvers/locationTypeResolver';


export const client = new ApolloClient({
    uri: "https://graphql.raventalk.org/v1/graphql",
   // uri: "http://localhost:4000",
    cache: new InMemoryCache({
        typePolicies: {
            locations: {
                fields: {
                    avgAirQualityRating: function (value = "", {readField}){
                        const readings_aggregate = readField('readings_aggregate');
                        const average_reading =
                            readings_aggregate.aggregate.avg ? readings_aggregate.aggregate.avg : null; 
                        return resolveAirQualityRating(average_reading);
                    },
                    locationTypeName: function (value = "", {readField}){
                           const type = readField('type');
                           const locationTypeName = resolveLocationIdToType(type);
                           return locationTypeName;
                    },
                } 
            }
        }
    })
 });