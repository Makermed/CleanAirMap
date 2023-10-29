import { StyleSheet, Platform } from 'react-native';

import { Text, View } from '../../components/Themed';
import Mapbox from '@rnmapbox/maps';
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { featureCollection, feature, point } from '@turf/helpers';

const token = 'pk.ACCESS_TOKEN';
const styleUrl = 'STYLE_URL';


Mapbox.setWellKnownTileServer(Mapbox.TileServers.Mapbox);
Mapbox.setAccessToken(token);

export default function Main() {
  const mapRef = useRef(null);

  const onPress = useCallback((e: GeoJSON.Feature) => {
    const aFeature = feature(e.geometry);
    aFeature.id = `${Date.now()}`;

    console.log(e);
    }, []);
       //    
  //  </View>
  return (
    <View style={styles.page}>
       <Mapbox.MapView ref={mapRef} style={styles.map} styleURL={styleUrl}/>
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
