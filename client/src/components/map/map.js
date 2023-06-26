import Mapbox from 'react-map-gl';
import {useGetLocations} from "./getMapLocations";
import 'mapbox-gl/dist/mapbox-gl.css';
import React, {useState} from "react";
import { makeVar} from '@apollo/client';
import {IconLayer} from '@deck.gl/layers';
import {MapView} from '@deck.gl/core';
import DeckGL from '@deck.gl/react';
import { AIR_QUALITY_INDICATOR_COLORS } from "common/constants";
import Tooltip from "../tooltip/tooltip";

// TODO: figure out a safer way to store this if necessary.
const token = process.env.REACT_APP_MAPBOX_TOKEN;

const MAP_VIEW = new MapView({repeat: true});

const INITIAL_VIEW_STATE = {
  longitude: -79.39,
  latitude: 43.66,
  zoom: 12,
};

const Map = () => {
  const mapRef = React.useRef(null);
  const mapLocations = makeVar([]);
  // TODO: Use the map bounds to retrieve only a subset of markers
  // eslint-disable-next-line
  const [mapBounds, setMapBounds] = useState({});
  const [hoverLocation, setHoverLocation] = useState(null);

  // Get the data within the bounds of the map.
  const { data } = useGetLocations();
  if (data && data.locations) {
    // TODO: add error handling here.
    mapLocations(data.locations);
  }

  // Update the map boundaries whenever the map view changes.
  const onViewChange = () => {
    if (mapRef.current === null) return;
    const bounds = mapRef.current.getBounds();
    setMapBounds({'lng_max': bounds.getEast(), 
                  'lng_min': bounds.getWest(),
                  'lat_max': bounds.getNorth(),
                  'lat_min': bounds.getSouth()});
  };

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
    console.log("onclick");
    console.log(e);
  }

  return (
    <div>
    <Tooltip {...hoverLocation} />
    <DeckGL
      layers={[layer]}
      views={MAP_VIEW}
      initialViewState={INITIAL_VIEW_STATE}
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
            mapboxAccessToken={token}
            mapStyle="mapbox://styles/mapbox/streets-v11"
          />
    </DeckGL>
    </div>
  )
}

export default Map;