import { gql, useQuery} from "@apollo/client";

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

const useListLocations = (max_results = 500) => {
    return useQuery(
        listLocationsQuery,
        { variables:
            { max_results: max_results }
        });
}

export default useListLocations;