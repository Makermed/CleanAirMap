import React, { useRef, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/styles';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
  MAX_ARTICLE_WIDTH, 
  THEME_MODE_DARK,
} from "constants/types";
import {
  CONF_AIR_QUALITY_COLORS,
  CONF_LOCATION_TYPES,
  LOCATION_TYPE_ALL,
  MASK_ALL
} from "constants/maplocation";
import {
  MAPBOX_ACCESS_TOKEN
} from "utility/mapbox";
import {
  get_air_quality
} from "utility/cleanair";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: MAX_ARTICLE_WIDTH,
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: theme.palette.background.default,
  },
  mapcontainer: {
    height: "400px"
  },
  sidebar: {
    position: "absolute",
    backgroundColor: "#23374B",
    color: "#fff",
    padding: "6px 12px",
    fontFamily: "monospace",
    zIndex: 1,
    top: 64,
    left: 0,
    margin: "12px",
    borderRadius: "4px",
    opacity: 0.8,
  },
  airlevelbar: {
    position: "absolute",
    backgroundColor: "#404040",
    padding: "4px 0px",
    zIndex: 1,
    top: 380,
    left: 0,
    width: 132,
    height: 44,
    margin: "12px",
    borderRadius: "24px",
    border: "2px solid #777070"
  },
  marker: {
    backgroundImage: "url('/static/images/icons/location-pin.png')",
    backgroundSize: "cover",
    width: "40px",
    height: "40px",
    cursor: "pointer",
  },
}));

const MapView = (props) => {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const classes = useStyles();

  const [zoom, setZoom] = useState(13);
  const [markers, setMarkers] = useState([]);

  const handleMapClick = useCallback((e) => {
    // console.log("map clicked :", e.lngLat);
    var coordinates = e.lngLat;
    props.onClick(coordinates);
  }, [props]);

  useEffect(() => {
    if (map.current) {
      return; // initialize map only once
    }
    
    const centerpos_lng = props.center_pos[0] === null ? -79.39 : props.center_pos[0];
    const centerpos_lat = props.center_pos[1] === null ? 43.66 : props.center_pos[1];

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: props.theme_mode === THEME_MODE_DARK ? 'mapbox://styles/mapbox/dark-v10' : 'mapbox://styles/mapbox/light-v10',
      // style: 'mapbox://styles/mapbox/light-v10',
      center: [centerpos_lng, centerpos_lat],
      zoom: zoom,
      logoPosition: 'top-right',
      attributionControl: false
    });

    // click position
    // map.current.on('style.load', function() {
    map.current.on('load', function() {
      // map.current.on('click', function(e) {
      //   var coordinates = e.lngLat;
      //   // console.log("map clicked :", coordinates);
      //   props.onClick(coordinates);
      //   // new mapboxgl.Popup()
      //   //   .setLngLat(coordinates)
      //   //   .setHTML('you clicked here: <br/>' + coordinates)
      //   //   .addTo(map.current);
      // });
      map.current.on('click', handleMapClick);
    });

    // Add zoom and rotation controls to the map.
    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // Add geolocate control to the map.
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true
    });
    map.current.addControl(geolocate, 'bottom-right');
    map.current.getCanvas().style.cursor = `url("/static/images/icons/${props.theme_mode}/map-cursor.png"), auto`;

    geolocate.on('geolocate', (e) => {
      new mapboxgl.Marker({
        color: "#FF0000"
      })
      .setLngLat([e.coords.longitude, e.coords.latitude])
      .addTo(map.current);
    });
    
    // // make a marker for each feature and add it to the map
    // new mapboxgl.Marker()
    //   .setLngLat([lng, lat])
    //   .addTo(map.current);
  }, [props.theme_mode, props.center_pos, zoom, handleMapClick]);

  // get center position
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

    map.current.on('move', () => {
      props.onMoveCenter(map.current.getCenter().lng, map.current.getCenter().lat);
      // setLng(map.current.getCenter().lng);
      // setLat(map.current.getCenter().lat);
      setZoom(map.current.getZoom());
    });
  });

  const drawMarkers = useCallback(() => {
    if (markers.length > 0) {
      for (var i = markers.length - 1; i >= 0; i--) {
        markers[i].remove();
      }
    }

    let locations = props.locations.slice();
    if (props.locationtype !== LOCATION_TYPE_ALL) {
      locations = props.locations.filter(location => location.type === props.locationtype);
    }
    if (props.mask !== MASK_ALL) {
      locations = locations.filter(location => {
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

    if (locations.length > 0) {
      let new_markers = [];
      for (let location of locations) {
        const el = document.createElement('div');
        const air_quality = get_air_quality(location);

        let style = `width:16px;height:16px;background-color:${CONF_AIR_QUALITY_COLORS[air_quality].color};border-radius:50%;display:inline-block;z-index:10;`;
        if (location.type === props.locationtype && (props.mask === MASK_ALL || (props.mask !== MASK_ALL && location.mask === props.mask))) {
          const loctype = CONF_LOCATION_TYPES.find(item => item.value === location.type);
          if (loctype !== undefined) {
            style = `background-image:url("/static/images/icons/loc_types/${loctype.image}");background-color:${loctype.color};background-size:cover;background-repeat:no-repeat;background-origin:content-box;width:36px;height:36px;border-radius:50%;padding:2px;cursor:pointer;z-index:10`;
          }
        }
        
        el.setAttribute('style', style);
        
        let marker = new mapboxgl.Marker(el)
        .setLngLat([location.longitude, location.latitude])
        .addTo(map.current);
        marker.getElement().addEventListener('click', (e) => {
          e.stopPropagation();
          props.onClickLocation(location);
        });
        marker.getElement().addEventListener('mouseenter', (e) => {
          // console.log("marker mouse enter :", e);
          e.stopPropagation();
          // props.onClickLocation(location);
        });
        marker.getElement().addEventListener('mouseleave', (e) => {
          // console.log("marker mouse leave :", e);
          e.stopPropagation();
          // props.onClickLocation(location);
        });
        new_markers.push(marker);
      }

      setMarkers(new_markers);
    }
  }, [props]);

  // draw markers
  useEffect(() => {
    if (!map.current) return;

    drawMarkers();
  }, [drawMarkers]);

  // control position
  const width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
  let position = 0;
  if (width > MAX_ARTICLE_WIDTH) {
    position = (width - MAX_ARTICLE_WIDTH) / 2 + 12;
  } 

  return (
    <div className={classes.root}>
      {/* <div className={classes.sidebar} style={{left: position}}>
        Lng: {cursorLng.toFixed(5)} | Lat: {cursorLat.toFixed(5)} | Zoom: {zoom.toFixed(2)}
      </div> */}
      <div className={classes.airlevelbar} style={{left: position}}>
        {CONF_AIR_QUALITY_COLORS.map((quality, index) => 
          <div
            key={`quality-${index}`}
            style={{
              display: "inline-block",
              width: 32,
              height: 32,
              backgroundColor: `${quality.color}`,
              borderRadius: "50%",
              marginLeft: 8,
            }}
          />
        )}
      </div>
      <div ref={mapContainer} className={`${classes.mapcontainer} mapboxgl-map`} />
    </div>
  );
}

MapView.propTypes = {
  className: PropTypes.string,
  center_pos: PropTypes.array,
  locations: PropTypes.array,
  mask: PropTypes.number,
  locationtype: PropTypes.number,
  onClick: PropTypes.func,
  onMoveCenter: PropTypes.func,
  onClickLocation: PropTypes.func
};

export default MapView;
