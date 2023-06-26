import { gql, useQuery} from "@apollo/client";

const getLocationsQuery = gql`
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
        locationTypeName @client(always: true)
        avgAirQualityRating @client(always: true)
        readings_aggregate {
            aggregate {
              avg {
                ach
                co2
              }
            }
        }
    }
}`;

export const useGetLocations = (max_results = 500) => {
    return useQuery(
        getLocationsQuery,
        { variables:
            { max_results: max_results }
        });
}

export const useGetLocationById = (locationId) => {
    return useQuery(
        gql`
            query map_locations_by_id (
            $location_id: Int!
            ) { 
                locations(where:
                    {id: {_eq: $location_id}}
                )
                {
                id
                longitude
                latitude
                }
            }`,
        { variables: { location_id: locationId } });
             
}
