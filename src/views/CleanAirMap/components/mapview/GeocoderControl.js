import * as React from "react";
import { useState } from "react";
import { useControl, Marker } from "react-map-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { ADD_LOCATION } from "../../../../constants/maplocation";
export default function GeocoderControl(props) {
  const [marker, setMarker] = useState(null);
  const Pin = ({ type, color, active }) => {
    return (
      <>
        {type ? (
          <div
            style={{
              width: 36,
              height: 36,
              backgroundImage: `url("/static/images/icons/loc_types/${type.image}`,
              backgroundColor: type.color,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundOrigin: "content-box",
              borderRadius: "50%",
              padding: "2px",
              opacity: active ? 1.0 : 0.7,
              cursor: "pointer",
              zIndex: active ? 10 : "unset",
            }}
          />
        ) : (
          <div
            style={{
              width: active ? 32 : 16,
              height: active ? 32 : 16,
              backgroundColor: color,
              borderRadius: "50%",
              position: "relative",
              display: "flex",
              cursor: "pointer",
              zIndex: active ? 10 : "unset",
            }}
          />
        )}
      </>
    );
  };

  const geocoder = useControl(
    () => {
      const ctrl = new MapboxGeocoder({
        ...props,
        marker: false,
        accessToken: props.mapboxAccessToken,
      });
      ctrl.on("loading", props.onLoading);
      ctrl.on("results", (evt) => {});
      ctrl.on("result", (evt) => {
        props.onSelectResult(evt);

        const { result } = evt;
        const location =
          result &&
          (result.center ||
            (result.geometry?.type === "Point" && result.geometry.coordinates));
        if (location && props.marker) {
          setMarker(
            <Marker
              {...props.marker}
              longitude={location[0]}
              latitude={location[1]}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                props.onClickMarker(evt);
              }}
            >
              <Pin color={ADD_LOCATION} active={true} />
            </Marker>
          );
        } else {
          setMarker(null);
        }
      });
      ctrl.on("error", props.onError);
      return ctrl;
    },
    {
      position: props.position,
    }
  );

  if (geocoder._map) {
    if (
      geocoder.getProximity() !== props.proximity &&
      props.proximity !== undefined
    ) {
      geocoder.setProximity(props.proximity);
    }
    if (
      geocoder.getRenderFunction() !== props.render &&
      props.render !== undefined
    ) {
      geocoder.setRenderFunction(props.render);
    }
    if (
      geocoder.getLanguage() !== props.language &&
      props.language !== undefined
    ) {
      geocoder.setLanguage(props.language);
    }
    if (geocoder.getZoom() !== props.zoom && props.zoom !== undefined) {
      geocoder.setZoom(props.zoom);
    }
    if (geocoder.getFlyTo() !== props.flyTo && props.flyTo !== undefined) {
      geocoder.setFlyTo(props.flyTo);
    }
    if (
      geocoder.getPlaceholder() !== props.placeholder &&
      props.placeholder !== undefined
    ) {
      geocoder.setPlaceholder(props.placeholder);
    }
    if (
      geocoder.getCountries() !== props.countries &&
      props.countries !== undefined
    ) {
      geocoder.setCountries(props.countries);
    }
    if (geocoder.getTypes() !== props.types && props.types !== undefined) {
      geocoder.setTypes(props.types);
    }
    if (
      geocoder.getMinLength() !== props.minLength &&
      props.minLength !== undefined
    ) {
      geocoder.setMinLength(props.minLength);
    }
    if (geocoder.getLimit() !== props.limit && props.limit !== undefined) {
      geocoder.setLimit(props.limit);
    }
    if (geocoder.getFilter() !== props.filter && props.filter !== undefined) {
      geocoder.setFilter(props.filter);
    }
    if (geocoder.getOrigin() !== props.origin && props.origin !== undefined) {
      geocoder.setOrigin(props.origin);
    }
    if (geocoder.getBbox() !== props.bbox && props.bbox !== undefined) {
      geocoder.setBbox(props.bbox);
    }
  }
  return marker;
}

const noop = () => {};

GeocoderControl.defaultProps = {
  marker: true,
  onLoading: noop,
  onSelectResult: noop,
  onClickMarker: noop,
  onError: noop,
};
