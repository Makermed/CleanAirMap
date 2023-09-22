import { ILocation } from '../../interfaces'
import { LocationModel, LocationModelInput, ReadingModel, RoomModel } from '../../dataTypes'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import gql from 'graphql-tag';


export class LocationDAO implements ILocation {
    client : ApolloClient<NormalizedCacheObject>;

    constructor(client : ApolloClient<NormalizedCacheObject>) {
        this.client = client;
    }

    getById(id: number) : Promise<LocationModel | null> {
        return Promise.reject(new Error("Not implemented"));
    };

    getMany(maxResults? : number) : Promise<LocationModel[]>
    {
        const listLocationsQuery = gql`
            query map_locations (
                $max_results: Int!,
            ) {
                locations (
                    limit: $max_results
                ) {
                    id
                    type
                    tag_id
                    suite
                    address
                    postcode
                    latitude
                    longitude
                    name
                    description
                    last_co2
                    created_at
                    locationType @client(always: true)
                    avgAirQualityRating @client(always: true)
                    readings_aggregate {
                        aggregate {
                            count(columns: activity)
                            avg {
                            ach
                            co2
                            }
                            max {
                            approved_at
                            }
                        }
                    }
                }
            }`;

        return this.client.query({
              query: listLocationsQuery,
              variables: { max_results: maxResults || 2 }
            }).then((resp: any ) => {
                console.log(`received data ${JSON.stringify(resp, null, 2)}`);
                return resp.data.locations.map((location: any) => ({
                    locationId: location.id,
                    name: location.name,
                    type: location.type,
                    street: location.address,
                    postcode: location.postcode,
                    country: location.country,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    description: location.description,
                    avgCo2: location.avgCo2,
                    activityCount: location.readings_aggregate.aggregate.count,
                    created_id: location.created_id,
                    created_at: location.created_at,
                  }));
                })
            .catch((error: any) => console.log(`received error ${error}`));
    };

    create(location: LocationModelInput) : Promise<LocationModel | null>
    {
        return Promise.reject(new Error("Not implemented"));
    };

    getRooms(locationId : number) : Promise<RoomModel[] | null>
    {
        return Promise.reject(new Error("Not implemented"));
    }

    getReadings(locationId: number): Promise<ReadingModel[] | null> {
        return Promise.reject(new Error("Not implemented"));
    }
}

export default LocationDAO;