import Mapbox from 'react-map-gl';
import {useGetLocations} from "./getMapLocations";
import 'mapbox-gl/dist/mapbox-gl.css';
import React, {useState, useRef, useEffect} from "react";
import { makeVar} from '@apollo/client';
import {IconLayer} from '@deck.gl/layers';
import {MapView} from '@deck.gl/core';
import DeckGL from '@deck.gl/react';
import { AIR_QUALITY_INDICATOR_COLORS } from "common/constants";
import Tooltip from "../tooltip/tooltip";
import ControlPanel from './controlPanel';
import {GeolocateControl} from 'react-map-gl';

// TODO: figure out a safer way to store this if necessary.
const token = process.env.REACT_APP_MAPBOX_TOKEN;

const MAP_VIEW = new MapView({repeat: true});


const Map = () => {
  const mapLocations = makeVar([]);
  // TODO: Use the map bounds to retrieve only a subset of markers
  const mapRef = useRef(null);
  const geoControlRef = useRef(null);

  useEffect(() => {
    geoLocate();
  }, [geoControlRef]);

  const geoLocate = () => {
    if (geoControlRef.current && mapRef.current) {
      geoControlRef.current?.trigger();
    }
  }

  const [viewState, setViewState] = useState({
    longitude: -79.39,
    latitude: 43.66,
    zoom: 12});
  
  const [hoverLocation, setHoverLocation] = useState(null);

  // Get the data within the bounds of the map.
  const { data } = useGetLocations();
  if (data && data.locations) {
    // TODO: add error handling here.
    mapLocations(data.locations);
  }

  // Update the map boundaries whenever the map view changes.
  const onViewChange = (view) => {
    if (view.coords) {
      setViewState((oldViewState) => ({
        ...oldViewState,
        'longitude': view.coords.longitude,
        'latitude': view.coords.latitude,
      }));
    }
  }

  const layer = new IconLayer({
    data: mapLocations(),
    pickable: true,
    getPosition: location => {
      return [location.longitude, location.latitude];
    },
    iconAtlas: '/static/images/map/marker.svg',
    iconMapping: {marker: {x: 0, y: 0, width: 139, height: 165, mask: true}},
    id: 'icon',
    getIcon: d => 'marker',
    sizeUnits: 'meters',
    sizeScale: 2000,
    sizeMinPixels: 6,
    sizeMaxPixels: 20,
    getColor: location => {
      return AIR_QUALITY_INDICATOR_COLORS[location.avgAirQualityRating];
    },
  });
  const onclick = (e) => {
    console.log("this isn't doing anything.");
    console.log(e);
  }

  return (
    <>
    <DeckGL
      layers={[layer]}
      views={MAP_VIEW}
      initialViewState={viewState}
      controller={{dragRotate: false}}
      onViewStateChange={onViewChange}
      onClick={onclick}
      onHover={({object, x, y}) => {
        if (object) {
          setHoverLocation({show: true, location: object, x: x, y: y});
        } else {
          setHoverLocation({show: false, location: null, x: null, y: null});
        }}}
    >

      <Mapbox reuseMaps
            ref={mapRef}
            onLoad={geoLocate}
            mapboxAccessToken={token}
            mapStyle="mapbox://styles/mapbox/streets-v11">
                  <GeolocateControl onGeolocate={something => onViewChange(something)} ref={geoControlRef} />
            </Mapbox>
    </DeckGL>
    <ControlPanel />
    <Tooltip {...hoverLocation} />
    </>
  )
}

export default Map;