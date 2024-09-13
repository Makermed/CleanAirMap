import {
  CONF_ADJUST_ACTIVITIES,
  AIR_QUALITY_GOOD,
  AIR_QUALITY_MEDIUM,
  AIR_QUALITY_BAD,
  CO2_QUALITY_MEDIUM,
  CO2_QUALITY_BAD,
  ACH_QUIALITY_MEDIUM,
  ACH_QUIALITY_BAD,
  AIR_QUALITY_NORMAL,
} from "../constants/maplocation";

export const get_air_quality = (location) => {
  if (location.readings[0]?.length === 0) {
    return -1;
  }
  const reading = location.readings?.reduce((prev, current) => {
    return prev.id > current.id ? prev : current;
  });

  let air_quality = AIR_QUALITY_GOOD;
  let co2 = reading?.co2;
  const ach = reading?.ach;
  if (reading?.adjusted) {
    co2 = get_adjusted_co2_level(
      reading?.co2_in,
      CONF_ADJUST_ACTIVITIES[reading?.activity].cfm,
      reading?.people_no,
      reading?.hepa_cadr,
      reading?.uvgi_cap
    );
  }

  if (
    (co2 && co2 > 0 && co2 <= CO2_QUALITY_MEDIUM) ||
    (ach && ach > 0 && ach >= ACH_QUIALITY_MEDIUM)
  ) {
    air_quality = AIR_QUALITY_GOOD;
  } else if (
    (co2 && co2 > CO2_QUALITY_MEDIUM && co2 <= CO2_QUALITY_BAD) ||
    (ach && ach >= ACH_QUIALITY_BAD && ach < ACH_QUIALITY_MEDIUM)
  ) {
    air_quality = AIR_QUALITY_MEDIUM;
  } else if (!co2) {
    air_quality = AIR_QUALITY_NORMAL;
  } else {
    air_quality = AIR_QUALITY_BAD;
  }
  return air_quality;
};
export const get_adjusted_co2_level = (
  co2,
  activity_cfm,
  people_no,
  hepa_cadr,
  uvgi_cap
) => {
  if (co2 <= 420 || people_no <= 0) {
    return -1;
  }
  let cfmPerPerson = (activity_cfm * 1000000) / (co2 - 420);
  let filteredAirPerPerson = (uvgi_cap * 1.17 + hepa_cadr) / people_no;
  return (activity_cfm * 1000000) / (cfmPerPerson + filteredAirPerPerson) + 420;
};

export const get_adjusted_ach_level = (
  co2,
  activity_cfm,
  people_no,
  room_volume,
  hepa_cadr,
  uvgi_cap
) => {
  if (co2 <= 420 || people_no <= 0 || room_volume <= 0) {
    return -1;
  }
  let cfmPerPerson = (activity_cfm * 1000000) / (co2 - 420);
  let filteredAirPerPerson = (uvgi_cap * 1.17 + hepa_cadr) / people_no;
  return ((cfmPerPerson + filteredAirPerPerson) * people_no * 60) / room_volume;
};

export const get_region_name = (region) => {
  if (!region?.region) {
    return "";
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
    subregion = "";
  }

  if (subregion) {
    return `${subregion}, ${region.region}`;
  } else {
    return region.region;
  }
};
