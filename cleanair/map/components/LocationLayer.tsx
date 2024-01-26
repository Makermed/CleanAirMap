import { useGetMapFeatures } from '../data';
import {Source, Layer, SymbolLayer} from 'react-map-gl/maplibre';
import type {FeatureCollection} from 'geojson';

const layerStyle: SymbolLayer = {
  id: "clean-air-locations",
  type: "symbol",
  source: "reading-locations",
  layout: {
    "text-field": ["get", "name"],
    "text-variable-anchor": ["top", "bottom", "left", "right"],
    "text-radial-offset": 0.5,
    "text-justify": "auto",
    "text-allow-overlap": false,
    "symbol-avoid-edges": true,
  },
};

const LocationLayer = () => {
    const { loading, error, data } = useGetMapFeatures();
    let json : FeatureCollection | null = null;
    if (data) {
      json = data['features'][0].feature_collection;
    }
    return (
        <Source id="reading-locations" type="geojson" data={json}>
            <Layer {...layerStyle} />
        </Source>
    );
}
export default LocationLayer;