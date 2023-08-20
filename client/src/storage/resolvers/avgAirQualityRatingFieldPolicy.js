import { AirQualityRating } from 'common/airquality';


const avgAirQualityToRating = (val) => {
    if (val.co2) {
        if (val.co2 < AirQualityRating.GOOD.lower_co2_bound) { 
            return AirQualityRating.UNKNOWN;
        }
        if (val.co2 < AirQualityRating.MODERATE.lower_co2_bound) {
            return AirQualityRating.GOOD;
        }
        if (val.co2 < AirQualityRating.BAD.lower_co2_bound) {
            return AirQualityRating.MODERATE;
        }
        return AirQualityRating.BAD;
    }
    return AirQualityRating.UNKNOWN;
  };

const avgAirQualityRatingFieldPolicy = (value = "", {readField}) => {
    const readings_aggregate = readField('readings_aggregate');
    const average_reading =
        readings_aggregate.aggregate.avg ? readings_aggregate.aggregate.avg : null; 
    return avgAirQualityToRating(average_reading);
};

  export default avgAirQualityRatingFieldPolicy;