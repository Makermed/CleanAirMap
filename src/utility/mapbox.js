export const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN
console.log("mixpanel", process.env.REACT_APP_MIXPANEL_TOKEN);
export const address_from_geolocation = (lng, lat) =>
  new Promise((resolve, reject) => {
    const MAPBOX_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;

    window
      .fetch(MAPBOX_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          resolve({
            error: true,
            message: "Failed to call mapbox api",
          });
        }
      })
      .then((data) => {
        if (!data || !data.features || data.features.length === 0) {
          resolve({
            error: true,
            message: "Can't find address",
          });
        } else {
          resolve({
            error: false,
            address: data.features,
          });
        }
      })
      .catch((err) => {
        resolve({
          error: true,
          message: "Failed to get address",
        });
      });
  });

export const geolocation_from_address = (address) =>
  new Promise((resolve, reject) => {
    const encoded_address = encodeURI(address);
    const MAPBOX_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encoded_address}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;

    window
      .fetch(MAPBOX_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          resolve({
            error: true,
            message: "Failed to call mapbox api",
          });
        }
      })
      .then((data) => {
        if (!data || !data.features || data.features.length === 0) {
          resolve({
            error: true,
            message: "Can't find geolocation",
          });
        } else {
          const feature = data.features[0];
          resolve({
            error: false,
            geolocation: feature.geometry.coordinates,
          });
        }
      })
      .catch((err) => {
        resolve({
          error: true,
          message: "Failed to get geolocation",
        });
      });
  });

export const position_from_mapresult = (result) => {
  let name = "";
  let suite = "";
  let address = "";
  let postcode = "";
  let locality = "";
  let place = "";
  let district = "";
  let region = "";
  let country = "";
  let latitude = null;
  let longitude = null;

  if (result.place_type.includes("poi")) {
    name = result.text;
    address = result.place_name.replace(name + ", ", "");
    longitude = result.center[0];
    latitude = result.center[1];
  }
  if (result.place_type.includes("address")) {
    suite = result.address;
    address = result.place_name;
    longitude = result.center[0];
    latitude = result.center[1];
  }
  for (let property of result.context) {
    if (property.id.includes("postcode")) {
      postcode = property.text;
    } else if (property.id.includes("locality")) {
      locality = property.text;
    } else if (property.id.includes("place")) {
      place = property.text;
    } else if (property.id.includes("district")) {
      district = property.text;
    } else if (property.id.includes("region")) {
      region = property.text;
    } else if (property.id.includes("country")) {
      country = property.text;
    }
  }

  return {
    name,
    suite,
    address,
    latitude,
    longitude,
    postcode,
    locality,
    place,
    district,
    region,
    country,
  };
};
