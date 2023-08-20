import { gql, useQuery} from "@apollo/client";

const useGetLocationById = (locationId) => {
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

export default useGetLocationById;