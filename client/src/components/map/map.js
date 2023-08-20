import { CollisionFilterExtension } from '@deck.gl/extensions';
import { GeolocateControl, Map, NavigationControl, useControl } from 'react-map-gl';
import { IconLayer } from '@deck.gl/layers';
import { MapboxOverlay } from '@deck.gl/mapbox';
import { getMapMarker } from "./utils";
import { useEffect, useRef, useState } from "react";
import { useListLocations } from "./data";
import { useTheme } from '@mui/material/styles';
import ControlPanel from './components/controlPanel';
import Tooltip from "./components/tooltip";
import 'mapbox-gl/dist/mapbox-gl.css';

// TODO: figure out a safer way to store this if necessary.
const token = process.env.REACT_APP_MAPBOX_TOKEN;

function DeckGLOverlay(props) {
  const deck = useControl(() => new MapboxOverlay(props));
  deck?.setProps(props);
  return null;
};

const CleanAirMap = () => {

  const theme = useTheme();
  const mapRef = useRef(null);
  const geoControlRef = useRef(null);

  const [tooltip, setTooltip] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: -79.39,
    latitude: 43.66,
    zoom: 12});

  const { data } = useListLocations();

  useEffect(() => {
    if (geoControlRef.current && mapRef.current) {
      geoControlRef.current?.trigger();
    }
  }, [geoControlRef]);

  const iconLayer = new IconLayer({
    id: 'icon',
    onHover: location => setTooltip(<Tooltip info={location} />),
    data: data?.locations,
    pickable: true,
    getPosition: location => {
      return [location.longitude, location.latitude];
    },
    getIcon: location => ({
      url: getMapMarker(location, theme),
      width: 30,
      height: 40
    }),
    sizeScale: 40,
    sizeUnits: 'pixels',
    collisionTestProps: { sizeScale: 70},
    extensions: [new CollisionFilterExtension()],
    getCollisionPriority: location => {
      // Prioritize collisions based on the number of readings.
      return location.readings_aggregate.aggregate.count;
    },
  });


  return (
    <>
      {tooltip}
      <ControlPanel />
      <Map
      reuseMaps
      ref={mapRef}
      initialViewState={viewState}
      onViewportChange={setViewState}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={token}>
        <NavigationControl />
        <GeolocateControl ref={geoControlRef} /> 
        <DeckGLOverlay layers={[iconLayer]} />
    </Map>
    </>
  );
}

export default CleanAirMap;