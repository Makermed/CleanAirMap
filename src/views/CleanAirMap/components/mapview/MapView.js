import React, { useMemo, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Badge } from "@material-ui/core";
import Map, { Marker, NavigationControl, GeolocateControl } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import {
  MAX_ARTICLE_WIDTH,
  THEME_MODE_DARK,
} from "../../../../constants/types";
import {
  CONF_AIR_QUALITY_COLORS,
  CONF_LOCATION_TYPES,
  LOCATION_TYPE_ALL,
  MASK_ALL,
  AIR_QUALITY_BAD,
  AIR_QUALITY_GOOD,
  AIR_QUALITY_MEDIUM,
  AIR_QUALITY_NORMAL,
  MAP_VIEW_ALL,
  MAP_VIEW_90D,
} from "../../../../constants/maplocation";
import { MAPBOX_ACCESS_TOKEN } from "../../../../utility/mapbox";
import { get_air_quality } from "../../../../utility/cleanair";
import GeocoderControl from "./GeocoderControl";
import { position_from_mapresult } from "../../../../utility/mapbox";
import { Typography } from "@material-ui/core";
import { logger } from "../../../../utility/logging";
import { ToastInfo } from "../../../../utility/toast";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    width: MAX_ARTICLE_WIDTH,
    maxWidth: "100%",
    margin: "0 auto",
    backgroundColor: theme.palette.background.default,
  },
  mapcontainer: {
    height: "400px",
  },
  airlevelbar: {
    position: "absolute",
    backgroundColor: "#404040",
    padding: "4px 0px",
    zIndex: 1,
    top: 410,
    left: 0,
    width: 108,
    height: 36,
    marginLeft: "12px",
    borderRadius: "18px",
    border: "2px solid #777070",
    opacity: 0.9,
  },
  limitbtn: {
    position: "absolute",
    backgroundColor: "#404040",
    zIndex: 1,
    top: 410,
    left: 0,
    width: 36,
    height: 36,
    padding: 4,
    borderRadius: "50%",
    border: "2px solid #777070",
    textAlign: "center",
    opacity: 0.9,
  },
  limittxt: {
    fontSize: "14px",
    fontWeight: 200,
    marginTop: 2,
    cursor: "pointer",
    color: "white",
  },
  modbtn: {
    position: "absolute",
    cursor: "pointer",
    backgroundColor: "#404040",
    zIndex: 1,
    top: 410,
    right: 48,
    width: 36,
    height: 36,
    padding: 4,
    borderRadius: "50%",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: theme.palette.text.primary,
  },
  modbtn_disabled: {
    position: "absolute",
    backgroundColor: "#404040",
    zIndex: 1,
    top: 410,
    right: 48,
    width: 36,
    height: 36,
    padding: 4,
    borderRadius: "50%",
    border: "2px solid #777070",
    opacity: 0.38,
  },
  modicon: {
    width: 24,
    height: 24,
  },
  badge: {
    top: 0,
    right: 0,
    backgroundColor: "red",
    color: "white",
  },
}));

const Pin = ({
  type,
  color,
  active,
  isMaskFriendly,
  co2,
  isMaskRequired,
  isTextOnlyReading,
}) => {
  const staticStyle = {
    img: "",
    color: isTextOnlyReading ? "#646b6e" : color,
  };
  const maskStyle = {
    img: "mask.png",
    color: "#F29900",
  };
  const timerStyle = {
    img: "stopwatch.png",
    color: co2 ? color : "#8a00ff",
  };
  const styles = isMaskFriendly
    ? timerStyle
    : isMaskRequired
    ? maskStyle
    : staticStyle;
  return (
    <>
      {type ? (
        <div
          style={{
            width: 36,
            height: 36,
            backgroundImage: `url("/static/images/icons/loc_types/${type.image}`,
            backgroundColor: isTextOnlyReading ? "#646b6e" : color,
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
            backgroundColor: styles.color,
            borderRadius: "50%",
            position: "relative",
            display: "flex",
            cursor: "pointer",
            zIndex: active ? 10 : "unset",
            backgroundImage: `url("/static/images/icons/dark/${styles.img}`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        />
      )}
    </>
  );
};

const MapView = (props) => {
  const map = React.useRef();
  const loggedLocationTypesRef = React.useRef(null);
  const classes = useStyles();

  const centerpos_lng =
    props.center_pos[0] === null ? -79.39 : props.center_pos[0];
  const centerpos_lat =
    props.center_pos[1] === null ? 43.66 : props.center_pos[1];

  const [zoom, setZoom] = useState(props.zoom);
  const [bounds, setBounds] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeQualities, setActiveQualities] = useState([
    AIR_QUALITY_GOOD,
    AIR_QUALITY_MEDIUM,
    AIR_QUALITY_BAD,
    AIR_QUALITY_NORMAL,
  ]);

  const handleMapClick = useCallback(
    (e) => {
      var coordinates = e.lngLat;
      props.onClick(coordinates);
    },
    [props]
  );

  const onMapLoad = useCallback(() => {
    map.current.on("click", handleMapClick);
    const currentBounds = map.current.getBounds();
    setBounds(currentBounds);

    const mapBounds = [
      currentBounds?._sw.lng,
      currentBounds?._sw.lat,
      currentBounds?._ne.lng,
      currentBounds?._ne.lat,
    ];
    props.onChangeMap(centerpos_lng, centerpos_lat, zoom, mapBounds);
  }, [handleMapClick]);

  const markers = useMemo(() => {
    let locations = props.locations.slice();

    // filter by dday
    if (props.map_view_mode !== MAP_VIEW_ALL) {
      const dt = new Date() - 86400 * 90 * 1000;
      locations = locations.filter(
        (location) => Date.parse(location.created_at) >= dt
      );
    }

    // filter by location
    if (props.locationtype !== LOCATION_TYPE_ALL) {
      locations = locations.filter(
        (location) => location.type === props.locationtype
      );
      if (
        locations.length === 0 &&
        loggedLocationTypesRef.current !== props.locationtype
      ) {
        loggedLocationTypesRef.current = props.locationtype;
        ToastInfo("No such locations added");
      } else {
        loggedLocationTypesRef.current = null;
      }
    } else {
      loggedLocationTypesRef.current = null;
    }

    // filter by mask
    if (props.mask !== MASK_ALL) {
      locations = locations.filter((location) => {
        try {
          const reading = location.readings.reduce((prev, current) => {
            return prev.id > current.id ? prev : current;
          });
          return reading.mask === props.mask;
        } catch (err) {
          return false;
        }
      });
    }

    // filter by active qualities
    locations = locations.filter((location) => {
      const air_quality = get_air_quality(location);
      if (air_quality < 0) {
        return false;
      }
      return (
        activeQualities.find((quality) => quality === air_quality) !== undefined
      );
    });

    // filter by tags
    if (props.tags.length > 0) {
      const tag_ids = props.tags.map((tag) => tag.id);
      locations = locations.filter((location) =>
        tag_ids.includes(location.tag_id)
      );
    }

    if (locations.length === 0) {
      return <></>;
    }

    return locations.map((location, index) => {
      const air_quality = get_air_quality(location);
      let isco2 = false;
      let isMaskHoursEnable = false;
      let isMaskRequired = false;
      let isTextOnlyReading = false;
      const reading = location.readings.reduce((prev, current) => {
        return prev.id > current.id ? prev : current;
      });
      isco2 = reading.co2 === null && reading.co2_in === -1 ? false : true;
      if (reading.location_mask_friendly_hours?.length > 0) {
        isMaskHoursEnable = true;
      }

      if (
        reading.co2 === null &&
        reading.co2_in === -1 &&
        (reading.mask === 2 || reading.mask === 1)
      ) {
        isMaskRequired = true;
      }
      if (
        reading.co2 === null &&
        reading.co2_in === -1 &&
        reading.mask === 0 &&
        reading.location_mask_friendly_hours.length === 0
      ) {
        isTextOnlyReading = true;
      }
      let loctype = null;
      if (
        location.type === props.locationtype &&
        (props.mask === MASK_ALL ||
          (props.mask !== MASK_ALL && location.mask === props.mask))
      ) {
        loctype = CONF_LOCATION_TYPES.find(
          (item) => item.value === location.type
        );
        if (!loctype) {
          loctype = null;
        }
      }

      return (
        <div
          key={`location-${index}`}
          style={{ display: "flex" }}
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(-1)}
        >
          <Marker
            longitude={location.longitude}
            latitude={location.latitude}
            anchor="center"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              props.onClickLocation(location);
            }}
          >
            <Pin
              type={loctype}
              color={CONF_AIR_QUALITY_COLORS[air_quality].color}
              active={index === activeIndex}
              isMaskFriendly={isMaskHoursEnable}
              co2={isco2}
              isMaskRequired={isMaskRequired}
              isTextOnlyReading={isTextOnlyReading}
            />
          </Marker>
        </div>
      );
    });
  }, [
    props.locations.length,
    props.locationtype,
    props.mask,
    props.tags,
    activeQualities,
    activeIndex,
  ]);

  const onMoveEnd = useCallback((e) => {
    const currentBounds = map.current.getBounds();
    setBounds(currentBounds);

    const mapBounds = [
      currentBounds?._sw.lng,
      currentBounds?._sw.lat,
      currentBounds?._ne.lng,
      currentBounds?._ne.lat,
    ];
    const viewState = e.viewState;
    props.onChangeMap(
      viewState.longitude,
      viewState.latitude,
      viewState.zoom,
      mapBounds
    );
  }, []);

  const onSelectSearchResult = (evt) => {
    logger.log("onSelectSearchResult :", evt.result);
    const position = position_from_mapresult(evt.result);
    props.onSelectSearchResult(position);
  };

  const onClickMarker = (evt) => {
    logger.log("onClickMarker :", evt.result);
    const position = position_from_mapresult(evt.result);
    props.onClickSearchResult(position);
  };

  const handleClickQuality = (quality) => {
    let new_qualities = activeQualities.slice();
    if (activeQualities.find((value) => value === quality) !== undefined) {
      new_qualities = activeQualities.filter((value) => value !== quality);
    } else {
      new_qualities.push(quality);
    }
    setActiveQualities(new_qualities);
    props.onChangeQualities(new_qualities);
  };

  // control position
  const width =
    document.documentElement.clientWidth ||
    document.body.clientWidth ||
    window.innerWidth;
  let quality_position = 0;
  if (width > MAX_ARTICLE_WIDTH) {
    quality_position = (width - MAX_ARTICLE_WIDTH) / 2 + 12;
  }
  let limit_position = 130;
  if (width > MAX_ARTICLE_WIDTH) {
    limit_position = (width - MAX_ARTICLE_WIDTH) / 2 + 12 + 130;
  }
  let note_position = 48;
  if (width > MAX_ARTICLE_WIDTH) {
    note_position = (width - MAX_ARTICLE_WIDTH) / 2 + 48;
  }

  // map bound
  const mapBounds = [
    bounds?._sw.lng,
    bounds?._sw.lat,
    bounds?._ne.lng,
    bounds?._ne.lat,
  ];
  logger.log("map bounds :", mapBounds);

  return (
    <div className={classes.root}>
      <div className={classes.airlevelbar} style={{ left: quality_position }}>
        {CONF_AIR_QUALITY_COLORS.map(
          (quality, index) =>
            quality.value !== AIR_QUALITY_NORMAL && (
              <div
                key={`quality-${index}`}
                style={{
                  display: "inline-block",
                  cursor: "pointer",
                  width: 24,
                  height: 24,
                  backgroundColor: `${quality.color}`,
                  opacity:
                    activeQualities.find((value) => value === quality.value) !==
                      undefined && quality.value !== AIR_QUALITY_NORMAL
                      ? 1.0
                      : 0.27,
                  borderRadius: "50%",
                  marginLeft: 8,
                }}
                onClick={(e) => handleClickQuality(quality.value)}
              />
            )
        )}
      </div>
      <div
        className={classes.limitbtn}
        style={{ left: limit_position }}
        onClick={props.onChangeMapViewMode}
      >
        {props.map_view_mode === MAP_VIEW_ALL && (
          <Typography className={classes.limittxt}>All</Typography>
        )}
        {props.map_view_mode === MAP_VIEW_90D && (
          <Typography className={classes.limittxt}>90D</Typography>
        )}
      </div>

      {props.notifications > 0 ? (
        <div className={classes.modbtn} style={{ right: note_position }}>
          <Badge
            classes={{ badge: classes.badge }}
            badgeContent={"2"}
            overlap="rectangular"
          >
            <img
              className={classes.modicon}
              src={`/static/images/icons/dark/moderator.png`}
              alt="notifications"
            />
          </Badge>
        </div>
      ) : (
        <div
          className={classes.modbtn_disabled}
          style={{ right: note_position }}
        >
          <img
            className={classes.modicon}
            src={`/static/images/icons/dark/moderator.png`}
            alt="notifications"
          />
        </div>
      )}

      <Map
        initialViewState={{
          latitude: centerpos_lat,
          longitude: centerpos_lng,
          zoom: zoom,
          bearing: 0,
          pitch: 0,
        }}
        ref={map}
        style={{ height: 400 }}
        mapStyle={
          props.theme_mode === THEME_MODE_DARK
            ? "mapbox://styles/mapbox/dark-v10"
            : "mapbox://styles/mapbox/light-v10"
        }
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        onLoad={onMapLoad}
        onMoveEnd={onMoveEnd}
      >
        <NavigationControl position="bottom-right" />
        <GeolocateControl position="bottom-right" />
        <GeocoderControl
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          position="top-left"
          mapboxgl={mapboxgl}
          bbox={mapBounds}
          onSelectResult={onSelectSearchResult}
          onClickMarker={onClickMarker}
        />

        {markers}
      </Map>
    </div>
  );
};

MapView.propTypes = {
  className: PropTypes.string,
  theme_mode: PropTypes.string,
  center_pos: PropTypes.array,
  map_view_mode: PropTypes.number,
  locations: PropTypes.array,
  notificatons: PropTypes.number,
  mask: PropTypes.number,
  locationtype: PropTypes.number,
  tags: PropTypes.array,
  onClick: PropTypes.func,
  onChangeMap: PropTypes.func,
  onChangeMapViewMode: PropTypes.func,
  onChangeQualities: PropTypes.func,
  onClickLocation: PropTypes.func,
  onClickSearching: PropTypes.func,
};

export default MapView;
