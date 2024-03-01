const autocomplete_endpoint = "https://api.geoapify.com/v1/geocode/autocomplete";

const queryAutoComplete =
    async (searchText: string, longitude: number, latitude: number) : Promise<any> => {
        const suggest_request = autocomplete_endpoint
                + `?text=${encodeURIComponent(searchText)}`
                + `&bias=proximity:${longitude},${latitude}`
                + `&type=amenity`
                + `&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_TOKEN}`;

        return fetch(suggest_request)
            .then(resp => resp.json().then(json => json.features))
            .catch((error) => {
                console.error('Fetch Error:', error);
            });
    }
export default queryAutoComplete;