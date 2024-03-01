import { StyleSheet, View } from 'react-native';
import MapGL, { MapRef, Marker, ViewState } from 'react-map-gl/maplibre';
import { useRef, useState, useCallback, useEffect } from "react";
import { LngLatLike } from 'maplibre-gl';
import { router } from 'expo-router'
import type { Point, Feature} from "geojson";
import { viewState } from '../data';
import NewLocationForm from './NewLocationForm';
import distance from '@turf/distance';
import SearchBar from "../search/SearchBar";
import LocationMarker from './Marker';
import LocationLayer from './LocationLayer';

import 'maplibre-gl/dist/maplibre-gl.css';


export default function CleanAirMap() {

  useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapRef | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Feature | null>(null);
  const [showNewLocationForm, setShowNewLocationForm] = useState<boolean>(false);

  const selectSearchResult = useCallback((item: Feature) => {
    mapRef?.current?.flyTo(
      { center: (item.geometry as Point).coordinates as LngLatLike});
    setSelectedLocation(item as Feature);
  }, []);

  const onClickMap = useCallback((evt: maplibregl.MapLayerMouseEvent, selectedFeature: Feature) => {
    if (!mapRef.current) {
      return;
    }
    // Look for a POI that was clicked on directly first.
    let targetItem : Feature | undefined = mapRef?.current?.queryRenderedFeatures(evt.point)
      ?.filter(a => a.sourceLayer == "poi" && a.properties.name?.length > 0)
      ?.[0];

    // If there isn't an open popup and no POI was clicked on directly, look for the closest POI within
    // 100 meters.
    // We can assume that if a location was alrady selected, the user was just clicking
    // away from the popup to dismiss it.
    // Note that the callback doesn't seem to have access to the up-to-date selectedLocation state, so
    // I passed it in as a parameter. I suspect this is a sign I'm doing something wrong.
    if (!targetItem && !selectedFeature) {
      targetItem = mapRef?.current?.querySourceFeatures('default', { sourceLayer: 'poi' })
        ?.filter(item => item.properties.name?.length > 0)
        ?.filter(item => distance(evt.lngLat.toArray(), (item.geometry as Point).coordinates, {units: 'meters'}) < 100)
        ?.reduce((closest, current) => {
          if (!closest) {
            return current;
          }
          const distanceToCurrent =  distance(evt.lngLat.toArray(), (current.geometry as Point).coordinates, {units: 'meters'});
          const distanceToClosest =  distance(evt.lngLat.toArray(), (closest.geometry as Point).coordinates, {units: 'meters'});
          return (distanceToClosest < distanceToCurrent) ? closest : current;
        }, undefined as Feature | undefined);
    }

    evt.preventDefault();
    setSelectedLocation(targetItem ?? null);
    return;
  }, []);

  const handleMapMove = useCallback((state: ViewState) => {
    if (router == null) {
      return;
    }
    viewState(state);
  }, []);

  useEffect(() => {
    console.log("shownew location form changed");
  }, [showNewLocationForm]);

  console.log(showNewLocationForm);
    return (
      <View style={styles.page}>
        {showNewLocationForm != false && selectedLocation != null &&
          <NewLocationForm onClose={() => setShowNewLocationForm(false)} location={selectedLocation!} />}
         <MapGL reuseMaps
            initialViewState = {viewState()}
            ref={mapRef}
            onClick={(e) => onClickMap(e, selectedLocation as Feature)}
            onMove={e => handleMapMove(e.viewState)}
            style={styles.map}
            mapStyle={`https://maps.geoapify.com/v1/styles/osm-bright/style.json?apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_TOKEN}`}>
            {selectedLocation && <Marker
                anchor='bottom'
                latitude={(selectedLocation.geometry as Point).coordinates[1]}
                longitude={(selectedLocation.geometry as Point).coordinates[0]}
                >
                <LocationMarker
                  onAddNewLocation={() => setShowNewLocationForm(true)}
                  onClose={() => setSelectedLocation(null)}
                  location={selectedLocation}
                />
              </Marker>
            }
            <LocationLayer />
        </MapGL>
        <SearchBar
          onPickItem={(item: any) => selectSearchResult(item)}/>
        </View>
    );
};

const styles = StyleSheet.create({
  page: {
    flex: 2,
  },
  map: {
      flex: 1,
  }
});
