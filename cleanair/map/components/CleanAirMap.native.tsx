import { StyleSheet, View } from 'react-native';
import { viewState } from '../data/viewState';
import MapLibreGL from '@maplibre/maplibre-react-native';
import { useRef, useCallback } from "react";
import SearchBar from "./SearchBar";
import { Feature} from "geojson";

// Required for Android.
MapLibreGL.setAccessToken(null);

export default function CleanAirMap() {
  const mapRef = useRef(null);

  const selectSearchResult = useCallback((item: Feature) => {
    // TODO: Make this do something.
  }, []);

  return (
    <View style={styles.page}>
       <MapLibreGL.MapView
          ref={mapRef}
          style={styles.map}
          styleURL={`https://maps.geoapify.com/v1/styles/osm-liberty/style.json?apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_TOKEN}`}
       >
       <MapLibreGL.Camera defaultSettings={{
              centerCoordinate: [viewState().longitude, viewState().latitude],
              zoomLevel: viewState().zoom,
            }}/>
        </MapLibreGL.MapView>
        <SearchBar
          style={styles.searchbar}
          onPickItem={(item: any) => selectSearchResult(item)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    height: '100%',
    width:'100%'
  },
  map: {
      height: '100%',
      width:'100%'
  },
  searchbar: {
    width: '90%',
    top: 25,
    alignSelf: 'center',
    position: 'absolute',
  }
});

