import { StyleSheet, View } from 'react-native';
import { viewState } from '../data/viewState';
import MapLibreGL from '@maplibre/maplibre-react-native';
import { useRef, useCallback, useState } from "react";
import SearchBar from "../search/SearchBar";
import { Feature, Point} from "geojson";
import NewLocationForm from './NewLocationForm';
import LocationMarker from './Marker';

// Required for Android.
MapLibreGL.setAccessToken(null);

export default function CleanAirMap() {
  const mapRef = useRef(null);
  const cameraRef = useRef<MapLibreGL.Camera | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Feature | null>(null);
  const [showNewLocationForm, setShowNewLocationForm] = useState<boolean>(false);

  const selectSearchResult = useCallback((item: Feature) => {
    cameraRef.current?.flyTo((item.geometry as Point).coordinates);
    setSelectedLocation(item as Feature);
  }, []);

  return (
    <View style={styles.page}>
        {showNewLocationForm != false && selectedLocation != null &&
          <NewLocationForm onClose={() => setShowNewLocationForm(false)} location={selectedLocation!} />}
       <MapLibreGL.MapView
          ref={mapRef}
          style={styles.map}
          styleURL={`https://maps.geoapify.com/v1/styles/osm-liberty/style.json?apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_TOKEN}`}
       >
       <MapLibreGL.Camera
          ref={cameraRef}
          defaultSettings={{
              centerCoordinate: [viewState().longitude, viewState().latitude],
              zoomLevel: viewState().zoom,
            }}/>
        {selectedLocation && <MapLibreGL.MarkerView
          id="marker-view"
          coordinate={(selectedLocation.geometry as Point).coordinates}>
            <LocationMarker
              onAddNewLocation={() => setShowNewLocationForm(true)}
              onClose={() => setSelectedLocation(null)}
              location={selectedLocation} />
            </MapLibreGL.MarkerView>
        }
        </MapLibreGL.MapView>
        <SearchBar
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
  }
});
