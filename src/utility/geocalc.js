// (mean) radius of Earth (meters)
// const R = 6378137;

var RADII = {
  km: 6371.187,
  mi: 3958.872,
  m: 6371187,
  nmi: 3440.166,
};

const fromRad = (x) => {
  return (x * 180.0) / Math.PI;
};
const toRad = (x) => {
  return (x * Math.PI) / 180.0;
};

/*
 * Get geo location with offset (in unit) from a geo location in decimal format based on Haversine offset formula
 * x    : the longitudinal axis (East / West)
 * y    : the latitudinal axis (North / South)
 * unit : distance unit in km, mi, m, nmi
 */
export const haversineOffset = (a, offset, unit = "km") => {
  const radius = unit in RADII ? RADII[unit] : RADII.km;

  const aLat = a.latitude || a.lat;
  const aLng = a.longitude || a.lng;
  const x = offset.x;
  const y = offset.y;

  const dLat = y / radius;
  const dLng = x / (radius * Math.cos(toRad(aLat)));

  return {
    lat: aLat + fromRad(dLat),
    lng: aLng + fromRad(dLng),
  };
};

export const haversineOffsetRange = (a, range, unit = "km") => {
  const x = range / 2;
  const y = range / 2;

  const offset_e = { x: x, y: 0 };
  const offset_w = { x: -x, y: 0 };
  const offset_n = { x: 0, y: y };
  const offset_s = { x: 0, y: -y };
  const loc_e = this.haversineOffset(a, offset_e, unit);
  const loc_w = this.haversineOffset(a, offset_w, unit);
  const loc_n = this.haversineOffset(a, offset_n, unit);
  const loc_s = this.haversineOffset(a, offset_s, unit);

  return {
    x: [loc_w.lng, loc_e.lng],
    y: [loc_s.lat, loc_n.lat],
  };
};

/*
 * Get distance (in unit) between two geo locations based on Haversin formula.
 * from : geo location of start point in decimal format
 * to   : geo location of end point in decimal format
 * unit : distance unit in km, mi, m, nmi
 */
export const haversine = (from, to, unit = "km") => {
  const radius = unit in RADII ? RADII[unit] : RADII.km;

  const dLat = toRad(to.lat - from.lat);
  const dLng = toRad(to.lng - from.lng);
  const fromLat = toRad(from.lat);
  const toLat = toRad(to.lat);

  var a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLng / 2), 2) * Math.cos(fromLat) * Math.cos(toLat);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return radius * c;
};
