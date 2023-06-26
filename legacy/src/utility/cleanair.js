import {
  AIR_QUALITY_GOOD,
  AIR_QUALITY_MEDIUM,
  AIR_QUALITY_BAD,
  CO2_QUALITY_MEDIUM,
  CO2_QUALITY_BAD,
  ACH_QUIALITY_MEDIUM,
  ACH_QUIALITY_BAD
} from "constants/maplocation";

export const get_air_quality = (location) => {
  const reading = location.readings.reduce((prev, current) => {
    return (prev.id > current.id) ? prev : current
  });

  let air_quality = AIR_QUALITY_GOOD;
  if ((reading.co2 && reading.co2 <= CO2_QUALITY_MEDIUM) || (reading.ach && reading.ach >= ACH_QUIALITY_MEDIUM)) {
    air_quality = AIR_QUALITY_GOOD;
  } else if (
    (reading.co2 && reading.co2 > CO2_QUALITY_MEDIUM && reading.co2 <= CO2_QUALITY_BAD) ||
    (reading.ach && reading.ach >= ACH_QUIALITY_BAD && reading.ach < ACH_QUIALITY_MEDIUM)
  ) {
    air_quality = AIR_QUALITY_MEDIUM;
  } else {
    air_quality = AIR_QUALITY_BAD;
  }

  return air_quality;
};

export const get_region_name = region => {
  if (!region.region) {
    return '';
  }

  // use place(city) and region(state)
  if (region.place && region.region) {
    return `${region.place}, ${region.region}`;
  }

  // order => locality, place, district, region, country
  let subregion = "";
  if (region.place) {
    subregion = region.place;
  } else if (region.district) {
    subregion = region.district;
  } else if (region.locality) {
    subregion = region.locality;
  } else {
    subregion = '';
  }

  if (subregion) {
    return `${subregion}, ${region.region}`
  } else {
    return region.region;
  }
};
  