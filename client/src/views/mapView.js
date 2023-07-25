import React, { useRef } from 'react';
import Map from "components/map/map";
import {MapProvider} from 'react-map-gl';

const MapView = () => {
  return (
   <MapProvider>
      <div style={{ height: '100vh' }}>
        <Map />
      </div>
    </MapProvider>
  );
};

export default MapView;