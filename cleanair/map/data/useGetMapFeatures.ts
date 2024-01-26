import { gql, useQuery} from "@apollo/client";

const useGetMapFeatures = () => {
    return useQuery(
        gql`
            query get_map_features { 
                features {
                    feature_collection
                }
            }`
    );       
}

export default useGetMapFeatures;