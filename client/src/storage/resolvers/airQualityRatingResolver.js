import { AIR_QUALITY_RATING } from 'common/constants';

const CO2_QUALITY_LOWER_BOUNDARIES = {
    GOOD: 400,
    MODERATE: 800,
    BAD: 1000
};

const ACH_QUALITY_LOWER_BOUNDARIES = {
    BAD: 0,
    MODERATE: 3,
    GOOD: 6
};

export const resolveAirQualityRating = (val) => {
    if (!val) return AIR_QUALITY_RATING.UNKNOWN;
    // Use CO2 if it's available. ACH isn't likely to be directly measured.
    if (val.co2) {
        if (val.co2 < CO2_QUALITY_LOWER_BOUNDARIES.GOOD) { 
            return AIR_QUALITY_RATING.UNKNOWN;
        }
        if (val.co2 < CO2_QUALITY_LOWER_BOUNDARIES.MODERATE) {
            return AIR_QUALITY_RATING.GOOD;
        }
        if (val.co2 < CO2_QUALITY_LOWER_BOUNDARIES.BAD) {
            return AIR_QUALITY_RATING.MODERATE;
        }
        return AIR_QUALITY_RATING.BAD;
    }

    // If there isn't CO2, use ACH.
    if (val.ach) {
        if (val.ach < ACH_QUALITY_LOWER_BOUNDARIES.GOOD) {
            return AIR_QUALITY_RATING.UNKNOWN;
        }
        if (val.ach < ACH_QUALITY_LOWER_BOUNDARIES.MODERATE) {
            return AIR_QUALITY_RATING.GOOD;
        }
        if (val.ach < ACH_QUALITY_LOWER_BOUNDARIES.BAD) {
            return AIR_QUALITY_RATING.MODERATE;
        }
        return AIR_QUALITY_RATING.BAD;
    }

    return AIR_QUALITY_RATING.UNKNOWN;
  };
