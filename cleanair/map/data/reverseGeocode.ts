import { Point, Feature} from "geojson";

// TODO: Move this to the storage library and see if we can cache it.
const reverseGeocode = (feature: Feature): Promise<Feature> => {
    const reverse_url = `https://api.geoapify.com/v1/geocode/reverse?`
      + `lat=${(feature.geometry as Point).coordinates[0]}`
      + `&lon=${(feature.geometry as Point).coordinates[1]}`
      + `&type=amenity`
      + `&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_TOKEN}`;

      return fetch(reverse_url).then(resp =>
        resp.json().then(
            data => {
              return feature;
            }));
}
export { reverseGeocode }