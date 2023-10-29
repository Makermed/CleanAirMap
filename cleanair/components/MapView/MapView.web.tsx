import { StyleSheet, Platform } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import Map, {MapRef, Marker} from 'react-map-gl';
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import mapboxgl from 'mapbox-gl';

const token = 'pk.ACCESS_TOKEN';
const styleUrl = 'STYLE_URL';

export default function Main() {
  const mapRef = useRef(null);

  const onClick = useCallback((evt: mapboxgl.MapLayerMouseEvent) => {
      // If a tooltip is displaying, assume it to be the target.
    const targetItem = mapRef.current?.queryRenderedFeatures(evt.point, {layers: ['poi-label']});
    if (targetItem) {
      console.log(targetItem);
    }
  }, []);

    return (
      <View style={styles.page}>
         <Map reuseMaps ref={mapRef} onClick={onClick} style={styles.map} mapboxAccessToken={token} mapStyle={styleUrl}/>
      </View>
    );
};

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
