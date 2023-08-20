import marker from '@iconify/icons-fa-solid/map-marker';

/* Generates a data URL for a map marker with the given location's type and air quality rating */
const getMapMarker = (location, theme) => {
    const airQualityLabel = location.avgAirQualityRating.label;
    const color = theme.air_quality_palette[airQualityLabel.toLowerCase()];
    const icon = location.locationType.icon;
    const svgString = `
      <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
        <symbol id="marker" width="30" height="40" viewBox="-2 -2 388 516">
            ${marker.body}
          </symbol>
  
        <symbol id="icon" width="22" height="22" viewBox="0 0 ${icon.width} ${icon.height}">
            ${icon.body}
        </symbol>
  
        <use href="#marker" x="0" y="0" color="${color}" stroke="${theme.palette.background.popup}" stroke-width="4" fill-opacity="1.0" />
        <use href="#icon" color="${theme.palette.background.popup}" x="4" y="4" style="opacity:1.0" />
      </svg>`
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
  }

export default getMapMarker